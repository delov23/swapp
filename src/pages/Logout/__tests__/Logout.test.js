import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { Logout } from '../';

describe('<Logout />', () => {
  it('should match snapshot', () => {
    expect(shallow(<Logout />)).toMatchSnapshot();
  });

  it('should redirect upon arrival', () => {
    localStorage.setItem('token', 'example');

    const wrapper = mount(
      <Router>
        <Logout />
      </Router>,
    );

    wrapper.update();

    expect(localStorage.getItem('token')).toBeFalsy();
  });
});
