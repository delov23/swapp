import React from 'react';
import { gql } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';

import styles from './Episodes.module.css';
import EpisodeCard from './components/EpisodeCard/EpisodeCard';
import { Loading } from '../../components/Loading/';

export const ALL_EPISODES_QUERY = gql`
  query {
    allEpisodes(first: 100) {
      edges {
        node {
          id
          image
          title
          openingCrawl
        }
      }
    }
  }
`;

const Episodes = () => {
  const { data, loading, error } = useQuery(ALL_EPISODES_QUERY);

  if (loading) return <Loading />;
  if (error) return <h3>Error</h3>;

  return (
    <main className={styles.deck}>
      <div className={styles.cards}>
        {data.allEpisodes.edges.map(({ node }) => (
          <EpisodeCard key={node.id} episode={node} />
        ))}
      </div>
    </main>
  );
};

export default Episodes;
