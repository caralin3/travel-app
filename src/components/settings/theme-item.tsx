import React, { useCallback, useMemo } from 'react';

import type { OptionType } from '@/components/ui';
import { Options, useModal } from '@/components/ui';
import type { ColorSchemeType } from '@/lib';
import { useSelectedTheme } from '@/lib';

import { Item } from './item';

export const ThemeItem = () => {
  const { selectedTheme, setSelectedTheme } = useSelectedTheme();
  const modal = useModal();

  const onSelect = useCallback(
    (option: OptionType) => {
      setSelectedTheme(option.value as ColorSchemeType);
      modal.dismiss();
    },
    [setSelectedTheme, modal]
  );

  const themes = useMemo(
    () => [
      { label: `Dark 🌙`, value: 'dark' },
      { label: `Light 🌞`, value: 'light' },
      { label: `System ⚙️`, value: 'system' },
    ],
    []
  );

  const theme = useMemo(
    () => themes.find((t) => t.value === selectedTheme),
    [selectedTheme, themes]
  );

  return (
    <>
      <Item text="Theme" value={theme?.label} onPress={modal.present} />
      <Options
        ref={modal.ref}
        options={themes}
        onSelect={onSelect}
        value={theme?.value}
      />
    </>
  );
};
