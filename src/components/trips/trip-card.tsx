import { Trip } from '@/lib/types/trips';
import { getCountdownDays } from '@/lib/utils';
import { format } from 'date-fns/format';
import { parseISO } from 'date-fns/parseISO';
import { useMemo } from 'react';
import { Card } from '../card';
import { Text, View } from '../ui';

interface TripCardProps {
  trip: Trip;
}

export const TripCard = ({ trip }: TripCardProps) => {
  const days = useMemo(
    () => getCountdownDays(new Date(trip.startDate)),
    [trip.startDate]
  );

  return (
    <Card href={`/trips/${trip.id}`}>
      <View className="flex-row justify-between items-center">
        <View>
          <Text className="text-2xl ">{trip.name}</Text>
          {!!trip.destination && <Text>{trip.destination}</Text>}
          <Text>
            {format(parseISO(trip.startDate), 'MM/dd/yy')} -{' '}
            {format(parseISO(trip.endDate), 'MM/dd/yy')}
          </Text>
        </View>
        <View className="items-center justify-center">
          <Text className="text-2xl font-bold">{days}</Text>
          <Text className="font-semibold">day{days > 1 ? 's' : ''} to go</Text>
        </View>
      </View>
    </Card>
  );
};
