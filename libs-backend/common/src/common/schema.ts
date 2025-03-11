import { z } from "zod";

export type Id = number | string;

export const baseSchema = z.object({
  id: z.union([z.number(), z.string()]),
});
