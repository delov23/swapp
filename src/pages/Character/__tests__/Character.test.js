import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import wait from 'waait';

import { Character } from '../';
import { CHARACTER_QUERY } from '../Character';
import { CharacterPage } from '../components/CharacterPage';

const mocks = [
  {
    request: {
      query: CHARACTER_QUERY,
      variables: { id: 'people.1' },
    },
    result: () => ({
      data: {
        person: {
          id: 'people.1',
          name: 'Luke Skywalker',
          birthYear: null,
          height: 172,
          mass: 77,
          image:
            'https://links.gunaxin.com/content/images/post_images/Luke_Skywalker_039_s_Original_039_Star_Wars_039_Lightsaber_Is_Going_Up_For_Auction_1544116268_4528.jpg',
          homeworld: {
            name: 'Tatooine',
          },
          species: {
            name: 'Human',
          },
          starships: {
            edges: [
              {
                node: {
                  id: 'starships.12',
                  name: 'X-wing',
                  image:
                    'https://static.turbosquid.com/Preview/2015/10/14__02_29_23/xwingtopleft_01_open_01.jpgb5dc9c7c-25bc-44f8-88ba-50e41873111aOriginal.jpg',
                },
              },
              {
                node: {
                  id: 'starships.22',
                  name: 'Imperial shuttle',
                  image:
                    'http://dimmerlightstudios.com/wp-content/uploads/2017/08/star-wars-imperial-shuttle-front-shaded_on-white-folded.jpg',
                },
              },
            ],
          },
        },
      },
    }),
  },
];

const errorMocks = [
  {
    request: {
      query: CHARACTER_QUERY,
    },
    result: new Error('Test'),
  },
];

const nullMocks = [
  {
    request: {
      query: CHARACTER_QUERY,
      variables: { id: 'people.123980' },
    },
    result: () => ({
      data: {
        person: null,
      },
    }),
  },
];

const EXAMPLE_PROPS = { match: { params: { characterId: 'people.1' } } };

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

  it('should display Character', async () => {
    const wrapper = mount(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Character {...EXAMPLE_PROPS} />
        </MockedProvider>
      </Router>,
    );

    await wait(0);
    wrapper.update();

    expect(wrapper.find(CharacterPage)).toHaveLength(1);
  });

  it('should redirect when error occurs', async () => {
    const wrapper = mount(
      <Router>
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <Character {...EXAMPLE_PROPS} />
        </MockedProvider>
      </Router>,
    );

    await wait(0);
    wrapper.update();

    expect(wrapper.find(Redirect)).toHaveLength(1);
  });

  it('should redirect when no data', async () => {
    const wrapper = mount(
      <Router>
        <MockedProvider mocks={nullMocks} addTypename={false}>
          <Character
            {...{ match: { params: { characterId: 'people.123980' } } }}
          />
        </MockedProvider>
      </Router>,
    );

    await wait(0);
    wrapper.update();

    expect(wrapper.find(Redirect)).toHaveProp('to', '/characters');
  });
});
