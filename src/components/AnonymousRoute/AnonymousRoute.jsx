import React from 'react';

import { PermissionRoute } from '../PermissionRoute';
import { ANONYMOUS_PERMISSION } from '../PermissionRoute/PermissionRoute';

const AnonymousRoute = props => {
  return <PermissionRoute permission={ANONYMOUS_PERMISSION} {...props} />;
};

export default AnonymousRoute;
