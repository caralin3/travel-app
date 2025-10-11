import { EventId } from '@/lib/types';
import { useState } from 'react';
import { useModal } from '../ui';
import { FloatingActionButton } from '../ui/floating-action-button';
import { ModalForm } from '../ui/modal-form';
import BottomSheetKeyboardAwareScrollView from '../ui/modal-keyboard-aware-scroll-view';
import { AddPlanMenu } from './add-plan-menu';

interface FloatingAddPlanMenuProps {}

export const FloatingAddPlanMenu = ({}: FloatingAddPlanMenuProps) => {
  const modal = useModal();
  const [currentForm, setCurrentForm] = useState<EventId>('add-plan');

  const handleChoosePlan = ({ value }: { value: EventId }) => {
    setCurrentForm(value);
  };

  const currentView: {
    [key: string]: {
      component: React.ReactNode;
      headerAction: () => void;
      title: string;
    };
  } = {
    'add-plan': {
      title: 'Add a Plan',
      headerAction: modal.dismiss,
      component: <AddPlanMenu onSelect={handleChoosePlan} />,
    },
    flight: {
      title: 'Flight',
      headerAction: () => setCurrentForm('add-plan'),
      component: <></>,
    },
    lodging: {
      title: 'Lodging',
      headerAction: () => setCurrentForm('add-plan'),
      component: <></>,
    },
    transport: {
      title: 'Transport',
      headerAction: () => setCurrentForm('add-plan'),
      component: <></>,
    },
    food: {
      title: 'Food',
      headerAction: () => setCurrentForm('add-plan'),
      component: <></>,
    },
    entertainment: {
      title: 'Entertainment',
      headerAction: () => setCurrentForm('add-plan'),
      component: <></>,
    },
    shopping: {
      title: 'Shopping',
      headerAction: () => setCurrentForm('add-plan'),
      component: <></>,
    },
    activity: {
      title: 'Activity',
      headerAction: () => setCurrentForm('add-plan'),
      component: <></>,
    },
    other: {
      title: 'Other',
      headerAction: () => setCurrentForm('add-plan'),
      component: <></>,
    },
  };

  return (
    <>
      <FloatingActionButton name="plus" onPress={modal.present} />
      <ModalForm
        ref={modal.ref}
        title={currentView[currentForm].title}
        onLeftActionPress={currentView[currentForm].headerAction}
        dismissible={currentForm === 'add-plan'}
      >
        <BottomSheetKeyboardAwareScrollView
          contentContainerStyle={{
            gap: 16,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {currentView[currentForm].component}
        </BottomSheetKeyboardAwareScrollView>
      </ModalForm>
    </>
  );
};
