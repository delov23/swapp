import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag.macro';

import { Loading } from '../../components/Loading';
import { Button } from '../../components/Button';
import { LeftImageCard } from '../../components/LeftImageCard';
import styles from './Characters.module.css';

export const CHARACTERS_QUERY = gql`
  query characters($first: Int!, $after: String) {
    allPeople(first: $first, after: $after) {
      edges {
        node {
          id
          name
          image
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

const Characters = () => {
  const { data, loading, error, fetchMore } = useQuery(CHARACTERS_QUERY, {
    variables: {
      first: 10,
    },
  });

  const handleClick = () => {
    fetchMore({
      variables: {
        first: 10,
        after: data.allPeople.pageInfo.endCursor,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return;
        return {
          allPeople: {
            ...fetchMoreResult.allPeople,
            edges: [
              ...prev.allPeople.edges,
              ...fetchMoreResult.allPeople.edges,
            ],
          },
        };
      },
    });
  };

  if (loading) return <Loading />;
  if (error) return <div>Err</div>;

  return (
    <main className={styles.wrapper}>
      <div className={styles.cardsWrapper}>
        <div className={styles.cards}>
          {data.allPeople.edges.map(({ node }) => (
            <LeftImageCard
              key={node.id}
              width="20rem"
              text={node.name}
              image={node.image}
              href={'/characters/' + node.id}
            />
          ))}
        </div>
      </div>
      {data.allPeople.pageInfo.hasNextPage && (
        <Button onClick={handleClick}>Load more</Button>
      )}
    </main>
  );
};

export default Characters;
