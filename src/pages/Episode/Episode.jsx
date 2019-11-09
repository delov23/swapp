import React from 'react';
import gql from 'graphql-tag.macro';
import { useQuery } from '@apollo/react-hooks';
import { Loading } from '../../components/Loading';

export const EPISODE_QUERY = gql`
  query episode($id: ID!, $first: Int!, $after: String) {
    episode(id: $id) {
      id
      title
      openingCrawl
      director
      releaseDate
      episodeId
      image
      people(first: $first, after: $after) {
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
  }
`;

const Episode = ({ match }) => {
  const { loading, error, data, fetchMore } = useQuery(EPISODE_QUERY, {
    variables: {
      first: 5,
      id: match.params.episodeId,
    },
  });

  const handleMore = () => {
    fetchMore({
      variables: { after: data.episode.people.pageInfo.endCursor },
      updateQuery: (prev, { fetchMoreResult: { episode } }) => {
        return {
          episode: {
            ...episode,
            people: {
              ...episode.people,
              edges: [...prev.episode.people.edges, ...episode.people.edges],
            },
          },
        };
      },
    });
  };

  if (loading) return <Loading />;
  if (error) return <div>err</div>;

  const {
    episode: { people, title },
  } = data;

  return (
    <>
      <div>
        <h1>{title}</h1>
        {people.edges.map(({ node }) => (
          <h3 key={node.id}>{node.name}</h3>
        ))}
      </div>
      <button onClick={handleMore}>Load more</button>
    </>
  );
};

export default Episode;
