import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import StarshipPage from './components/StarshipPage/StarshipPage';
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

const Starship = ({ match }) => {
  const { data, loading, error } = useQuery(STARSHIP_QUERY, {
    variables: {
      id: match.params.starshipId,
    },
  });

  if (loading) return <Loading />;
  if (error) return <Redirect to="/logout" />;

  return <StarshipPage starship={data.starship} />;
};

export default Starship;
