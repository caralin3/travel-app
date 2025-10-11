import { z } from 'zod';

export const Trip = z.object({
  coverPhotoUrl: z.string().optional(),
  createdAt: z.string(),
  destination: z.string().optional(),
  endDate: z.string(),
  id: z.uuid(),
  name: z.string(),
  notes: z.string().optional(),
  startDate: z.string(),
  updatedAt: z.string(),
  userId: z.uuid(),
});

export type Trip = z.infer<typeof Trip>;

export const NewTrip = z.discriminatedUnion('type', [
  Trip.omit({ id: true, createdAt: true, updatedAt: true, userId: true }),
]);

export type NewTrip = z.infer<typeof NewTrip>;
