import { IconSymbolName } from '@/components/ui/icon-symbol';
import { z } from 'zod';

export const Plan = z.object({
  id: z.uuid(),
});

export const EventTypeEnum = z.enum([
  'add-plan',
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
  departure: FlightETA,
  duration: z.number().optional(),
  flightNumber: z.string(),
  id: z.uuid(),
  layoverFlightIds: z.array(z.uuid()).optional(),
  notes: z.string().optional(),
  planId: z.uuid().optional(),
});

export type Flight = z.infer<typeof Flight>;
