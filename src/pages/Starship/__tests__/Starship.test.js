import React from 'react';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import { Starship } from '../';
import { STARSHIP_QUERY, STATS_QUERY } from '../Starship';
import { Loading } from '../../../components/Loading';
import { act } from 'react-dom/test-utils';

const EXAMPLE_PROPS = {
  match: {
    params: {
      starshipId: 'starships.2',
    },
  },
};

const mocks = [
  {
    request: {
      query: STARSHIP_QUERY,
      variables: { starshipId: EXAMPLE_PROPS.match.params.starshipId },
    },
    result: {
      data: {
        starship: {
          id: 'starships.2',
          name: 'CR90 corvette',
          model: 'CR90 corvette',
          image:
            'https://vignette.wikia.nocookie.net/starwarsmush/images/d/dd/Ship_capital_cr90.jpg/revision/latest?cb=20090605054905',
          starshipClass: 'corvette',
          cost: 3500000,
          maxMLPerHour: 60,
          maxAtmosphericSpeed: 950,
          hyperdriveRating: 2,
          crew: 165,
        },
      },
    },
  },
  {
    request: {
      query: STATS_QUERY,
      variables: {
        type: 'corvette',
      },
    },
    result: {
      data: {
        allStarships: {
          edges: [
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
        },
      },
    },
  },
  {
    request: {
      query: STATS_QUERY,
      variables: {
        type: undefined,
      },
    },
    result: new Error(),
  },
];

// const errMocks = [
//   {
//     request: {
//       query: STARSHIP_QUERY,
//       variables: { starshipId: EXAMPLE_PROPS.match.params.starshipId },
//     },
//     result: new Error('Test'),
//   },
//   {
//     request: {
//       query: STATS_QUERY,
//       variables: {
//         type: undefined,
//       },
//     },
//     result: new Error('Test'),
//   },
// ];

describe('<Starship />', () => {
  it('should match snapshot', () => {
    expect(
      shallow(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Starship {...EXAMPLE_PROPS} />
        </MockedProvider>,
      ),
    ).toMatchSnapshot();
  });

  it('should display loading screen', async () => {
    let wrapper;

    await act(async () => {
      wrapper = mount(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Starship {...EXAMPLE_PROPS} />
        </MockedProvider>,
      );
    });

    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  //   it('should display data', async () => {
  //     const wrapper = mount(
  //       <Router>
  //         <MockedProvider mocks={mocks} addTypename={false}>
  //           <Starship {...EXAMPLE_PROPS} />
  //         </MockedProvider>
  //       </Router>,
  //     );

  //     await wait(0);
  //     wrapper.update();

  //     expect(wrapper.find(StarshipPage)).toHaveLength(1);
  //   });

  // it('should redirect', async () => {
  //   const wrapper = mount(
  //     <Router>
  //       <MockedProvider mocks={errMocks} addTypename={false}>
  //         <Starship {...EXAMPLE_PROPS} />
  //       </MockedProvider>
  //     </Router>,
  //   );

  //   await wait(0);
  //   wrapper.update();

  //   await wait(0);
  //   wrapper.update();

  //   await wait(0);
  //   wrapper.update();

  //   console.log(wrapper.html());

  //   expect(wrapper.find(Redirect)).toHaveLength(1);
  // });
});
