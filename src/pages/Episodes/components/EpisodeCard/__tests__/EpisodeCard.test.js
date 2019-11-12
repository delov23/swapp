import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { EpisodeCard } from '../';

const EXAMPLE_PROPS = {
  episode: {
    image: 'image',
    id: 'episodes.1',
    title: 'A new hope',
    openingCrawl: 'LONG TEXT',
  },
};

describe('<EpisodeCard />', () => {
  it('should match snapshot', () => {
    expect(shallow(<EpisodeCard {...EXAMPLE_PROPS} />)).toMatchSnapshot();
  });

  it('should display data', () => {
    const wrapper = mount(
      <Router>
        <EpisodeCard {...EXAMPLE_PROPS} />
      </Router>,
    );

    expect(wrapper.find('h3')).toHaveText(EXAMPLE_PROPS.episode.title);
  });
});
