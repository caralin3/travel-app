import { Button } from '../ui';

export interface LodgingFormProps {
  onSubmit: () => void;
  userId: string;
}

export const LodgingForm = ({ onSubmit, userId }: LodgingFormProps) => {
  return (
    <>
      <Button
        label="Add Lodging"
        variant="secondary"
        onPress={() => onSubmit()}
      />
    </>
  );
};
