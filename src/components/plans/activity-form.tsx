import { Button } from '../ui';

export interface ActivityFormProps {
  onSubmit: () => void;
  userId: string;
}

export const ActivityForm = ({ onSubmit }: ActivityFormProps) => {
  return (
    <>
      <Button
        label="Add Activity"
        variant="secondary"
        onPress={() => onSubmit()}
      />
    </>
  );
};
