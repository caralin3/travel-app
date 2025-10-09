import { Buttons } from '@/components/buttons';
import { Colors } from '@/components/colors';
import { Inputs } from '@/components/inputs';
import { Typography } from '@/components/typography';
import { FocusAwareStatusBar, ScrollView } from '@/components/ui';
import { FloatingActionMenu } from '@/components/ui/floating-action-menu';
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
      <FloatingActionMenu
        iconName="plus"
        items={[
          { label: 'Option 1', value: 'option1' },
          { label: 'Option 2', value: 'option2' },
          { label: 'Option 3', value: 'option3' },
        ]}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />
    </>
  );
}
