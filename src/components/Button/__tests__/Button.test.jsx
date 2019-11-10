import React from 'react';
import { shallow, mount } from 'enzyme';

import { Button } from '../';
import ThemeContext, {
  LIGHT_THEME,
  DARK_THEME,
} from '../../../context/ThemeContext';

describe('<Button />', () => {
  it('should match snapshot', () => {
    expect(shallow(<Button>Test</Button>)).toMatchSnapshot();
  });

  it('should display the children', () => {
    const wrapper = mount(<Button>Test 1</Button>);

    expect(wrapper).toHaveText('Test 1');
  });

  it('should support LIGHT_THEME', () => {
    const wrapper = mount(
      <ThemeContext.Provider value={LIGHT_THEME}>
        <Button>Test 2</Button>
      </ThemeContext.Provider>,
    );

    expect(wrapper.find('button')).toHaveClassName('submitBtnLight');
  });

  it('should support DARK_THEME', () => {
    const wrapper = mount(
      <ThemeContext.Provider value={DARK_THEME}>
        <Button>Test 3</Button>
      </ThemeContext.Provider>,
    );

    expect(wrapper.find('button')).toHaveClassName('submitBtnDark');
  });

  it('should keep the props from the parent', () => {
    const wrapper = mount(<Button onClick={() => {}}>Test 4</Button>);

    expect(wrapper.find('button')).toHaveProp('onClick');
    expect(wrapper.find('button')).toHaveProp('children', 'Test 4');
  });
});
