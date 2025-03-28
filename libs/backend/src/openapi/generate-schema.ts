import { z } from 'zod';

/**
 * OpenAPI SchemaObject 타입 정의
 */
export interface SchemaObject {
  type?: string | string[];
  format?: string;
  title?: string;
  description?: string;
  default?: unknown;
  multipleOf?: number;
  maximum?: number;
  exclusiveMaximum?: number | boolean;
  minimum?: number;
  exclusiveMinimum?: number | boolean;
  maxLength?: number;
  minLength?: number;
  pattern?: string;
  maxItems?: number;
  minItems?: number;
  uniqueItems?: boolean;
  maxProperties?: number;
  minProperties?: number;
  required?: string[];
  enum?: unknown[];
  allOf?: SchemaObject[];
  oneOf?: SchemaObject[];
  anyOf?: SchemaObject[];
  not?: SchemaObject;
  items?: SchemaObject;
  properties?: Record<string, SchemaObject>;
  additionalProperties?: boolean | SchemaObject;
  nullable?: boolean;
  discriminator?: {
    propertyName: string;
    mapping?: Record<string, string>;
  };
  readOnly?: boolean;
  writeOnly?: boolean;
  xml?: {
    name?: string;
    namespace?: string;
    prefix?: string;
    attribute?: boolean;
    wrapped?: boolean;
  };
  externalDocs?: {
    description?: string;
    url: string;
  };
  example?: unknown;
  deprecated?: boolean;
  [key: string]: unknown;
}

/**
 * 확장 메타데이터 인터페이스
 */
export interface ExpandSchemaObject extends SchemaObject {
  hideDefinitions?: string[];
}

/**
 * 확장된 Zod 타입 정의
 */
export interface OpenApiZodAny extends z.ZodTypeAny {
  metaOpenApi?: ExpandSchemaObject | ExpandSchemaObject[];
}

/**
 * 스키마에 OpenAPI 메타데이터 추가
 */
export function extendApi<T extends z.ZodTypeAny>(schema: T, schemaObject: ExpandSchemaObject = {}): T {
  const newSchema = schema.describe(schemaObject.description || '');
  (newSchema as OpenApiZodAny).metaOpenApi = Object.assign(
    {},
    (schema as OpenApiZodAny).metaOpenApi || {},
    schemaObject
  );
  return newSchema;
}

/**
 * JSON Schema를 OpenAPI SchemaObject로 변환하는 함수
 */
function convertJsonSchemaToOpenApi(jsonSchema: Record<string, unknown>): SchemaObject {
  const result: SchemaObject = { ...jsonSchema };

  // 객체 프로퍼티 재귀 처리
  if (jsonSchema.properties && typeof jsonSchema.properties === 'object') {
    const properties: Record<string, SchemaObject> = {};

    for (const [key, value] of Object.entries(jsonSchema.properties)) {
      if (typeof value === 'object') {
        properties[key] = convertJsonSchemaToOpenApi(value as Record<string, unknown>);
      }
    }

    result.properties = properties;
  }

  // 배열 아이템 재귀 처리
  if (jsonSchema.items && typeof jsonSchema.items === 'object') {
    result.items = convertJsonSchemaToOpenApi(jsonSchema.items as Record<string, unknown>);
  }

  // oneOf, anyOf, allOf 재귀 처리
  (['oneOf', 'anyOf', 'allOf'] as const).forEach((key) => {
    if (jsonSchema[key] && Array.isArray(jsonSchema[key])) {
      result[key] = jsonSchema[key].map((schema: any) =>
        convertJsonSchemaToOpenApi(schema as Record<string, unknown>)
      );
    }
  });

  return result;
}

/**
 * Zod 스키마를 OpenAPI 스키마로 변환하는 메인 함수
 */
export function generateSchema(zodRef: OpenApiZodAny, useOutput = false): SchemaObject {
  try {
    // 메타데이터 추출
    const metaOpenApi = zodRef.metaOpenApi || {};
    const metaArray = Array.isArray(metaOpenApi) ? metaOpenApi : [metaOpenApi];

    // zod 4.0 JSON Schema 변환 옵션
    const options = {
      unrepresentable: 'any' as const, // 변환할 수 없는 타입 처리
      target: 'draft-2020-12' as const, // OpenAPI 3.1은 JSON Schema draft 2020-12와 호환됨
      pipes: undefined as 'output' | undefined // JSON Schema 변환 시 파이프 사용 여부
    };

    // useOutput이 true인 경우 pipes 옵션 추가
    if (useOutput) {
      options.pipes = 'output' as const;
    }

    // JSON Schema 생성
    const jsonSchema = z.toJSONSchema(zodRef, options);

    // JSON 스키마를 OpenAPI 스키마로 변환
    let openApiSchema = convertJsonSchemaToOpenApi(jsonSchema);

    // 메타데이터 적용
    for (const meta of metaArray) {
      openApiSchema = {
        ...openApiSchema,
        ...meta
      };
    }

    return openApiSchema;
  } catch (error) {
    console.error('Error generating OpenAPI schema:', error);

    // 기본 스키마 반환
    return {
      type: 'object',
      description: zodRef.description || 'Failed to generate schema'
    };
  }
}
