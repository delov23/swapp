import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import styles from './LeftImageCard.module.css';
import ThemeContext from '../../context/ThemeContext';
import { themify } from '../../utils/themify';

const LeftImageCard = ({ width, image, text, href }) => {
  const theme = useContext(ThemeContext);

  return (
    <Link
      to={href}
      style={{ width }}
      className={styles[themify('card', theme)]}
    >
      <img className={styles.image} src={image} alt="" />
      <h3 className={styles.heading}>{text}</h3>
    </Link>
  );
};

export default LeftImageCard;
