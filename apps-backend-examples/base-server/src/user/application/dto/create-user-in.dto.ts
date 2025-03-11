import { z } from 'zod';
import { createUserIn } from 'schema/user/schema';
import { createZodDto } from 'backend-common/common/dto';

// it is trick, runtime and compile time difference reference
export type CreateUserInDto = z.infer<typeof createUserIn>;
export const CreateUserInDto = createZodDto(createUserIn);
