import { z } from 'zod';
import { updateUserIn } from 'schema/user/schema';
import { createZodDto } from 'backend-common/common/dto';

export type UpdateUserInDto = z.infer<typeof updateUserIn>;
export const UpdateUserInDto = createZodDto(updateUserIn);
