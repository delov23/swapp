import React from 'react';
import { shallow, mount } from 'enzyme';

import { Loading } from '../';
import ThemeContext, {
  LIGHT_THEME,
  DARK_THEME,
} from '../../../context/ThemeContext';

describe('<Loading />', () => {
  it('should match snapshot', () => {
    expect(shallow(<Loading />)).toMatchSnapshot();
  });

  it('should support theming', () => {
    const wrapper = mount(
      <ThemeContext.Provider value={LIGHT_THEME}>
        <Loading />
      </ThemeContext.Provider>,
    );

    expect(wrapper.find(Loading).find('h1')).toHaveClassName('loaderLight');
  });

  it('should support theming', () => {
    const wrapper = mount(
      <ThemeContext.Provider value={DARK_THEME}>
        <Loading />
      </ThemeContext.Provider>,
    );

    expect(wrapper.find(Loading).find('h1')).toHaveClassName('loaderDark');
  });
});
