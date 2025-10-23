import { addTrip } from '@/lib/firebase/firestore';
import { NewTrip } from '@/lib/types/trips';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { formatISO } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button, ControlledInput } from '../ui';

const schema = z.object({
  destination: z.string().optional(),
  endDate: z.string().nonempty({ message: 'Required' }),
  name: z.string().nonempty({ message: 'Required' }),
  notes: z.string().optional(),
  startDate: z.string().nonempty({ message: 'Required' }),
  coverPhotoUrl: z.string().optional(),
});

export type FormType = z.infer<typeof schema>;

export interface TripFormProps {
  onSubmit: () => void;
  userId: string;
}

export const TripForm = ({ onSubmit, userId }: TripFormProps) => {
  const { control, handleSubmit, formState } = useForm<FormType>({
    resolver: zodResolver(schema),
  });
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addTrip,
    onSuccess: () => {
      onSubmit();
      queryClient.invalidateQueries({ queryKey: ['trips'] });
    },
    onError: (error) => {
      console.error('Error adding trip:', error);
    },
  });

  const submitForm = (data: FormType) => {
    const tripData: NewTrip = {
      createdAt: formatISO(new Date()),
      destination: data.destination || '',
      endDate: data.endDate,
      name: data.name,
      notes: data.notes || '',
      startDate: data.startDate,
      updatedAt: formatISO(new Date()),
      userId,
    };
    mutation.mutate(tripData);
  };

  return (
    <>
      <ControlledInput
        testID="name"
        control={control}
        name="name"
        label="Name"
        placeholder="e.g. Summer Vacation"
        error={formState.errors.name?.message}
        required
        autoCapitalize="words"
      />
      <ControlledInput
        testID="destination"
        control={control}
        name="destination"
        label="Destination"
        placeholder="e.g. Paris, France"
        error={formState.errors.destination?.message}
        autoCapitalize="words"
      />
      <ControlledInput
        testID="startDate"
        control={control}
        name="startDate"
        label="Start Date"
        placeholder="YYYY-MM-DD"
        error={formState.errors.startDate?.message}
        required
      />
      <ControlledInput
        testID="endDate"
        control={control}
        name="endDate"
        label="End Date"
        placeholder="YYYY-MM-DD"
        error={formState.errors.endDate?.message}
        required
      />
      <ControlledInput
        testID="notes"
        control={control}
        name="notes"
        label="Notes"
        placeholder="Additional details about the trip"
        error={formState.errors.notes?.message}
        multiline
        numberOfLines={4}
      />
      <Button
        label="Add Trip"
        size="lg"
        variant="secondary"
        onPress={handleSubmit(submitForm)}
      />
    </>
  );
};
