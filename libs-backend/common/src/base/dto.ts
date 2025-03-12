import { z } from "zod";

// DTO 클래스 타입
export interface ZodDto<T> {
  new (): T;
  schema: z.ZodType<T>;
}

// DTO 클래스 생성 함수
export function createZodDto<T>(schema: z.ZodType<T>): ZodDto<T> {
  class Dto {
    static schema = schema;
  }

  return Dto as unknown as ZodDto<T>;
}
