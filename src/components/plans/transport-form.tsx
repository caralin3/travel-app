import { Button } from '../ui';

export interface TransportFormProps {
  onSubmit: () => void;
  userId: string;
}

export const TransportForm = ({ onSubmit, userId }: TransportFormProps) => {
  return (
    <>
      <Button
        label="Add Transport"
        variant="secondary"
        onPress={() => onSubmit()}
      />
    </>
  );
};
