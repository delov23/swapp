import React from 'react';
import { gql } from 'graphql.macro';
import { useQuery } from '@apollo/react-hooks';
import { Redirect } from 'react-router-dom';

import { CharacterPage } from './components/CharacterPage';
import { Loading } from '../../components/Loading';

export const CHARACTER_QUERY = gql`
  query character($id: ID!) {
    person(id: $id) {
      id
      name
      height
      mass
      image
      species {
        name
      }
      homeworld {
        name
      }
      starships {
        edges {
          node {
            id
            name
            image
          }
        }
      }
    }
  }
`;

const Character = ({ match: { params } }) => {
  const { characterId } = params;
  const { data, loading, error } = useQuery(CHARACTER_QUERY, {
    variables: {
      id: characterId,
    },
  });

  if (loading) return <Loading />;
  if (error) return <Redirect to="/logout" />;

  const { starships, ...character } = data.person;

  return <CharacterPage character={character} starships={starships} />;
};

export default Character;
