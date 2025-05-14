import { z } from 'zod';

export type Id = number | string;

export const baseSchema = z.object({
  id: z.union([z.number(), z.string()])
});

type PropertyKeys<T> = {
  [K in keyof T]: T[K] extends (...args: unknown[]) => unknown ? never : K;
}[keyof T];

export type StrictPropsMatch<A, B> = [Exclude<PropertyKeys<B>, PropertyKeys<A>>] extends [never]
  ? [Exclude<PropertyKeys<A>, PropertyKeys<B>>] extends [never]
    ? true
    : never
  : never;
