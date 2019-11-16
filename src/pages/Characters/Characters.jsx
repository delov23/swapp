import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag.macro';
import { Redirect } from 'react-router-dom';

import { Loading } from '../../components/Loading';
import { CharactersPage } from './components/CharactersPage';

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
      first: 12,
    },
  });

  const handleClick = () => {
    fetchMore({
      variables: {
        first: 12,
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
  if (error) return <Redirect to="logout" />;

  return (
    <CharactersPage
      people={data.allPeople.edges}
      pageInfo={data.allPeople.pageInfo}
      handleMore={handleClick}
    />
  );
};

export default Characters;
