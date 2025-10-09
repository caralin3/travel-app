import React from 'react';
import type { TextProps, TextStyle } from 'react-native';
import { Text as NNText, StyleSheet } from 'react-native';
import { twMerge } from 'tailwind-merge';

interface Props extends TextProps {
  className?: string;
  tx?: string;
}

export const Text = ({
  className = '',
  style,
  tx,
  children,
  ...props
}: Props) => {
  const textStyle = React.useMemo(
    () =>
      twMerge(
        'text-base text-black  dark:text-white  font-inter font-normal',
        className
      ),
    [className]
  );

  const nStyle = React.useMemo(
    () => StyleSheet.flatten([style]) as TextStyle,
    [style]
  );
  return (
    <NNText className={textStyle} style={nStyle} {...props}>
      {tx ? tx : children}
    </NNText>
  );
};
