
/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * Colors optimized for Arabic marketplace application
 */

const tintColorLight = '#8B4513';
const tintColorDark = '#D2691E';

export const Colors = {
  light: {
    text: '#1e293b',
    background: '#f8fafc',
    tint: tintColorLight,
    icon: '#8B4513',
    tabIconDefault: '#A0522D',
    tabIconSelected: tintColorLight,
    primary: '#8B4513',
    secondary: '#D2691E',
    accent: '#F4A460',
    danger: '#ef4444',
    warning: '#f97316',
    success: '#10b981',
    card: '#ffffff',
    border: '#D2691E',
    // ألوان التطبيق البنية الموحدة
    brown: {
      primary: '#8B4513',
      secondary: '#D2691E', 
      light: '#F4A460',
      dark: '#654321',
      gradient: ['#8B4513', '#D2691E', '#F4A460'],
    },
  },
  dark: {
    text: '#f1f5f9',
    background: '#2F1B14',
    tint: tintColorDark,
    icon: '#D2691E',
    tabIconDefault: '#A0522D',
    tabIconSelected: tintColorDark,
    primary: '#D2691E',
    secondary: '#F4A460',
    accent: '#DEB887',
    danger: '#f87171',
    warning: '#fb923c',
    success: '#34d399',
    card: '#3E2723',
    border: '#8B4513',
    // ألوان التطبيق البنية الموحدة
    brown: {
      primary: '#D2691E',
      secondary: '#F4A460',
      light: '#DEB887',
      dark: '#654321',
      gradient: ['#D2691E', '#F4A460', '#DEB887'],
    },
  },
};

export const Fonts = {
  regular: 'Tajawal_400Regular',
  medium: 'Tajawal_500Medium',
  bold: 'Tajawal_700Bold',
};
