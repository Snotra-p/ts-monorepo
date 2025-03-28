import { ApiExtraModels, ApiOkResponse, ApiOperation, ApiResponse, getSchemaPath } from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ResponseEntity } from '../base/response-entity';
import { ApiErrorDocs } from './api-error-docs.decorator';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { generateSchema } from '@anatine/zod-openapi';
import { ZodDto } from '../base/dto';
import { ErrorMap } from '../exception/abstract-server-exception';

type ApiResponseDocsOptions = {
  type?: ZodDto<any>;
  summary?: string;
  isArray?: boolean;
  errors?: string[];
  error?: ErrorMap<string>;
};

const normalizeSchema = (schema: SchemaObject): SchemaObject => {
  const result = { ...schema };

  // type 속성이 배열인 경우 첫 번째 항목 사용
  if (Array.isArray(result.type)) {
    result.type = result.type[0];
  }

  // 재귀적으로 프로퍼티 정규화
  if (result.properties) {
    const props: Record<string, SchemaObject> = {};

    for (const key in result.properties) {
      props[key] = normalizeSchema(result.properties[key] as SchemaObject);
    }

    result.properties = props;
  }

  if (result.items) {
    result.items = normalizeSchema(result.items as SchemaObject);
  }

  return schema;
};

export const ApiResponseDocs = (options: ApiResponseDocsOptions): MethodDecorator => {
  const { type, summary, isArray, errors, error } = options ?? {};

  const decorators = [ApiOperation({ summary: summary }), ApiExtraModels(ResponseEntity)];

  if (errors && error) {
    decorators.push(ApiErrorDocs(errors, error));
  }

  if (!type) {
    decorators.push(ApiOkResponse({ type: ApiResponse }));
    return applyDecorators(...decorators);
  }

  decorators.push(ApiExtraModels(type));

  const baseResponseSchema: ReferenceObject = {
    $ref: getSchemaPath(ResponseEntity)
  };

  const zodSchema = type.schema;

  // 스키마 정규화
  const normalizedSchema = normalizeSchema(generateSchema(zodSchema) as SchemaObject);

  const dataSchema: SchemaObject = isArray ? { type: 'array', items: normalizedSchema } : normalizedSchema;

  const customTypeSchema: SchemaObject = {
    properties: {
      data: dataSchema
    }
  };

  const combineSchema: (ReferenceObject | SchemaObject)[] = [baseResponseSchema, customTypeSchema];

  decorators.push(
    ApiOkResponse({
      schema: {
        allOf: combineSchema
      }
    })
  );

  return applyDecorators(...decorators);
};
