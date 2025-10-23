import { Button } from '../ui';

export interface EntertainmentFormProps {
  onSubmit: () => void;
  userId: string;
}

export const EntertainmentForm = ({ onSubmit }: EntertainmentFormProps) => {
  return (
    <>
      <Button
        label="Add Entertainment"
        variant="secondary"
        onPress={() => onSubmit()}
      />
    </>
  );
};
