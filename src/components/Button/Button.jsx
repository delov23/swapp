import React, { useContext } from 'react';

import styles from './Button.module.css';
import ThemeContext from '../../context/ThemeContext';
import { themify } from '../../utils/themify';

const Button = props => {
  const theme = useContext(ThemeContext);

  return (
    <button className={styles[themify('submitBtn', theme)]} {...props}>
      {props.children}
    </button>
  );
};

export default Button;
