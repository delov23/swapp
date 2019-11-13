import React from 'react';
import { shallow } from 'enzyme';

import { AuthRoute } from '../';

describe('<AuthRoute />', () => {
  it('should match snapshot', () => {
    expect(shallow(<AuthRoute />)).toMatchSnapshot();
  });
});
