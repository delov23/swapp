import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { Navigation } from '../';
import ThemeContext, {
  LIGHT_THEME,
  DARK_THEME,
} from '../../../context/ThemeContext';

describe('<Navigation />', () => {
  it('should match snapshot', () => {
    expect(shallow(<Navigation />)).toMatchSnapshot();
  });

  it('should support LIGHT_THEME', () => {
    const wrapper = mount(
      <Router>
        <ThemeContext.Provider value={LIGHT_THEME}>
          <Navigation />
        </ThemeContext.Provider>
      </Router>,
    );

    expect(wrapper.find('nav')).toHaveClassName('navigationLight');
  });

  it('should support DARK_THEME', () => {
    const wrapper = mount(
      <Router>
        <ThemeContext.Provider value={DARK_THEME}>
          <Navigation />
        </ThemeContext.Provider>
      </Router>,
    );

    expect(wrapper.find('nav')).toHaveClassName('navigationDark');
  });
});
