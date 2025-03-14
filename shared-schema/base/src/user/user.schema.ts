import { z } from 'zod';
import { baseSchema } from '@BE-common/base/schema';

// it can be both user domain and user persistence schema
// usually, it is used for just user domain schema only
// if you want to use it for user persistence schema, you should extend it
export const commonUserSchema = baseSchema.extend({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.string().email().optional()
});

// user domain schema
export const userSchema = commonUserSchema.extend({
  fullName: z.string()
});

// user persistence schema
export const userPersistenceSchema = commonUserSchema.extend({
  version: z.number().optional(),
  createdAt: z.date()
});
