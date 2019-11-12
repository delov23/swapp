import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { CharactersPage } from '../';
import { LeftImageCard } from '../../../../../components/LeftImageCard';
import { Button } from '../../../../../components/Button';

const mockClick = jest.fn();

const EXAMPLE_PROPS = {
  pageInfo: {
    hasNextPage: true,
  },
  people: [
    {
      node: { name: 'Name 1', image: 'image 1', id: 'people.1' },
    },
    {
      node: { name: 'Name 2', image: 'image 2', id: 'people.2' },
    },
  ],
  handleClick: new mockClick(),
};

describe('<CharactersPage />', () => {
  it('should match snapshot', () => {
    expect(shallow(<CharactersPage {...EXAMPLE_PROPS} />)).toMatchSnapshot();
  });

  it('should display info', () => {
    const wrapper = mount(
      <Router>
        <CharactersPage {...EXAMPLE_PROPS} />
      </Router>,
    );

    expect(wrapper.find(LeftImageCard)).toHaveLength(2);
  });

  it('should recognize click', () => {
    const wrapper = mount(
      <Router>
        <CharactersPage {...EXAMPLE_PROPS} />
      </Router>,
    );

    wrapper.find(Button).simulate('click');
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});
