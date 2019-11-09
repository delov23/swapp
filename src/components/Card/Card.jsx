import React, { useContext } from 'react';

import ThemeContext from '../../context/ThemeContext';
import styles from './Card.module.css';
import { themify } from '../../utils/themify';
import { SpecText } from '../SpecText';

const Card = ({
  specs = (
    <>
      <SpecText left="Height" right="1.66m" />
      <SpecText left="Height" right="1.66m" />
      <SpecText left="Height" right="1.66m" />
      <SpecText left="Height" right="1.66m" />
    </>
  ),
  title = 'Hello',
  image = 'https://cdn-media-1.freecodecamp.org/images/RRwqmKgTbtRjQNW28kK0neRfS6idxrjYhjOT',
}) => {
  const theme = useContext(ThemeContext);

  return (
    <div className={styles[themify('card', theme)]}>
      <h3 className={styles[themify('title', theme)]}>{title}</h3>
      <img className={styles.image} src={image} alt="Starship" />
      <div>{specs}</div>
    </div>
  );
};

export default Card;
