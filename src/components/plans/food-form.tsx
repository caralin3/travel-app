import { Button } from '../ui';

export interface FoodFormProps {
  onSubmit: () => void;
  userId: string;
}

export const FoodForm = ({ onSubmit, userId }: FoodFormProps) => {
  return (
    <>
      <Button label="Add Food" variant="secondary" onPress={() => onSubmit()} />
    </>
  );
};
