import React from 'react';

import { PermissionRoute } from '../PermissionRoute';
import { AUTHENTICATED_PERMISSION } from '../PermissionRoute/PermissionRoute';

const AuthRoute = props => {
  return <PermissionRoute permission={AUTHENTICATED_PERMISSION} {...props} />;
};

export default AuthRoute;
