import { z } from 'zod';

import { commonUserSchema } from '../user.schema';
import { createZodDto } from '@BE-common/base/dto';

export const createUserIn = commonUserSchema.omit({ id: true });

// it is trick, runtime and compile time difference reference
export type CreateUserInDto = z.infer<typeof createUserIn>;
export const CreateUserInDto = createZodDto(createUserIn);
