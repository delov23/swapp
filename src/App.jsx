import React, { useState } from 'react';
import { BrowserRouter, Switch, Redirect } from 'react-router-dom';
import { ApolloProvider } from '@apollo/react-hooks';

import client from './client';
import ThemeContext, { LIGHT_THEME, DARK_THEME } from './context/ThemeContext';
import { themify } from './utils/themify';
import styles from './App.module.css';

import { Navigation } from './components/Navigation';
import { Login } from './pages/Login';
import { AnonymousRoute } from './components/AnonymousRoute';
import { AuthRoute } from './components/AuthRoute';
import { Logout } from './pages/Logout';
import { Episodes } from './pages/Episodes';
import { Characters } from './pages/Characters';
import { Episode } from './pages/Episode';
import { Character } from './pages/Character';
import { Starship } from './pages/Starship';

const App = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || LIGHT_THEME,
  );

  const toggleTheme = currTheme => {
    const newTheme = currTheme === LIGHT_THEME ? DARK_THEME : LIGHT_THEME;
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleHome = () => <Redirect to="/episodes" />;

  return (
    <ApolloProvider client={client}>
      <ThemeContext.Provider value={theme}>
        <div className={styles[themify('appWrapper', theme)]}>
          <BrowserRouter>
            <Navigation toggleTheme={() => toggleTheme(theme)} />
            <Switch>
              <AnonymousRoute path="/login" component={Login} />
              <AuthRoute exact path="/" render={handleHome} />
              <AuthRoute path="/logout" component={Logout} />
              <AuthRoute exact path="/episodes" component={Episodes} />
              <AuthRoute path="/episodes/:episodeId" component={Episode} />
              <AuthRoute exact path="/characters" component={Characters} />
              <AuthRoute
                path="/characters/:characterId"
                component={Character}
              />
              <AuthRoute path="/starships/:starshipId" component={Starship} />
            </Switch>
          </BrowserRouter>
        </div>
      </ThemeContext.Provider>
    </ApolloProvider>
  );
};

export default App;
