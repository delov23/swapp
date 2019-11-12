import React from 'react';
import { shallow, mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';

import { CharacterPage } from '../';
import { SpecText } from '../../../../../components/SpecText';
import { LeftImageCard } from '../../../../../components/LeftImageCard';
import { EXAMPLE_DATA } from '../../../__tests__/Character.test';

const EXAMPLE_PROPS = { ...EXAMPLE_DATA };

describe('<CharacterPage />', () => {
  it('should match snapshot', () => {
    expect(shallow(<CharacterPage {...EXAMPLE_PROPS} />)).toMatchSnapshot();
  });

  it('should display basic information', () => {
    const wrapper = mount(
      <Router>
        <CharacterPage {...EXAMPLE_PROPS} />
      </Router>,
    );

    expect(wrapper.find(SpecText)).toHaveLength(4);
    expect(wrapper.find(LeftImageCard)).toHaveLength(2);
  });
});
