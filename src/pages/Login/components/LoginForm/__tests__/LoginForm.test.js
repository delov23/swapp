import React from 'react';
import { shallow } from 'enzyme';

import { LoginForm } from '../';

describe('<LoginForm />', () => {
  it('should match snapshot', () => {
    expect(shallow(<LoginForm />)).toMatchSnapshot();
  });
});
