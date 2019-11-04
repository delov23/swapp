import { createContext } from 'react';

export const LIGHT_THEME = 'light';
export const DARK_THEME = 'dark';

const ThemeContext = createContext(LIGHT_THEME);

export default ThemeContext;
