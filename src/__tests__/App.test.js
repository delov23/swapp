import React from 'react';
import { shallow, mount } from 'enzyme';

import App, { getToggledTheme } from '../App';
import { DARK_THEME, LIGHT_THEME } from '../context/ThemeContext';
import { Navigation } from '../components/Navigation';

describe('<App />', () => {
  it('renders without crashing', () => {
    const wrapper = shallow(<App />);
    expect(wrapper).toMatchSnapshot();
  });

  it('should toggle the theme', async () => {
    const wrapper = mount(<App />);

    wrapper
      .find(Navigation)
      .find('.siteLogo')
      .simulate('click');

    expect(localStorage.getItem('theme')).toEqual(DARK_THEME);
  });

  it('should change the theme properly', () => {
    expect(getToggledTheme(LIGHT_THEME)).toStrictEqual(DARK_THEME);
    expect(getToggledTheme(DARK_THEME)).toStrictEqual(LIGHT_THEME);
  });
});
