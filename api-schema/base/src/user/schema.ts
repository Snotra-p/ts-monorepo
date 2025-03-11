import { z } from "zod";
import { baseSchema } from "../identifier";

// user domain schema
export const userSchema = baseSchema.extend({
  name: z.string(),
  age: z.number(),
  email: z.string().email().optional(),
});

export type UserProperty = z.infer<typeof userSchema>;

// user api schema
export const createUserIn = userSchema.omit({ id: true });

export const updateUserIn = userSchema.pick({ email: true });
