import React, { useContext } from 'react';

import styles from './Loading.module.css';
import { themify } from '../../utils/themify';
import ThemeContext from '../../context/ThemeContext';

const Loading = () => {
  const theme = useContext(ThemeContext);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles[themify('loader', theme)]}>SW</h1>
    </div>
  );
};

export default Loading;
