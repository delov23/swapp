import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { EpisodePage } from '../';
import { LeftImageCard } from '../../../../../components/LeftImageCard';
import { SpecText } from '../../../../../components/SpecText';
import { Button } from '../../../../../components/Button';

const loadMock = jest.fn();

const EXAMPLE_PROPS = {
  loadMore: loadMock,
  people: {
    edges: [
      {
        node: {
          id: 'person.1',
          name: 'Name 11',
          image: 'image 2',
        },
        cursor: 'HASH_1',
      },
      {
        node: {
          id: 'person.2',
          name: 'Name 22',
          image: 'image 3',
        },
        cursor: 'HASH_2',
      },
    ],
    pageInfo: {
      hasNextPage: false,
      endCursor: 'HASH_2',
    },
  },
  episode: {
    id: 'episode.1',
    title: '',
    openingCrawl: 'Long......',
    director: 'Name',
    releaseDate: '1993-11-02',
    episodeId: 10,
    image: 'image',
  },
  loadingCharacters: false,
};

describe('<EpisodePage />', () => {
  it('should match snapshot', () => {
    expect(shallow(<EpisodePage {...EXAMPLE_PROPS} />)).toMatchSnapshot();
  });

  it('should display information', () => {
    const wrapper = mount(
      <Router>
        <EpisodePage {...EXAMPLE_PROPS} />
      </Router>,
    );

    expect(wrapper.find(LeftImageCard)).toHaveLength(2);
    expect(wrapper.find(SpecText)).toHaveLength(2);
  });

  it('should hide the button', () => {
    const wrapper = mount(
      <Router>
        <EpisodePage {...EXAMPLE_PROPS} />
      </Router>,
    );

    expect(wrapper.find(Button)).toHaveLength(0);
  });

  it('should show the button/loading', async () => {
    const wrapper = mount(
      <Router>
        <EpisodePage
          {...{
            ...EXAMPLE_PROPS,
            people: {
              ...EXAMPLE_PROPS.people,
              pageInfo: { hasNextPage: true, endCursor: 'HASH_2' },
            },
          }}
        />
      </Router>,
    );
    wrapper.find(Button).simulate('click');
    expect(loadMock).toHaveBeenCalledTimes(1);
  });

  it('should show the button/loading', async () => {
    const wrapper = mount(
      <Router>
        <EpisodePage
          {...{
            ...EXAMPLE_PROPS,
            loadingCharacters: true,
          }}
        />
      </Router>,
    );
    expect(wrapper.find('.loadingFallback')).toHaveLength(1);
  });
});
