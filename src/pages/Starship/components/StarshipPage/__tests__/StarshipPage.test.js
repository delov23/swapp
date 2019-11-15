import React from 'react';
import { shallow, mount } from 'enzyme';

import { StarshipPage } from '../';

const EXAMPLE_PROPS = {
  starship: {
    id: 'starships.2',
    name: 'CR90 corvette',
    model: 'CR90 corvette',
    image:
      'https://vignette.wikia.nocookie.net/starwarsmush/images/d/dd/Ship_capital_cr90.jpg/revision/latest?cb=20090605054905',
    starshipClass: 'corvette',
    maxMLPerHour: 60,
    maxAtmosphericSpeed: 950,
    hyperdriveRating: 2,
    crew: 165,
  },
  stData: [
    {
      node: {
        id: 'starships.2',
        cost: 3500000,
        maxAtmosphericSpeed: 950,
        maxMLPerHour: 60,
        hyperdriveRating: 2,
        crew: 165,
      },
    },
  ],
};

describe('<StarshipPage />', () => {
  it('should match snapshot', () => {
    expect(shallow(<StarshipPage {...EXAMPLE_PROPS} />)).toMatchSnapshot();
  });

  it('should display data', () => {
    const wrapper = mount(<StarshipPage {...EXAMPLE_PROPS} />);

    expect(
      wrapper.findWhere(p => p.prop('right') === '0 credits'),
    ).toHaveLength(1);
  });
});
