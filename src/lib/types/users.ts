import { z } from 'zod';
import { Address } from './plans';

export const User = z.object({
  address: Address.optional(),
  createdAt: z.string(),
  email: z.email(),
  id: z.uuid(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImageUrl: z.string().optional(),
  updatedAt: z.string(),
  username: z.string().optional(),
});

export type User = z.infer<typeof User>;

export const NewUser = z.discriminatedUnion('type', [
  User.omit({ id: true, createdAt: true, updatedAt: true }),
]);

export type NewUser = z.infer<typeof NewUser>;
