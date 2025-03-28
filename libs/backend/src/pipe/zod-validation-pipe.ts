// 글로벌 검증 파이프
import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { ZodError } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  transform(value: unknown, metadata: ArgumentMetadata) {
    const { metatype } = metadata;

    // 메타타입이 없거나 schema 속성이 없으면 값 그대로 반환
    if (!metatype || !('schema' in metatype)) {
      return value;
    }

    try {
      // 스키마로 검증
      return (metatype as any).schema.parse(value);
    } catch (error) {
      // 오류 처리
      if (error instanceof ZodError) {
        const message = error.issues
          .map((issue) => {
            const path = issue.path.length ? issue.path.join('.') : 'root';
            return `${path}: ${issue.message}`;
          })
          .join(' | ');

        throw new BadRequestException({
          message: message
        });
      }

      throw error;
    }
  }
}
