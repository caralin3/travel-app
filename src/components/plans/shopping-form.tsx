import { Button } from '../ui';

export interface ShoppingFormProps {
  onSubmit: () => void;
  userId: string;
}

export const ShoppingForm = ({ onSubmit, userId }: ShoppingFormProps) => {
  return (
    <>
      <Button
        label="Add Shopping"
        variant="secondary"
        onPress={() => onSubmit()}
      />
    </>
  );
};
