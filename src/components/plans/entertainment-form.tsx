import { Button } from '../ui';

export interface EntertainmentFormProps {
  onSubmit: (data: any) => void;
}

export const EntertainmentForm = ({ onSubmit }: EntertainmentFormProps) => {
  return (
    <>
      <Button
        label="Add Entertainment"
        variant="secondary"
        onPress={() => onSubmit({})}
      />
    </>
  );
};
