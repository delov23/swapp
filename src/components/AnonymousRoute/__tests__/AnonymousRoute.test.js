import React from 'react';
import { shallow } from 'enzyme';

import { AnonymousRoute } from '../';

describe('<AnonymousRoute />', () => {
  it('should match snapshot', () => {
    expect(shallow(<AnonymousRoute />)).toMatchSnapshot();
  });
});
