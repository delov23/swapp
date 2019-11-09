import React from 'react';
import { CharacterPage } from './components/CharacterPage';

const Character = ({ match: { params } }) => {
  // const { characterId } = params;

  return <CharacterPage />;
};

export default Character;
