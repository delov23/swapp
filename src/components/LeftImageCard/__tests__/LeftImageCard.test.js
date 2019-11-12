import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { LeftImageCard } from '../';
import ThemeContext, {
  LIGHT_THEME,
  DARK_THEME,
} from '../../../context/ThemeContext';

const EXAMPLE_PROPS = {
  image: 'https://img.com/img.png',
  text: 'Example Example',
  href: '/logout',
  width: '50vw',
};

describe('<Button />', () => {
  it('should match snapshot', () => {
    expect(shallow(<LeftImageCard {...EXAMPLE_PROPS} />)).toMatchSnapshot();
  });

  it('should support LIGHT_THEME', () => {
    const wrapper = mount(
      <ThemeContext.Provider value={LIGHT_THEME}>
        <Router>
          <LeftImageCard {...EXAMPLE_PROPS} />
        </Router>
      </ThemeContext.Provider>,
    );

    expect(wrapper.find(LeftImageCard).find('a')).toHaveClassName('cardLight');
  });

  it('should support DARK_THEME', () => {
    const wrapper = mount(
      <ThemeContext.Provider value={DARK_THEME}>
        <Router>
          <LeftImageCard {...EXAMPLE_PROPS} />
        </Router>
      </ThemeContext.Provider>,
    );

    expect(wrapper.find(LeftImageCard).find('a')).toHaveClassName('cardDark');
  });

  it('should display props from the parent', () => {
    const wrapper = mount(
      <Router>
        <LeftImageCard {...EXAMPLE_PROPS} />
      </Router>,
    );

    expect(wrapper.find(LeftImageCard)).toHaveProp(
      'image',
      EXAMPLE_PROPS.image,
    );
    expect(wrapper.find(LeftImageCard)).toHaveProp('text', EXAMPLE_PROPS.text);
    expect(wrapper.find(LeftImageCard).find('a')).toHaveProp(
      'href',
      EXAMPLE_PROPS.href,
    );
    expect(wrapper.find(LeftImageCard).find('a')).toHaveStyle(
      'width',
      EXAMPLE_PROPS.width,
    );
  });

  it('should display props from the parent', () => {
    const wrapper = mount(
      <Router>
        <LeftImageCard {...{ ...EXAMPLE_PROPS, image: '' }} />
      </Router>,
    );

    expect(wrapper.find('img')).toHaveProp(
      'src',
      'https://wolper.com.au/wp-content/uploads/2017/10/image-placeholder.jpg',
    );
  });
});
