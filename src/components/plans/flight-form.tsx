import { addFlight } from '@/lib/firebase/firestore';
import { countries, stateLabelValues, worldTimezones } from '@/lib/static-data';
import { NewFlight } from '@/lib/types/plans';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { formatISO } from 'date-fns';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';
import { z } from 'zod';
import {
  Button,
  ControlledInput,
  ControlledSelect,
  Separator,
  Text,
} from '../ui';

const schema = z.object({
  airline: z.string().nonempty({ message: 'Required' }),
  arrivalAirportCode: z.string().nonempty({ message: 'Required' }),
  arrivalAirportName: z.string().nonempty({ message: 'Required' }),
  arrivalCity: z.string().nonempty({ message: 'Required' }),
  arrivalCountry: z.string().nonempty({ message: 'Required' }),
  arrivalDatetime: z.string().nonempty({ message: 'Required' }),
  arrivalState: z.string().optional(),
  arrivalTerminal: z.string().optional(),
  arrivalTimezone: z.string().nonempty({ message: 'Required' }),
  departureAirportCode: z.string().nonempty({ message: 'Required' }),
  departureAirportName: z.string().nonempty({ message: 'Required' }),
  departureCity: z.string().nonempty({ message: 'Required' }),
  departureCountry: z.string().nonempty({ message: 'Required' }),
  departureDatetime: z.string().nonempty({ message: 'Required' }),
  departureState: z.string().optional(),
  departureTerminal: z.string().optional(),
  departureTimezone: z.string().nonempty({ message: 'Required' }),
  duration: z.number().optional(),
  flightNumber: z.string().nonempty({ message: 'Required' }),
  confirmationNumber: z.string().optional(),
  seatType: z.string().optional(),
  notes: z.string().optional(),
});

export type FormType = z.infer<typeof schema>;

export interface FlightFormProps {
  onSubmit: () => void;
  userId: string;
}

export const FlightForm = ({ onSubmit, userId }: FlightFormProps) => {
  const { control, handleSubmit, formState, setValue, watch } =
    useForm<FormType>({
      resolver: zodResolver(schema),
      defaultValues: {
        airline: '',
        arrivalAirportCode: '',
        arrivalAirportName: '',
        arrivalCity: '',
        arrivalCountry: '',
        arrivalDatetime: '',
        arrivalState: '',
        arrivalTerminal: '',
        arrivalTimezone: '',
        departureAirportCode: '',
        departureAirportName: '',
        departureCity: '',
        departureCountry: '',
        departureDatetime: '',
        departureState: '',
        departureTerminal: '',
        departureTimezone: '',
        duration: undefined,
        flightNumber: '',
        confirmationNumber: '',
        seatType: '',
        notes: '',
      },
    });

  const arrivalCountry = watch('arrivalCountry');
  const departureCountry = watch('departureCountry');

  const styles = useMemo(() => {
    return {
      row: `flex-1 flex-row items-center justify-between gap-6`,
    };
  }, []);

  const countryOptions = useMemo(() => {
    return countries.map((country) => ({
      label: country.name,
      value: country.name,
    }));
  }, [countries]);

  const arrivalTimezoneOptions = useMemo(() => {
    return worldTimezones
      .filter((timezone) =>
        arrivalCountry ? timezone.countries.includes(arrivalCountry) : true
      )
      .map((timezone) => ({
        label: `${timezone.name} (${timezone.abbreviation})`,
        value: timezone.abbreviation,
      }));
  }, [arrivalCountry]);

  const departureTimezoneOptions = useMemo(() => {
    return worldTimezones
      .filter((timezone) =>
        departureCountry ? timezone.countries.includes(departureCountry) : false
      )
      .map((timezone) => ({
        label: `${timezone.name} (${timezone.abbreviation})`,
        value: timezone.abbreviation,
      }));
  }, [departureCountry]);

  const clearTimezone = (
    timezone: keyof Pick<FormType, 'arrivalTimezone' | 'departureTimezone'>
  ) => {
    setValue(timezone, '');
  };

  const mutation = useMutation({
    mutationFn: addFlight,
    onSuccess: () => {
      onSubmit();
    },
    onError: (error) => {
      console.error('Error adding flight:', error);
    },
  });

  const submitForm = (data: FormType) => {
    console.log('Form submitted:', data);
    const flightData: NewFlight = {
      ...data,
      userId,
      arrival: {
        datetime: formatISO(new Date(data.arrivalDatetime)),
        timezone: data.arrivalTimezone,
        airportName: data.arrivalAirportName,
        airportCode: data.arrivalAirportCode,
        city: data.arrivalCity,
        state: data.arrivalState,
        country: data.arrivalCountry,
        terminal: data.arrivalTerminal,
      },
      createdAt: formatISO(new Date()),
      departure: {
        datetime: formatISO(new Date(data.departureDatetime)),
        timezone: data.departureTimezone,
        airportName: data.departureAirportName,
        airportCode: data.departureAirportCode,
        city: data.departureCity,
        state: data.departureState,
        country: data.departureCountry,
        terminal: data.departureTerminal,
      },
      updatedAt: formatISO(new Date()),
    };

    mutation.mutate(flightData);
  };

  return (
    <>
      <ControlledInput
        testID="airline"
        control={control}
        name="airline"
        label="Airline"
        error={formState.errors.airline?.message}
        required
      />
      <View className={styles.row}>
        <ControlledInput
          testID="flightNumber"
          control={control}
          name="flightNumber"
          label="Flight Number"
          error={formState.errors.flightNumber?.message}
          required
        />
        <ControlledInput
          testID="confirmationNumber"
          control={control}
          name="confirmationNumber"
          label="Confirmation Number"
        />
      </View>
      {/* <ControlledInput
        testID="seatType"
        control={control}
        name="seatType"
        label="Seat Type"
      /> */}
      <Separator hideTopPadding />
      <Text className="mb-2 text-lg font-bold">Departure Details</Text>
      <ControlledInput
        testID="departureAirportName"
        control={control}
        name="departureAirportName"
        label="Airport Name"
        error={formState.errors.departureAirportName?.message}
        required
      />
      <View className={styles.row}>
        <ControlledInput
          testID="departureAirportCode"
          control={control}
          name="departureAirportCode"
          label="Airport Code"
          error={formState.errors.departureAirportCode?.message}
          required
        />
        <ControlledInput
          testID="departureTerminal"
          control={control}
          name="departureTerminal"
          label="Terminal"
        />
      </View>
      <View className={styles.row}>
        <ControlledInput
          testID="departureCity"
          control={control}
          name="departureCity"
          label="City"
          error={formState.errors.departureCity?.message}
          required
        />
        <ControlledSelect
          testID="departureState"
          control={control}
          name="departureState"
          label="State"
          placeholder="Select state"
          optionsTitle="States"
          options={stateLabelValues}
          keyValue="value"
        />
      </View>
      <ControlledSelect
        testID="departureCountry"
        control={control}
        name="departureCountry"
        label="Country"
        placeholder="Select country"
        options={countryOptions}
        onSelect={() => clearTimezone('departureTimezone')}
        error={formState.errors.departureCountry?.message}
        required
      />
      <ControlledInput
        testID="departureDatetime"
        control={control}
        name="departureDatetime"
        label="Date & Time"
        placeholder="YYYY-MM-DD HH:MM"
        required
      />
      <ControlledSelect
        testID="departureTimezone"
        control={control}
        name="departureTimezone"
        label="Timezone"
        placeholder="Select timezone"
        disabled={!departureCountry}
        options={departureTimezoneOptions}
        helpText={!departureCountry ? 'Select a country first' : undefined}
      />
      <Separator hideTopPadding />
      <Text className="mb-2 text-lg font-bold">Arrival Details</Text>
      <ControlledInput
        testID="arrivalAirportName"
        control={control}
        name="arrivalAirportName"
        label="Airport Name"
        error={formState.errors.arrivalAirportName?.message}
        required
      />
      <View className={styles.row}>
        <ControlledInput
          testID="arrivalAirportCode"
          control={control}
          name="arrivalAirportCode"
          label="Airport Code"
          error={formState.errors.arrivalAirportCode?.message}
          required
        />
        <ControlledInput
          testID="arrivalTerminal"
          control={control}
          name="arrivalTerminal"
          label="Terminal"
        />
      </View>
      <View className={styles.row}>
        <ControlledInput
          testID="arrivalCity"
          control={control}
          name="arrivalCity"
          label="City"
          error={formState.errors.arrivalCity?.message}
          required
        />
        <ControlledSelect
          testID="arrivalState"
          control={control}
          name="arrivalState"
          label="State"
          placeholder="Select state"
          options={stateLabelValues}
          keyValue="value"
        />
      </View>
      <ControlledSelect
        testID="arrivalCountry"
        control={control}
        name="arrivalCountry"
        label="Country"
        placeholder="Select country"
        options={countryOptions}
        onSelect={() => clearTimezone('arrivalTimezone')}
        error={formState.errors.arrivalCountry?.message}
        required
      />
      <ControlledInput
        testID="arrivalDatetime"
        control={control}
        name="arrivalDatetime"
        label="Date & Time"
        placeholder="YYYY-MM-DD HH:MM"
        required
      />
      <ControlledSelect
        testID="arrivalTimezone"
        control={control}
        name="arrivalTimezone"
        label="Timezone"
        disabled={!arrivalCountry}
        placeholder="Select timezone"
        options={arrivalTimezoneOptions}
        helpText={!arrivalCountry ? 'Select a country first' : undefined}
      />
      <Separator hideTopPadding />
      <ControlledInput
        testID="notes"
        control={control}
        name="notes"
        label="Additional Notes"
        multiline
        numberOfLines={4}
      />
      <Button
        label="Add Flight"
        size="lg"
        variant="secondary"
        onPress={handleSubmit(submitForm)}
      />
    </>
  );
};
