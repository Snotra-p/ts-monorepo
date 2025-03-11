import { z } from 'zod';
import { baseSchema } from 'backend-common/common/schema';

export const commonUserSchema = baseSchema.extend({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string().email().optional(),
});

// user domain schema
export const userSchema = commonUserSchema.extend({
  fullName: z.string(),
});

// user persistence schema
export const userPersistenceSchema = commonUserSchema.extend({
  version: z.number().optional(),
  createdAt: z.date(),
});
