import React from 'react';
import { shallow, mount } from 'enzyme';

import { LoginForm } from '../';
import { Loading } from '../../../../../components/Loading';
import { ApolloError } from 'apollo-client';

describe('<LoginForm />', () => {
  it('should match snapshot', () => {
    expect(shallow(<LoginForm />)).toMatchSnapshot();
  });

  it('should submit', () => {
    const handleSubmit = jest
      .fn()
      .mockImplementation(cb => () => cb({ test: 'test' }));
    const wrapper = mount(<LoginForm handleLogin={handleSubmit} />);

    wrapper.find('form').simulate('submit');
    expect(handleSubmit).toBeCalledTimes(1);
  });

  it('should change the input', async () => {
    const handleSubmit = jest
      .fn()
      .mockImplementation(cb => () => cb({ test: 'test' }));
    const wrapper = mount(<LoginForm handleLogin={handleSubmit} />);

    wrapper
      .find('input[name="email"]')
      .simulate('change', { target: { value: 'val', name: 'email' } });

    expect(wrapper.find('input[name="email"]')).toHaveValue('val');
  });

  it('should display loading', () => {
    const wrapper = mount(<LoginForm loading={true} />);

    expect(wrapper.find(Loading)).toHaveLength(1);
  });

  it('should display error', () => {
    const wrapper = mount(
      <LoginForm error={new ApolloError({ errorMessage: 'Bad Request' })} />,
    );

    expect(wrapper.find('.textError')).toHaveText('Bad Request');
  });
});
