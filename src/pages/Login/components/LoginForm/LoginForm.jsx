import React, { useState, useContext } from 'react';

import styles from './Login.module.css';
import { themify } from '../../../../utils/themify';
import ThemeContext from '../../../../context/ThemeContext';
import Loading from '../../../../components/Loading/Loading';

const LoginForm = props => {
  const [user, setUser] = useState({ email: '', password: '' });
  const theme = useContext(ThemeContext);

  const handleSubmit = ev => {
    ev.preventDefault();
    const { email, password } = user;
    props.handleLogin({ variables: { email, password } });
  };

  const handleChange = ({ target: { value, name } }) => {
    setUser({
      ...user,
      [name]: value,
    });
  };

  if (props.loading) return <Loading />;

  return (
    <div className={styles.formWrapper}>
      <div className={styles.formContent}>
        <h1 className={styles.formHeading}>swapp</h1>
        <form
          className={styles[themify('loginForm', theme)]}
          onSubmit={handleSubmit}
        >
          {props.error && (
            <p className={styles.textError}>
              {props.error.message.replace('GraphQL error: ', '')}
            </p>
          )}
          <input
            className={styles[themify('inputField', theme)]}
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
          <input
            className={styles[themify('inputField', theme)]}
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
          <button type="submit" className={styles[themify('submitBtn', theme)]}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
