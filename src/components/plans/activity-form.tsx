import { Button } from '../ui';

export interface ActivityFormProps {
  onSubmit: (data: any) => void;
}

export const ActivityForm = ({ onSubmit }: ActivityFormProps) => {
  return (
    <>
      <Button
        label="Add Activity"
        variant="secondary"
        onPress={() => onSubmit({})}
      />
    </>
  );
};
