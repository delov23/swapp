import React, { useContext } from 'react';
import PropTypes from 'prop-types';

import ThemeContext from '../../context/ThemeContext';
import styles from './Card.module.css';
import { themify } from '../../utils/themify';

const Card = ({ image, title, children }) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={styles[themify('card', theme)]}>
      <h3 className={styles[themify('title', theme)]}>{title}</h3>
      {image && <img className={styles.image} src={image} alt="Starship" />}
      <div>{children}</div>
    </div>
  );
};

Card.propTypes = {
  title: PropTypes.string,
  image: PropTypes.string,
};

export default Card;
