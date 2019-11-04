import { LIGHT_THEME, DARK_THEME } from '../context/ThemeContext';

export const themify = (property, theme) => {
  const themeLower = theme.toLowerCase();

  if (themeLower !== LIGHT_THEME && themeLower !== DARK_THEME) {
    throw new Error('Invalid theme');
  }

  return property + theme.charAt(0).toUpperCase() + themeLower.substring(1);
};
