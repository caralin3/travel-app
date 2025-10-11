import { Button } from '../ui';

export interface OtherFormProps {
  onSubmit: (data: any) => void;
}

export const OtherForm = ({ onSubmit }: OtherFormProps) => {
  return (
    <>
      <Button
        label="Add Other Event"
        variant="secondary"
        onPress={() => onSubmit({})}
      />
    </>
  );
};
