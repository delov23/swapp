import React from 'react';
import { shallow, mount } from 'enzyme';
import { MockedProvider } from '@apollo/react-testing';
import wait from 'waait';
import { BrowserRouter as Router } from 'react-router-dom';

import { Login } from '../';
import { LOG_IN } from '../Login';
import { Button } from '../../../components/Button';

const mocks = [
  {
    request: {
      query: LOG_IN,
      variables: { email: '', password: '' },
    },
    result: () => ({
      data: {
        signIn: {
          token: 'Example',
        },
      },
    }),
  },
];

describe('<Login />', () => {
  it('should match snapshot', () => {
    expect(
      shallow(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>,
      ),
    ).toMatchSnapshot();
  });

  it('should logIn', async () => {
    const wrapper = mount(
      <Router>
        <MockedProvider mocks={mocks} addTypename={false}>
          <Login />
        </MockedProvider>
      </Router>,
    );

    wrapper.find(Button).simulate('submit');
    await wait(10);
    wrapper.update();
    expect(localStorage.getItem('token')).toEqual('Example');
  });
});
