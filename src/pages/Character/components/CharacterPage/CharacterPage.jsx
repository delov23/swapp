import React, { useContext } from 'react';
import { LeftImageCard } from '../../../../components/LeftImageCard';
import { Card } from '../../../../components/Card';

import styles from './CharacterPage.module.css';
import { themify } from '../../../../utils/themify';
import ThemeContext from '../../../../context/ThemeContext';

const CharacterPage = () => {
  const theme = useContext(ThemeContext);

  return (
    <main>
      <h1 className={styles[themify('name', theme)]}>Title</h1>
      <hr />
      <section className={styles.content}>
        <div className={styles.leftBlock}>
          <Card />
        </div>
        <div className={styles.rightBlock}>
          <h2 className={styles[themify('heading', theme)]}>
            Piloted Starships
          </h2>
          <hr />
          <LeftImageCard width="100%" href={'/starships/' + 1} />
          <LeftImageCard width="100%" href={'/starships/' + 1} />
          <LeftImageCard width="100%" href={'/starships/' + 1} />
          <LeftImageCard width="100%" href={'/starships/' + 1} />
          <LeftImageCard width="100%" href={'/starships/' + 1} />
        </div>
      </section>
    </main>
  );
};

export default CharacterPage;
