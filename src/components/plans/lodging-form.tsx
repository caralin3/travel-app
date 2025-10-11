import { Button } from '../ui';

export interface LodgingFormProps {
  onSubmit: (data: any) => void;
}

export const LodgingForm = ({ onSubmit }: LodgingFormProps) => {
  return (
    <>
      <Button
        label="Add Lodging"
        variant="secondary"
        onPress={() => onSubmit({})}
      />
    </>
  );
};
