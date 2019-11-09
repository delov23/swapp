import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import styles from './EpisodeCard.module.css';
import { themify } from '../../../../utils/themify';
import ThemeContext from '../../../../context/ThemeContext';

const EpisodeCard = ({ episode: { image, id, title, openingCrawl } }) => {
  const theme = useContext(ThemeContext);

  return (
    <Link to={'/episodes/' + id} className={styles[themify('card', theme)]}>
      <img className={styles.cardImg} src={image} alt="" />
      <h3 className={styles[themify('heading', theme)]}>{title}</h3>
      <p className={styles.paragraph}>{openingCrawl}</p>
    </Link>
  );
};

EpisodeCard.propTypes = {
  episode: PropTypes.object.isRequired,
};

export default EpisodeCard;
