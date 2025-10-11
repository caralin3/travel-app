import { Button } from '../ui';

export interface FlightFormProps {
  onSubmit: (data: any) => void;
}

export const FlightForm = ({ onSubmit }: FlightFormProps) => {
  return (
    <>
      <Button
        label="Add Flight"
        variant="secondary"
        onPress={() => onSubmit({})}
      />
    </>
  );
};
