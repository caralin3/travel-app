import { Button } from '../ui';

export interface FoodFormProps {
  onSubmit: (data: any) => void;
}

export const FoodForm = ({ onSubmit }: FoodFormProps) => {
  return (
    <>
      <Button
        label="Add Food"
        variant="secondary"
        onPress={() => onSubmit({})}
      />
    </>
  );
};
