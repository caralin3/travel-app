import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useColorScheme } from 'nativewind';
import { forwardRef } from 'react';
import { View } from 'react-native';
import colors from './colors';
import { Modal } from './modal';

interface ModalFormProps {
  children: React.ReactNode;
  dismissible?: boolean;
  onLeftActionPress?: () => void;
  title?: string;
}

export const ModalForm = forwardRef<BottomSheetModal, ModalFormProps>(
  ({ children, dismissible = true, onLeftActionPress, title }, ref) => {
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    return (
      <Modal
        ref={ref}
        index={0}
        snapPoints={['70%']}
        backgroundStyle={{
          backgroundColor: isDark ? colors.neutral[800] : colors.white,
        }}
        title={title}
        dismissible={dismissible}
        onLeftActionPress={onLeftActionPress}
        showCloseButton={false}
      >
        <View className="p-6 pb-0">{children}</View>
      </Modal>
    );
  }
);
