import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { IRoutePropsWithAuth } from './routes.interface';
import { GlobalContext } from '../core/contexts';

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

  const Page = route.component;
  return (
    <Route
      path={route.path}
      exact={route.exact}
      component={route.component}
    />
  );
}