import { z } from 'zod';
import { baseSchema } from '@BE-common/base/schema';

// it can be both user domain and user persistence schema
// usually, it is used for just user domain schema only
// if you want to use it for user persistence schema, you should extend it

/**
 * {
 *     id: Id,
 *     firstName: string,
 *     lastName: string,
 *     age: number,
 *     email?: string,
 * }
 */
export const commonUserSchema = baseSchema.extend({
  firstName: z.string(),
  lastName: z.string(),
  age: z.number(),
  email: z.email().optional()
});

/**
 * {
 *     id: Id,
 *     firstName: string,
 *     lastName: string,
 *     age: number,
 *     email?: string,
 *     fullName: string
 * }
 */
// user domain schema
export const userSchema = commonUserSchema.extend({
  fullName: z.string()
});

export type UserProperty = z.infer<typeof userSchema>;

/**
 * {
 *     id: Id,
 *     firstName: string,
 *     lastName: string,
 *     age: number,
 *     email?: string,
 *     version?: number,
 *     createdAt: Date
 * }
 */
export type UserPersistenceProperty = z.infer<typeof userPersistenceSchema>;
// user persistence schema
export const userPersistenceSchema = commonUserSchema.extend({
  version: z.number().optional(),
  createdAt: z.date()
});
