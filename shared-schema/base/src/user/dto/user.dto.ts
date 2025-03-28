import { createZodDto } from '@BE-common/base/dto';
import { userSchema } from '../user.schema';
import { z } from 'zod';

export const userDtoSchema = userSchema.omit({
  id: true,
  firstName: true,
  lastName: true
});

export type UserDto = z.infer<typeof userDtoSchema>;
export const UserDto = createZodDto(userDtoSchema);
