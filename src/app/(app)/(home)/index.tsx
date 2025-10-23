import { FloatingAddPlanMenu } from '@/components/plans/floating-add-plan-modal';
import { TripCard } from '@/components/trips/trip-card';
import { FocusAwareStatusBar, ScrollView } from '@/components/ui';
import { getTrips } from '@/lib/firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '@/lib/firebase/firestore/constants';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { RefreshControl } from 'react-native-gesture-handler';

export default function Index() {
  const { data, refetch, isRefetching } = useQuery({
    queryKey: [FIRESTORE_COLLECTIONS.TRIPS],
    queryFn: getTrips,
  });

  const onRefresh = useCallback(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView
        contentContainerClassName="p-4"
        refreshControl={
          <RefreshControl refreshing={isRefetching} onRefresh={onRefresh} />
        }
      >
        {data?.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </ScrollView>
      <FloatingAddPlanMenu />
    </>
  );
}
