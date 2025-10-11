import { Button } from '../ui';

export interface TransportFormProps {
  onSubmit: (data: any) => void;
}

export const TransportForm = ({ onSubmit }: TransportFormProps) => {
  return (
    <>
      <Button
        label="Add Transport"
        variant="secondary"
        onPress={() => onSubmit({})}
      />
    </>
  );
};
