import React from 'react';
import { shallow, mount } from 'enzyme';

import { Card } from '../';
import ThemeContext, {
  LIGHT_THEME,
  DARK_THEME,
} from '../../../context/ThemeContext';

const EXAMPLE_PROPS = {
  image: 'https://img.com/img.png',
  title: 'Example',
};

describe('<Button />', () => {
  it('should match snapshot', () => {
    expect(shallow(<Card {...EXAMPLE_PROPS} />)).toMatchSnapshot();
  });

  it('should display the children', () => {
    const wrapper = mount(
      <Card {...EXAMPLE_PROPS}>
        <p>Child 1</p>
        <p>Child 2</p>
      </Card>,
    );

    expect(wrapper.find('p')).toHaveLength(2);
  });

  it('should support LIGHT_THEME', () => {
    const wrapper = mount(
      <ThemeContext.Provider value={LIGHT_THEME}>
        <Card {...EXAMPLE_PROPS} />
      </ThemeContext.Provider>,
    );

    expect(wrapper.find('div.cardLight')).toHaveLength(1);
  });

  it('should support DARK_THEME', () => {
    const wrapper = mount(
      <ThemeContext.Provider value={DARK_THEME}>
        <Card {...EXAMPLE_PROPS} />
      </ThemeContext.Provider>,
    );

    expect(wrapper.find('div.cardDark')).toHaveLength(1);
  });

  it('should display props from the parent', () => {
    const wrapper = mount(
      <Card {...EXAMPLE_PROPS}>
        <p>Child</p>
      </Card>,
    );

    expect(wrapper).toHaveProp('image', EXAMPLE_PROPS.image);
    expect(wrapper).toHaveProp('title', EXAMPLE_PROPS.title);
    expect(wrapper.html()).toContain('<p>Child</p>');
  });
});
