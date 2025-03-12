import { z } from "zod";
import { createZodDto } from "@BE-common/base/dto";

import { commonUserSchema } from "../user.schema";

export const updateUserIn = commonUserSchema.pick({ email: true });

export type UpdateUserInDto = z.infer<typeof updateUserIn>;
export const UpdateUserInDto = createZodDto(updateUserIn);
