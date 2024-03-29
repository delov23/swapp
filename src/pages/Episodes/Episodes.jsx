import React from 'react';
import { gql } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import styles from './Episodes.module.css';
import { EpisodeCard } from './components/EpisodeCard';
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
  if (error) return <Redirect to="/logout" />;

  return (
    <main>
      <div className={styles.cards}>
        {data.allEpisodes.edges.map(({ node }) => (
          <EpisodeCard key={node.id} episode={node} />
        ))}
      </div>
    </main>
  );
};

export default Episodes;
