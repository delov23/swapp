import React, { useContext } from 'react';

import { themify } from '../../../../utils/themify';
import ThemeContext from '../../../../context/ThemeContext';
import { LeftImageCard } from '../../../../components/LeftImageCard';
import { SpecText } from '../../../../components/SpecText';
import { Button } from '../../../../components/Button';
import styles from './EpisodePage.module.css';

const EpisodePage = ({ loadMore, people, episode, loadingCharacters }) => {
  const theme = useContext(ThemeContext);

  return (
    <main>
      <section className={styles[themify('poster', theme)]}>
        <img className={styles.image} src={episode.image} alt="Episode" />
        <div className={styles.titles}>
          <h1 className={styles[themify('title', theme)]}>
            Star Wars: Episode {episode.episodeId}
          </h1>
          <h2 className={styles[themify('subtitle', theme)]}>
            {episode.title}
          </h2>
        </div>
      </section>
      <div className={styles[themify('box', theme)]}>
        <p className={styles.opening}>{episode.openingCrawl}</p>
        <SpecText left={'Director'} right={episode.director} />
        <SpecText left={'Release Date'} right={episode.releaseDate} />
      </div>
      <section>
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          {people.edges.map(({ node }) => (
            <LeftImageCard
              key={node.id}
              width="30%"
              image={node.image}
              text={node.name}
              href={'/characters/' + node.id}
            />
          ))}
        </div>
        <div style={{ textAlign: 'center' }}>
          {loadingCharacters && (
            <h3 className={styles.loadingFallback}>Working on it...</h3>
          )}
          {!loadingCharacters && people.pageInfo.hasNextPage && (
            <Button onClick={loadMore}>Load More</Button>
          )}
        </div>
      </section>
    </main>
  );
};

export default EpisodePage;
