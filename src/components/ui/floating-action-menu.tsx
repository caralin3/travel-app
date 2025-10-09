import { useCallback, useMemo } from 'react';
import { FloatingActionButton } from './floating-action-button';
import { IconSymbolName } from './icon-symbol';
import { useModal } from './modal';
import { Options, OptionType } from './select';

interface FloatingActionMenuProps {
  iconName: IconSymbolName;
  items: OptionType[];
  selectedItem: string;
  setSelectedItem: (item: string) => void;
}

export const FloatingActionMenu = ({
  iconName,
  items,
  selectedItem,
  setSelectedItem,
}: FloatingActionMenuProps) => {
  const modal = useModal();

  const onSelect = useCallback(
    (option: OptionType) => {
      setSelectedItem(option.value as string);
      modal.dismiss();
    },
    [modal, setSelectedItem]
  );

  const item = useMemo(
    () => items.find((t) => t.value === selectedItem),
    [selectedItem, items]
  );

  return (
    <>
      <FloatingActionButton name={iconName} onPress={modal.present} />
      <Options
        ref={modal.ref}
        options={items}
        onSelect={onSelect}
        value={item?.value}
      />
    </>
  );
};
