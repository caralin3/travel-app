import { FloatingAddPlanMenu } from '@/components/plans/floating-add-plan-modal';
import { FocusAwareStatusBar, ScrollView } from '@/components/ui';

export default function Index() {
  return (
    <>
      <FocusAwareStatusBar />
      <ScrollView></ScrollView>
      <FloatingAddPlanMenu />
    </>
  );
}
