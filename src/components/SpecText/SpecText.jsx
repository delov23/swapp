import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ThemeContext from '../../context/ThemeContext';
import { themify } from '../../utils/themify';
import styles from './SpecText.module.css';

const SpecText = ({ left, right }) => {
  const theme = useContext(ThemeContext);

  return (
    <p className={styles.text}>
      <span className={styles[themify('left', theme)]}>{left}: </span>
      <span className={styles[themify('right', theme)]}>{right}</span>
    </p>
  );
};

SpecText.propTypes = {
  left: PropTypes.string.isRequired,
  right: PropTypes.string.isRequired,
};

export default SpecText;
