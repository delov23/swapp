import React from 'react';
import { mount, shallow } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import { BrowserRouter as Router, Redirect } from 'react-router-dom';
import wait from 'waait';

import { Episodes } from '../';
import { ALL_EPISODES_QUERY } from '../Episodes';
import { EpisodeCard } from '../components/EpisodeCard';
import { act } from 'react-dom/test-utils';

const mocks = [
  {
    request: {
      query: ALL_EPISODES_QUERY,
    },
    result: () => ({
      data: {
        allEpisodes: {
          edges: [
            {
              node: {
                id: 'episodes.1',
                title: 'One',
                openingCrawl: 'Onee',
                image: 'one',
              },
            },
            {
              node: {
                id: 'episodes.2',
                title: 'Two',
                openingCrawl: 'Twee',
                image: 'two',
              },
            },
          ],
        },
      },
    }),
  },
];

const errorMocks = [
  {
    request: {
      query: ALL_EPISODES_QUERY,
    },
    result: new Error('Test'),
  },
];

describe('<Episodes />', () => {
  it('should match snapshot', () => {
    expect(
      shallow(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Episodes />
        </MockedProvider>,
      ),
    ).toMatchSnapshot();
  });

  it('should display EpisodeCards', async () => {
    let wrapper;

    await act(async () => {
      wrapper = mount(
        <Router>
          <MockedProvider mocks={mocks} addTypename={false}>
            <Episodes />
          </MockedProvider>
        </Router>,
      );

      await wait(0);
      wrapper.update();
    });

    expect(wrapper.find(EpisodeCard)).toHaveLength(2);
  });

  it('should redirect when error occurs', async () => {
    let wrapper;

    await act(async () => {
      wrapper = mount(
        <Router>
          <MockedProvider mocks={errorMocks} addTypename={false}>
            <Episodes />
          </MockedProvider>
        </Router>,
      );

      await wait(0);
      wrapper.update();
    });

    expect(wrapper.find(Redirect)).toHaveLength(1);
  });
});
