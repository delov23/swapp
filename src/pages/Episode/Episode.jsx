import React from 'react';

const Episode = ({ match }) => {
  console.log(match.params);

  return <div>{JSON.stringify(match.params)}</div>;
};

export default Episode;
