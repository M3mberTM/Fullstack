import { Text as NativeText, StyleSheet } from 'react-native';

import theme from '../../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextForeground: {
    color: theme.colors.foreground,
  },
  colorHeadingPrimary: {
    color: theme.colors.headingPrimary,
  },
  colorHeadingSecondary: {
    color: theme.colors.headingSecondary,
  },
  fontSizeSubheading: {
    fontSize: theme.fontSizes.subheading,
  },
  fontSizeHeading: {
    fontSize: theme.fontSizes.heading,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'heading' && styles.colorHeadingPrimary,
    color === 'headingSecondary' && styles.colorHeadingSecondary,
    color === 'foreground' && styles.colorTextForeground,
    fontSize === 'subheading' && styles.fontSizeSubheading,
    fontSize === 'heading' && styles.fontSizeHeading,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} testID={'text'} />;
};

export default Text;