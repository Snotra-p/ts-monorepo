import {
  ApiBody,
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  getSchemaPath
} from '@nestjs/swagger';
import { applyDecorators } from '@nestjs/common';
import { ResponseEntity } from '../base/response-entity';
import { ReferenceObject, SchemaObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import { ZodDto } from '../base/dto';
import { generateSchema } from '../openapi/generate-schema';

type ApiResponseDocsOptions = {
  responseType?: ZodDto<any>;
  bodyType?: ZodDto<any>;
  queryType?: ZodDto<any>;
  summary?: string;
  isArray?: boolean;
};

export const ApiDocs = (options: ApiResponseDocsOptions): MethodDecorator => {
  const { responseType, summary, isArray, bodyType, queryType } = options ?? {};

  const decorators = [ApiOperation({ summary: summary }), ApiExtraModels(ResponseEntity)];

  // bodyType이 있으면 요청 본문 문서화 추가
  if (bodyType) {
    decorators.push(ApiExtraModels(bodyType));

    // bodyType의 스키마 변환 및 정규화
    const bodyZodSchema = bodyType.schema;
    const bodySchema = generateSchema(bodyZodSchema);

    decorators.push(
      ApiBody({
        schema: bodySchema as SchemaObject
      })
    );
  }

  if (queryType) {
    decorators.push(ApiExtraModels(queryType));

    // paramType의 스키마 변환 및 정규화
    const queryZodSchema = queryType.schema;
    const querySchema = generateSchema(queryZodSchema);
    const properties = querySchema.properties ?? {};
    Object.keys(properties).forEach((queryName) => {
      decorators.push(
        ApiQuery({
          name: queryName,
          // 각 query parameter의 스키마를 지정합니다.
          schema: properties[queryName] as SchemaObject,
          // required 배열에 포함되었다면 해당 파라미터는 필수입니다.
          required: querySchema.required ? querySchema.required.includes(queryName) : false
        })
      );
    });
  }

  if (!responseType) {
    decorators.push(ApiOkResponse({ type: ApiResponse }));
    return applyDecorators(...decorators);
  }

  decorators.push(ApiExtraModels(responseType));

  const baseResponseSchema: ReferenceObject = {
    $ref: getSchemaPath(ResponseEntity)
  };

  const zodSchema = responseType.schema;

  // 스키마 정규화
  const normalizedSchema = generateSchema(zodSchema) as SchemaObject;

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
