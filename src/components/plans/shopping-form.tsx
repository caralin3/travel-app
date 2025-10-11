import { Button } from '../ui';

export interface ShoppingFormProps {
  onSubmit: (data: any) => void;
}

export const ShoppingForm = ({ onSubmit }: ShoppingFormProps) => {
  return (
    <>
      <Button
        label="Add Shopping"
        variant="secondary"
        onPress={() => onSubmit({})}
      />
    </>
  );
};
