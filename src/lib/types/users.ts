import { z } from 'zod';
import { Address } from './plans';

export const User = z.object({
  address: Address.optional(),
  displayName: z.string().nullable(),
  email: z.email().nullable(),
  id: z.uuid(),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  profileImageUrl: z.string().optional(),
});

export type User = z.infer<typeof User>;
