import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import wait from 'waait';

import Characters, { CHARACTERS_QUERY } from '../Characters';
import { CharactersPage } from '../components/CharactersPage';
import { LeftImageCard } from '../../../components/LeftImageCard';
import { Button } from '../../../components/Button';
import { act } from 'react-dom/test-utils';

const mocks = [
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        first: 12,
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
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        first: 12,
        after: 'Y3Vyc29yLnBlb3BsZS4xMQ==',
      },
    },
    result: () => ({
      data: {
        allPeople: {
          edges: [
            {
              node: {
                name: 'Luke Skywalker',
                id: 'people.221',
                image:
                  'https://links.gunaxin.com/content/images/post_images/Luke_Skywalker_039_s_Original_039_Star_Wars_039_Lightsaber_Is_Going_Up_For_Auction_1544116268_4528.jpg',
              },
              cursor: 'Y3Vyc29yLnBlb3BsZS4x',
            },
            {
              node: {
                name: 'Obi-Wan Kenobi',
                id: 'people.2210',
                image:
                  'https://fsmedia.imgix.net/eb/d1/19/f1/9a64/4b2d/8471/d02314b53684/obi-wan-kenobi-in-the-original-star-wars.jpeg?crop=edges&fit=crop&auto=compress&h=1200&w=1200',
              },
              cursor: 'Y3Vyc29yLnBlb3BsZS4xMA==',
            },
            {
              node: {
                name: 'Anakin Skywalker',
                id: 'people.2211',
                image:
                  'https://upload.wikimedia.org/wikipedia/en/thumb/7/74/Anakin-Jedi.jpg/220px-Anakin-Jedi.jpg',
              },
              cursor: 'Y3Vyc29yLnBlb3BsZS4xMQ==',
            },
          ],
          pageInfo: {
            hasNextPage: true,
            endCursor: 'Y3Vyc29yLnBlb3BsZS4xMQ22',
          },
        },
      },
    }),
  },
  {
    request: {
      query: CHARACTERS_QUERY,
      variables: {
        first: 12,
        after: 'Y3Vyc29yLnBlb3BsZS4xMQ22',
      },
    },
    result: () => ({
      data: null,
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
    let wrapper;
    act(() => {
      wrapper = mount(
        <Router>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Characters />
          </MockedProvider>
        </Router>,
      );
    });

    await act(async () => {
      await wait(0);
      wrapper.update();
    });

    expect(wrapper.find(CharactersPage).find(LeftImageCard)).toHaveLength(3);
  });

  it('should redirect when error occurs', async () => {
    let wrapper;
    act(() => {
      wrapper = mount(
        <Router>
          <MockedProvider mocks={errorMocks} addTypename={false}>
            <Characters />
          </MockedProvider>
        </Router>,
      );
    });

    await act(async () => {
      await wait(0);
      wrapper.update();
    });

    expect(wrapper.find(Redirect)).toHaveProp('to', 'logout');
  });

  it('should fetchMore', async () => {
    let wrapper;

    await act(async () => {
      wrapper = mount(
        <Router>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Characters />
          </MockedProvider>
        </Router>,
      );
      await wait(10);
      wrapper.update();
      wrapper.find(Button).simulate('click');
      await wait(10);
      wrapper.update();
    });

    expect(wrapper.find(CharactersPage).find(LeftImageCard)).toHaveLength(6);

    await act(async () => {
      wrapper.find(Button).simulate('click');
      await wait(10);
      wrapper.update();
    });

    expect(wrapper.find(CharactersPage).find(LeftImageCard)).toHaveLength(6);
  });
});
