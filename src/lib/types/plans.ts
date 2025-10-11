import { IconSymbolName } from '@/components/ui/icon-symbol';
import { z } from 'zod';

export const Address = z.object({
  city: z.string().optional(),
  country: z.string().optional(),
  postalCode: z.string().optional(),
  state: z.string().optional(),
  street1: z.string().optional(),
  street2: z.string().optional(),
});

export type Address = z.infer<typeof Address>;

export const EventTypeEnum = z.enum([
  'add-plan',
  'trip',
  'flight',
  'lodging',
  'transport',
  'food',
  'entertainment',
  'shopping',
  'activity',
  'other',
]);

export type EventTypeEnum = z.infer<typeof EventTypeEnum>;

export const EventType = z.object({
  icon: z.string() as z.ZodType<IconSymbolName>,
  id: EventTypeEnum,
  name: z.string(),
});

export type EventType = z.infer<typeof EventType>;

export const FlightETA = z.object({
  airportCode: z.string(),
  airportName: z.string().optional(),
  city: z.string(),
  country: z.string(),
  datetime: z.string(),
  seatType: z.string().optional(),
  state: z.string().optional(),
  terminal: z.string().optional(),
  timezone: z.string(),
});

export type FlightETA = z.infer<typeof FlightETA>;

export const Flight = z.object({
  airline: z.string(),
  arrival: FlightETA,
  confirmationNumber: z.string().optional(),
  createdAt: z.string(),
  departure: FlightETA,
  duration: z.number().optional(),
  flightNumber: z.string(),
  id: z.uuid(),
  layoverFlightIds: z.array(z.uuid()).optional(),
  notes: z.string().optional(),
  tripId: z.uuid().optional(),
  updatedAt: z.string(),
  userId: z.uuid(),
});

export type Flight = z.infer<typeof Flight>;

export const Lodging = z.object({
  address: Address.optional(),
  checkInDatetime: z.string().optional(),
  checkOutDatetime: z.string().optional(),
  confirmationNumber: z.string().optional(),
  createdAt: z.string(),
  id: z.uuid(),
  name: z.string(),
  notes: z.string().optional(),
  phoneNumber: z.string().optional(),
  tripId: z.uuid().optional(),
  updatedAt: z.string(),
  userId: z.uuid(),
});

export type Lodging = z.infer<typeof Lodging>;

export const Transport = z.object({
  confirmationNumber: z.string().optional(),
  createdAt: z.string(),
  departureDatetime: z.string().optional(),
  dropoffLocation: Address.optional(),
  id: z.uuid(),
  name: z.string(),
  notes: z.string().optional(),
  pickupLocation: Address.optional(),
  phoneNumber: z.string().optional(),
  tripId: z.uuid().optional(),
  updatedAt: z.string(),
  userId: z.uuid(),
});

export type Transport = z.infer<typeof Transport>;

export const Food = z.object({
  address: Address.optional(),
  createdAt: z.string(),
  datetime: z.string().optional(),
  id: z.uuid(),
  name: z.string(),
  notes: z.string().optional(),
  phoneNumber: z.string().optional(),
  tripId: z.uuid().optional(),
  updatedAt: z.string(),
  userId: z.uuid(),
});

export type Food = z.infer<typeof Food>;

export const Entertainment = z.object({
  address: Address.optional(),
  createdAt: z.string(),
  datetime: z.string().optional(),
  id: z.uuid(),
  name: z.string(),
  notes: z.string().optional(),
  phoneNumber: z.string().optional(),
  tripId: z.uuid().optional(),
  updatedAt: z.string(),
  userId: z.uuid(),
});

export type Entertainment = z.infer<typeof Entertainment>;

export const Shopping = z.object({
  address: Address.optional(),
  createdAt: z.string(),
  datetime: z.string().optional(),
  id: z.uuid(),
  name: z.string(),
  notes: z.string().optional(),
  phoneNumber: z.string().optional(),
  tripId: z.uuid().optional(),
  updatedAt: z.string(),
  userId: z.uuid(),
});

export type Shopping = z.infer<typeof Shopping>;

export const Activity = z.object({
  address: Address.optional(),
  createdAt: z.string(),
  datetime: z.string().optional(),
  id: z.uuid(),
  name: z.string(),
  notes: z.string().optional(),
  phoneNumber: z.string().optional(),
  tripId: z.uuid().optional(),
  updatedAt: z.string(),
  userId: z.uuid(),
});

export type Activity = z.infer<typeof Activity>;

export const Other = z.object({
  address: Address.optional(),
  createdAt: z.string(),
  datetime: z.string().optional(),
  id: z.uuid(),
  name: z.string(),
  notes: z.string().optional(),
  phoneNumber: z.string().optional(),
  tripId: z.uuid().optional(),
  updatedAt: z.string(),
  userId: z.uuid(),
});

export type Other = z.infer<typeof Other>;

export const Plan = z.discriminatedUnion('type', [
  Flight,
  Lodging,
  Transport,
  Food,
  Entertainment,
  Shopping,
  Activity,
  Other,
]);

export type Plan = z.infer<typeof Plan>;
