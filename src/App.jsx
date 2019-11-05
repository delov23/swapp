import React, { useState } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './client';
import ThemeContext, { LIGHT_THEME, DARK_THEME } from './context/ThemeContext';
import { themify } from './utils/themify';
import styles from './App.module.css';

import Navigation from './components/Navigation/Navigation';
import { Login } from './pages/Login/';
import { AnonymousRoute } from './components/AnonymousRoute';
import { AuthRoute } from './components/AuthRoute';

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
    <ApolloProvider client={client}>
      <ThemeContext.Provider value={theme}>
        <div className={styles[themify('appWrapper', theme)]}>
          <BrowserRouter>
            <Navigation toggleTheme={toggleTheme} />
            <Switch>
              <AuthRoute path="/" exact render={() => <div>Home</div>} />
              <AnonymousRoute path="/login" component={Login} />
              <AuthRoute
                path="/logout"
                render={() => {
                  localStorage.removeItem('token');
                  client.writeData({ data: { authenticated: false } });
                  return <Redirect to="/login" />;
                }}
              />
            </Switch>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </ApolloProvider>
  );
};

export default App;
