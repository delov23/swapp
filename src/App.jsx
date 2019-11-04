import React, { useState } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';

import ThemeContext, { LIGHT_THEME, DARK_THEME } from './context/ThemeContext';
import { themify } from './utils/themify';
import Navigation from './components/Navigation/Navigation';
import styles from './App.module.css';

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || LIGHT_THEME,
  );

  const toggleTheme = () => {
    const newTheme = theme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <ThemeContext.Provider value={theme}>
      <div className={styles[themify('appWrapper', theme)]}>
        <BrowserRouter>
          <Navigation toggleTheme={toggleTheme} />
          <Switch></Switch>
        </BrowserRouter>
      </div>
    </ThemeContext.Provider>
  );
};

export default App;
