import React from 'react';
import { /*mount,*/ shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
// import { BrowserRouter as Router } from 'react-router-dom';

import { Character } from '../';
import { CHARACTER_QUERY } from '../Character';
// import { wait } from '@testing-library/react';
// import { CharacterPage } from '../components/CharacterPage';

export const EXAMPLE_DATA = {
  character: {
    image: 'https://image.com/img.jpg',
    name: 'Name',
    mass: 209,
    height: 200,
    species: { name: 'Spec' },
    homeworld: { name: 'Home' },
  },
  starships: {
    edges: [
      {
        node: {
          image: 'https://image.com/img2.jpg',
          name: 'Edge 1',
          id: 'starship.1',
        },
      },
      {
        node: {
          image: 'https://image.com/img3.jpg',
          name: 'Edge 2',
          id: 'starship.2',
        },
      },
    ],
  },
};

const mocks = [
  {
    request: {
      query: CHARACTER_QUERY,
      variables: { id: 'people.1' },
    },
    result: () => ({
      data: {
        character: {
          ...EXAMPLE_DATA.character,
          starships: {
            ...EXAMPLE_DATA.starships,
          },
        },
      },
    }),
  },
];

const EXAMPLE_PROPS = { match: { params: { characterId: 10 } } };

describe('<Character />', () => {
  it('should match snapshot', () => {
    expect(
      shallow(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Character {...EXAMPLE_PROPS} />
        </MockedProvider>,
      ),
    ).toMatchSnapshot();
  });

  // it('should display loading screen', async () => {
  //   const wrapper = mount(
  //     <MockedProvider mocks={mocks} addTypename={false}>
  //       <Router>
  //         <Character {...EXAMPLE_PROPS} />
  //       </Router>
  //     </MockedProvider>,
  //   );

  //   await wait(() => {
  //     wrapper.update();
  //     expect(wrapper.find(CharacterPage)).toHaveLength(1);
  //   });
  // });
});
