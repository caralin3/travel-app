import { useAuth } from '@/lib/hooks/use-auth';
import { EventTypeEnum } from '@/lib/types/plans';
import { useState } from 'react';
import { useModal } from '../ui';
import { FloatingActionButton } from '../ui/floating-action-button';
import { ModalForm } from '../ui/modal-form';
import BottomSheetKeyboardAwareScrollView from '../ui/modal-keyboard-aware-scroll-view';
import { ActivityForm } from './activity-form';
import { AddPlanMenu } from './add-plan-menu';
import { EntertainmentForm } from './entertainment-form';
import { FlightForm } from './flight-form';
import { FoodForm } from './food-form';
import { LodgingForm } from './lodging-form';
import { ShoppingForm } from './shopping-form';
import { TransportForm } from './transport-form';
import { TripForm } from './trip-form';

interface FloatingAddPlanMenuProps {}

export const FloatingAddPlanMenu = ({}: FloatingAddPlanMenuProps) => {
  const modal = useModal();
  const [currentForm, setCurrentForm] = useState<EventTypeEnum>('add-plan');
  const userId = useAuth((state) => state.user?.id || '');

  const handleChoosePlan = ({ value }: { value: EventTypeEnum }) => {
    setCurrentForm(value);
  };

  const dismissForm = () => {
    modal.dismiss();
    setCurrentForm('add-plan');
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
    trip: {
      title: 'Trip',
      headerAction: () => setCurrentForm('add-plan'),
      component: (
        <TripForm
          onSubmit={() => {
            dismissForm();
          }}
          userId={userId}
        />
      ),
    },
    flight: {
      title: 'Flight',
      headerAction: () => setCurrentForm('add-plan'),
      component: (
        <FlightForm
          onSubmit={() => {
            dismissForm();
          }}
          userId={userId}
        />
      ),
    },
    lodging: {
      title: 'Lodging',
      headerAction: () => setCurrentForm('add-plan'),
      component: (
        <LodgingForm
          onSubmit={() => {
            dismissForm();
          }}
          userId={userId}
        />
      ),
    },
    transport: {
      title: 'Transport',
      headerAction: () => setCurrentForm('add-plan'),
      component: (
        <TransportForm
          onSubmit={() => {
            dismissForm();
          }}
          userId={userId}
        />
      ),
    },
    food: {
      title: 'Food',
      headerAction: () => setCurrentForm('add-plan'),
      component: (
        <FoodForm
          onSubmit={() => {
            dismissForm();
          }}
          userId={userId}
        />
      ),
    },
    entertainment: {
      title: 'Entertainment',
      headerAction: () => setCurrentForm('add-plan'),
      component: (
        <EntertainmentForm
          onSubmit={() => {
            dismissForm();
          }}
          userId={userId}
        />
      ),
    },
    shopping: {
      title: 'Shopping',
      headerAction: () => setCurrentForm('add-plan'),
      component: (
        <ShoppingForm
          onSubmit={() => {
            dismissForm();
          }}
          userId={userId}
        />
      ),
    },
    activity: {
      title: 'Activity',
      headerAction: () => setCurrentForm('add-plan'),
      component: (
        <ActivityForm
          onSubmit={() => {
            dismissForm();
          }}
          userId={userId}
        />
      ),
    },
    // other: {
    //   title: 'Other',
    //   headerAction: () => setCurrentForm('add-plan'),
    //   component: (
    //     <OtherForm
    //       onSubmit={() => {
    //         dismissForm();
    //       }}
    //     />
    //   ),
    // },
  };

  return (
    <>
      <FloatingActionButton name="plus" onPress={modal.present} />
      <ModalForm
        ref={modal.ref}
        title={currentView[currentForm].title}
        onLeftActionPress={currentView[currentForm].headerAction}
        dismissible={currentForm === 'add-plan'}
        snapPoints={['70%', '95%']}
      >
        <BottomSheetKeyboardAwareScrollView
          contentContainerStyle={{
            gap: currentForm === 'add-plan' ? 16 : 8,
          }}
          showsHorizontalScrollIndicator={false}
        >
          {currentView[currentForm].component}
        </BottomSheetKeyboardAwareScrollView>
      </ModalForm>
    </>
  );
};
