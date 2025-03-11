import { z } from "zod";
import { createZodDto } from "backend-common/common/dto";

import { commonUserSchema } from "../user.schema";

export const createUserIn = commonUserSchema.omit({ id: true });

// it is trick, runtime and compile time difference reference
export type CreateUserInDto = z.infer<typeof createUserIn>;
export const CreateUserInDto = createZodDto(createUserIn);
