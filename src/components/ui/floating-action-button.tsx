import { useColorScheme } from 'nativewind';
import { StyleSheet, TouchableOpacity } from 'react-native';
import colors from './colors';
import { IconSymbol, IconSymbolName } from './icon-symbol';

interface FloatingActionButtonProps {
  name: IconSymbolName;
  onPress: () => void;
}

export const FloatingActionButton = ({
  name,
  onPress,
}: FloatingActionButtonProps) => {
  const { colorScheme } = useColorScheme();
  const color =
    colorScheme === 'dark' ? colors.charcoal[800] : colors.neutral[50];

  return (
    <TouchableOpacity
      style={[styles.fab, { backgroundColor: colors.primary[500] }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <IconSymbol name={name} color={color} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 50,
    padding: 12,
    zIndex: 10,
  },
});
