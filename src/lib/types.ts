import { IconSymbolName } from '@/components/ui/icon-symbol';

export type EventId =
  | 'add-plan'
  | 'flight'
  | 'lodging'
  | 'transport'
  | 'food'
  | 'entertainment'
  | 'shopping'
  | 'activity'
  | 'other';

export interface EventType {
  icon: IconSymbolName;
  id: EventId;
  name: string;
}
