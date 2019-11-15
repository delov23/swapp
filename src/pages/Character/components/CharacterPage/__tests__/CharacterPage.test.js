import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { CharacterPage } from '../';
import { SpecText } from '../../../../../components/SpecText';
import { LeftImageCard } from '../../../../../components/LeftImageCard';
import ThemeContext, { LIGHT_THEME } from '../../../../../context/ThemeContext';

const EXAMPLE_PROPS = {
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

const EXAMPLE_EMPTY_PROPS = {
  character: {},
  starships: {
    edges: [],
  },
};

describe('<CharacterPage />', () => {
  it('should match snapshot', () => {
    expect(shallow(<CharacterPage {...EXAMPLE_PROPS} />)).toMatchSnapshot();
  });

  it('should display basic information', () => {
    const wrapper = mount(
      <Router>
        <CharacterPage {...EXAMPLE_PROPS} />
      </Router>,
    );

    expect(wrapper.find(SpecText)).toHaveLength(4);
    expect(wrapper.find(LeftImageCard)).toHaveLength(2);
  });

  it('should display basic information', () => {
    const wrapper = mount(
      <Router>
        <CharacterPage {...EXAMPLE_PROPS} />
      </Router>,
    );

    expect(wrapper.find(SpecText)).toHaveLength(4);
    expect(wrapper.find(LeftImageCard)).toHaveLength(2);
  });

  it('should display sign of emptiness', () => {
    const wrapper = mount(
      <Router>
        <ThemeContext.Provider value={LIGHT_THEME}>
          <CharacterPage {...EXAMPLE_EMPTY_PROPS} />
        </ThemeContext.Provider>
      </Router>,
    );

    expect(
      wrapper.findWhere(w => {
        return w.prop('right', 'N/A');
      }),
    ).toHaveLength(4);
    expect(wrapper.find('h2.nameLight')).toHaveLength(1);
  });
});
