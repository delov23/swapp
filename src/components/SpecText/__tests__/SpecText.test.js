import React from 'react';
import { shallow, mount } from 'enzyme';

import { SpecText } from '../';
import ThemeContext, {
  LIGHT_THEME,
  DARK_THEME,
} from '../../../context/ThemeContext';

const EXAMPLE_PROPS = {
  left: 'Bonus points',
  right: 9000,
};

describe('<SpecText />', () => {
  it('should match snapshot', () => {
    expect(shallow(<SpecText {...EXAMPLE_PROPS} />)).toMatchSnapshot();
  });

  it('should render info from props', () => {
    const wrapper = mount(<SpecText {...EXAMPLE_PROPS} />);

    expect(wrapper.html()).toContain('Bonus points: ');
    expect(wrapper.html()).toContain('9000');
  });

  it('should support LIGHT_THEME', () => {
    const wrapper = mount(
      <ThemeContext.Provider value={LIGHT_THEME}>
        <SpecText {...EXAMPLE_PROPS} />
      </ThemeContext.Provider>,
    );

    expect(wrapper.find('.leftLight').text()).toEqual('Bonus points: ');
    expect(wrapper.find('.rightLight').text()).toEqual('9000');
  });

  it('should support DARK_THEME', () => {
    const wrapper = mount(
      <ThemeContext.Provider value={DARK_THEME}>
        <SpecText {...EXAMPLE_PROPS} />
      </ThemeContext.Provider>,
    );

    expect(wrapper.find('.leftDark').text()).toEqual('Bonus points: ');
    expect(wrapper.find('.rightDark').text()).toEqual('9000');
  });
});
