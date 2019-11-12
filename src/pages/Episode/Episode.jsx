import React from 'react';
import gql from 'graphql-tag.macro';
import { useQuery } from '@apollo/react-hooks';
import { Loading } from '../../components/Loading';
import { Redirect } from 'react-router-dom';
import { EpisodePage } from './components/EpisodePage';

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
    notifyOnNetworkStatusChange: () => console.log(2),
  });

  const loadMore = () => {
    fetchMore({
      variables: { after: data.episode.people.pageInfo.endCursor },
      updateQuery: (prev, { fetchMoreResult: { episode } }) => {
        if (!prev.episode.people.pageInfo.hasNextPage) return prev;
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

  if ((!data || !data.episode) && loading) return <Loading />;
  if (error) {
    return <Redirect to="/logout" />;
  }
  const {
    episode: { people, ...episode },
  } = data;

  return (
    <EpisodePage
      people={people}
      loadMore={loadMore}
      episode={episode}
      loadingCharacters={loading}
    />
  );
};

export default Episode;
