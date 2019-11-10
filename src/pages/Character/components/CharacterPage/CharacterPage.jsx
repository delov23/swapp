import React, { useContext } from 'react';
import { LeftImageCard } from '../../../../components/LeftImageCard';
import { Card } from '../../../../components/Card';
import { SpecText } from '../../../../components/SpecText';
import styles from './CharacterPage.module.css';
import { themify } from '../../../../utils/themify';
import ThemeContext from '../../../../context/ThemeContext';

const CharacterPage = ({ character, starships }) => {
  const theme = useContext(ThemeContext);

  console.log(character);
  console.log(starships);

  return (
    <main>
      <h1 className={styles[themify('name', theme)]}>{character.name}</h1>
      <hr />
      <section className={styles.content}>
        <div className={styles.leftBlock}>
          <Card image={character.image} title={character.name}>
            <SpecText left="Height" right={character.height} />
            <SpecText left="Weight" right={character.mass} />
            <SpecText left="Species" right={character.species.name} />
            <SpecText left="Home World" right={character.homeworld.name} />
          </Card>
        </div>
        <div className={styles.rightBlock}>
          <h2 className={styles[themify('heading', theme)]}>
            Piloted Starships
          </h2>
          <hr />
          {starships.edges.map(({ node }) => (
            <LeftImageCard
              image={node.image}
              text={node.name}
              width="100%"
              href={'/starships/' + node.id}
            />
          ))}
        </div>
      </section>
    </main>
  );
};

export default CharacterPage;
