import { UserSchema } from '@/prisma/generated/zod';
import { z } from 'zod';

export type UserModel = z.infer<typeof UserSchema>;
