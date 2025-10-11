import { events } from '@/lib/static-data';
import { EventTypeEnum } from '@/lib/types/plans';
import { Pressable } from 'react-native';
import { colors } from '../ui';
import { IconSymbol } from '../ui/icon-symbol';
import { Text } from '../ui/text';

export interface AddPlanMenuProps {
  onSelect: (option: { label: string; value: EventTypeEnum }) => void;
}

export const AddPlanMenu = ({ onSelect }: AddPlanMenuProps) => {
  return (
    <>
      <Text className="text-[16px] font-bold">Add Event</Text>
      {events.map((event) => (
        <Pressable
          className="flex-row gap-4 items-center p-4 border border-primary-500 dark:border-neutral-400 rounded-xl"
          key={event.id}
          onPress={() => onSelect({ label: event.name, value: event.id })}
        >
          <IconSymbol name={event.icon} size={24} color={colors.primary[500]} />
          <Text>{event.name}</Text>
        </Pressable>
      ))}
    </>
  );
};
