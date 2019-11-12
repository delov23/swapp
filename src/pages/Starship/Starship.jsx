import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import { StarshipPage } from './components/StarshipPage';
import gql from 'graphql-tag.macro';
import { Loading } from '../../components/Loading';

export const STARSHIP_QUERY = gql`
  query starship($id: ID!) {
    starship(id: $id) {
      id
      name
      starshipClass
      cost
      crew
      maxAtmosphericSpeed
      hyperdriveRating
      maxMLPerHour
      image
      hyperdriveRating
      model
    }
  }
`;

export const STATS_QUERY = gql`
  query allStarships($type: String!) {
    allStarships(first: 100, filter: { starshipClass: $type }) {
      edges {
        node {
          cost
          maxAtmosphericSpeed
          maxMLPerHour
          hyperdriveRating
          crew
        }
      }
    }
  }
`;

const Starship = ({ match }) => {
  const { data, loading, error } = useQuery(STARSHIP_QUERY, {
    variables: {
      id: match.params.starshipId,
    },
  });

  const { data: stData, loading: stLoading, error: stError } = useQuery(
    STATS_QUERY,
    {
      variables: {
        type: data.starship ? data.starship.starshipClass : null,
      },
    },
  );

  if (loading || stLoading || stError) return <Loading />;
  if (error) return <Redirect to="/logout" />;

  return <StarshipPage starship={data.starship} stData={stData} />;
};

export default Starship;
