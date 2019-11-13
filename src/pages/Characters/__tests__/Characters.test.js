import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import wait from 'waait';

import Characters, { CHARACTERS_QUERY } from '../Characters';
import { CharactersPage } from '../components/CharactersPage';
import { LeftImageCard } from '../../../components/LeftImageCard';

const mocks = [
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        first: 10,
      },
    },
    result: () => ({
      data: {
        allPeople: {
          edges: [
            {
              node: {
                name: 'Luke Skywalker',
                id: 'people.1',
                image:
                  'https://links.gunaxin.com/content/images/post_images/Luke_Skywalker_039_s_Original_039_Star_Wars_039_Lightsaber_Is_Going_Up_For_Auction_1544116268_4528.jpg',
              },
              cursor: 'Y3Vyc29yLnBlb3BsZS4x',
            },
            {
              node: {
                name: 'Obi-Wan Kenobi',
                id: 'people.10',
                image:
                  'https://fsmedia.imgix.net/eb/d1/19/f1/9a64/4b2d/8471/d02314b53684/obi-wan-kenobi-in-the-original-star-wars.jpeg?crop=edges&fit=crop&auto=compress&h=1200&w=1200',
              },
              cursor: 'Y3Vyc29yLnBlb3BsZS4xMA==',
            },
            {
              node: {
                name: 'Anakin Skywalker',
                id: 'people.11',
                image:
                  'https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Anakin-Jedi.jpg/220px-Anakin-Jedi.jpg',
              },
              cursor: 'Y3Vyc29yLnBlb3BsZS4xMQ==',
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: 'Y3Vyc29yLnBlb3BsZS4xMQ==',
          },
        },
      },
    }),
  },
];

const errorMocks = [
  {
    request: {
      query: CHARACTERS_QUERY,
    },
    result: new Error('Test'),
  },
];

describe('<Characters />', () => {
  it('should match snapshot', () => {
    expect(
      shallow(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Characters />
        </MockedProvider>,
      ),
    ).toMatchSnapshot();
  });

  it('should display Characters', async () => {
    const wrapper = mount(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Characters />
        </MockedProvider>
      </Router>,
    );

    await wait(0);
    wrapper.update();

    expect(wrapper.find(CharactersPage).find(LeftImageCard)).toHaveLength(3);
  });

  it('should redirect when error occurs', async () => {
    const wrapper = mount(
      <Router>
        <MockedProvider mocks={errorMocks} addTypename={false}>
          <Characters />
        </MockedProvider>
      </Router>,
    );

    await wait(0);
    wrapper.update();

    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});
