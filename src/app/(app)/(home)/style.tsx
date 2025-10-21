import { Buttons } from '@/components/buttons';
import { Colors } from '@/components/colors';
import { Inputs } from '@/components/inputs';
import { FloatingAddPlanMenu } from '@/components/plans/floating-add-plan-modal';
import { Typography } from '@/components/typography';
import { FocusAwareStatusBar, ScrollView } from '@/components/ui';
import { useState } from 'react';

export default function Style() {
  const [selectedItem, setSelectedItem] = useState('');
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView className="px-4">
        <Typography />
        <Colors />
        <Buttons />
        <Inputs />
      </ScrollView>
      <FloatingAddPlanMenu />
    </>
  );
}
