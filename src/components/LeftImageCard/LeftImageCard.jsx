import React, { useContext } from 'react';
import PropTypes from 'prop-types';
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
      <img
        className={styles.image}
        src={
          image ||
          'https://wolper.com.au/wp-content/uploads/2017/10/image-placeholder.jpg'
        }
        alt=""
      />
      <h3 className={styles.heading}>{text}</h3>
    </Link>
  );
};

LeftImageCard.propTypes = {
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  image: PropTypes.string,
  text: PropTypes.string.isRequired,
  href: PropTypes.string.isRequired,
};

export default LeftImageCard;
