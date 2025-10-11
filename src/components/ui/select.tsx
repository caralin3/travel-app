/* eslint-disable max-lines-per-function */
import {
  BottomSheetFlatList,
  type BottomSheetModal,
} from '@gorhom/bottom-sheet';
import { FlashList } from '@shopify/flash-list';
import { useColorScheme } from 'nativewind';
import * as React from 'react';
import type { FieldValues } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { Platform, Pressable, type PressableProps, View } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import Svg, { Path } from 'react-native-svg';
import { tv } from 'tailwind-variants';

import colors from './colors';
import { CaretDown } from './icons';
import type { InputControllerType } from './input';
import { Modal, useModal } from './modal';
import { Text } from './text';

const selectTv = tv({
  slots: {
    container: 'flex-1 mb-4',
    label: 'text-grey-100 mb-1 text-lg dark:text-neutral-100',
    input:
      'mt-0 flex-row items-center justify-center rounded-xl border-[0.5px] p-3  border-neutral-300 dark:border-neutral-700',
    inputValue: 'dark:text-neutral-100',
  },

  variants: {
    focused: {
      true: {
        input: 'border-neutral-300 dark:border-neutral-700',
      },
    },
    error: {
      true: {
        input: 'border-danger-600',
        label: 'text-danger-600 dark:text-danger-600',
        inputValue: 'text-danger-600',
      },
    },
    disabled: {
      true: {
        input: 'bg-neutral-100 dark:bg-neutral-700 opacity-50',
      },
    },
  },
  defaultVariants: {
    error: false,
    disabled: false,
  },
});

const List = Platform.OS === 'web' ? FlashList : BottomSheetFlatList;

export type OptionType = { label: string; value: string | number };

type OptionsProps = {
  options: OptionType[];
  onSelect: (option: OptionType) => void;
  testID?: string;
  title?: string;
  value?: string | number;
};

function keyExtractor(item: OptionType) {
  return `select-item-${item.value}`;
}

export const Options = React.forwardRef<BottomSheetModal, OptionsProps>(
  ({ options, onSelect, value, testID, title }, ref) => {
    const maxHeight = 400;
    const height = Math.min(options.length * 70 + 100, maxHeight);
    const snapPoints = React.useMemo(() => [height], [height]);
    const { colorScheme } = useColorScheme();
    const isDark = colorScheme === 'dark';

    const renderSelectItem = React.useCallback(
      ({ item }: { item: OptionType }) => (
        <Option
          key={`select-item-${item.value}`}
          label={item.label}
          selected={value === item.value}
          onPress={() => onSelect(item)}
          testID={testID ? `${testID}-item-${item.value}` : undefined}
        />
      ),
      [onSelect, value, testID]
    );

    return (
      <Modal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: isDark ? colors.neutral[800] : colors.white,
        }}
        title={title}
      >
        <List
          data={options}
          keyExtractor={keyExtractor}
          renderItem={renderSelectItem}
          testID={testID ? `${testID}-modal` : undefined}
          estimatedItemSize={52}
        />
      </Modal>
    );
  }
);

const Option = React.memo(
  ({
    label,
    selected = false,
    ...props
  }: PressableProps & {
    selected?: boolean;
    label: string;
  }) => {
    return (
      <Pressable
        className="flex-row items-center border-b border-neutral-300 bg-white px-3 py-2 dark:border-neutral-700 dark:bg-neutral-800"
        {...props}
      >
        <Text className="flex-1 dark:text-neutral-100 ">{label}</Text>
        {selected && <Check />}
      </Pressable>
    );
  }
);

export interface SelectProps {
  keyValue?: 'label' | 'value';
  value?: string | number;
  label?: string;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  options?: OptionType[];
  optionsTitle?: string;
  onSelect?: (value: string | number) => void;
  placeholder?: string;
  required?: boolean;
  testID?: string;
}
interface ControlledSelectProps<T extends FieldValues>
  extends SelectProps,
    InputControllerType<T> {}

export const Select = (props: SelectProps) => {
  const {
    keyValue = 'label',
    label,
    value,
    error,
    placeholder = 'Select...',
    helpText,
    disabled = false,
    onSelect,
    options = [],
    optionsTitle,
    testID,
    required = false,
  } = props;
  const modal = useModal();

  const onSelectOption = React.useCallback(
    (option: OptionType) => {
      onSelect?.(option.value);
      modal.dismiss();
    },
    [modal, onSelect]
  );

  const styles = React.useMemo(
    () =>
      selectTv({
        error: Boolean(error),
        disabled,
      }),
    [error, disabled]
  );

  const textValue = React.useMemo(() => {
    const selectedOption = options?.find((t) => t.value === value);
    return selectedOption ? selectedOption[keyValue] : placeholder;
  }, [value, options, placeholder, keyValue]);

  return (
    <>
      <View className={styles.container()}>
        {label && (
          <Text
            testID={testID ? `${testID}-label` : undefined}
            className={styles.label()}
          >
            {label}
            {required && (
              <Text className="text-danger-600 dark:text-danger-600 text-[16px]">
                *
              </Text>
            )}
          </Text>
        )}
        <Pressable
          className={styles.input()}
          disabled={disabled}
          onPress={modal.present}
          testID={testID ? `${testID}-trigger` : undefined}
        >
          <View className="flex-1">
            <Text className={styles.inputValue()}>{textValue}</Text>
          </View>
          <CaretDown />
        </Pressable>
        {error ? (
          <Text
            testID={`${testID}-error`}
            className="text-sm text-danger-300 dark:text-danger-600 mt-1"
          >
            {error}
          </Text>
        ) : (
          !!helpText && (
            <Text className="text-neutral-500 dark:text-neutral-400 text-sm mt-1">
              {helpText}
            </Text>
          )
        )}
      </View>
      <Options
        testID={testID}
        ref={modal.ref}
        options={options}
        onSelect={onSelectOption}
        title={optionsTitle}
      />
    </>
  );
};

// only used with react-hook-form
export function ControlledSelect<T extends FieldValues>(
  props: ControlledSelectProps<T>
) {
  const { name, control, rules, onSelect: onNSelect, ...selectProps } = props;

  const { field, fieldState } = useController({ control, name, rules });
  const onSelect = React.useCallback(
    (value: string | number) => {
      field.onChange(value);
      onNSelect?.(value);
    },
    [field, onNSelect]
  );
  return (
    <Select
      onSelect={onSelect}
      value={field.value}
      error={fieldState.error?.message}
      {...selectProps}
    />
  );
}

const Check = ({ ...props }: SvgProps) => (
  <Svg
    width={25}
    height={24}
    fill="none"
    viewBox="0 0 25 24"
    {...props}
    className="stroke-black dark:stroke-white"
  >
    <Path
      d="m20.256 6.75-10.5 10.5L4.506 12"
      strokeWidth={2.438}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
