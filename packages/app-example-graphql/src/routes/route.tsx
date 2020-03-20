import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { IRoutePropsWithAuth } from './routes.interface';
// TODO: fix this with a barrel file. Currently typescript-eslint/parser:2.24.0 used by react-router-dom throws a parsing error with it
import { GlobalContext } from '../core/contexts/global.context';

// TODO: make this code more modular and create interface for whatever additional properties required.
/**
 * Render a route with potential sub routes
 * https://reacttraining.com/react-router/web/example/route-config
 */
export function RouteWithSubRoutes(route: IRoutePropsWithAuth) {
  const { authService } = useContext(GlobalContext).service;

  if (!!route.requireAuth && !authService.isLoggedIn) {
    return <Redirect to={{ pathname: '/' }} />;
  }

  return (
    <Route
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  );
}