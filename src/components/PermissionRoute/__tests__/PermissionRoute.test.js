import React from 'react';
import { mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';

import { PermissionRoute } from '../';
import {
  AUTHENTICATED_PERMISSION,
  AUTHENTICATED_QUERY,
} from '../PermissionRoute';
import { Loading } from '../../Loading';

const mockUnauth = [
  {
    request: {
      query: AUTHENTICATED_QUERY,
    },
    result: () => ({
      data: {
        authenticated: false,
      },
    }),
  },
];

// const mockAuth = [
//   {
//     request: {
//       query: AUTHENTICATED_QUERY,
//     },
//     result: () => ({
//       data: {
//         authenticated: true,
//       },
//     }),
//   },
// ];

describe('<PermissionRoute />', () => {
  it('should display loading screen', () => {
    const wrapper = mount(
      <MockedProvider mocks={mockUnauth} addTypename={false}>
        <PermissionRoute permission={AUTHENTICATED_PERMISSION} />
      </MockedProvider>,
    );

    expect(wrapper).toContainReact(<Loading />);
  });

  // it('should return redirect', async () => {
  //   const wrapper = mount(
  //     <Router>
  //       <MockedProvider mocks={mockAuth} addTypename={false}>
  //         <PermissionRoute permission={ANONYMOUS_PERMISSION} />
  //       </MockedProvider>
  //     </Router>,
  //   );

  //   await wait(0);
  //   wrapper.update();

  //   expect(wrapper.find(Redirect)).toHaveLength(1);
  // });
});
