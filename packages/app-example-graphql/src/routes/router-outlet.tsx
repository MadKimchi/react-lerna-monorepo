import React from 'react';
import { Switch } from 'react-router-dom';

import { IRoutePropsWithAuth } from './routes.interface';
import { RouteWithSubRoutes } from './route';

/**
 * Use this component for any new section of routes (any config object that has a "routes" property
 */
export default function RouterOutlet({
  routes
}: {
  routes: IRoutePropsWithAuth[];
}) {
  // **NOTE**
  // You may wonder why not using useHistory here and directly assign it to the context.
  // Unfortunately, the use of useHistory hook causes re-rendering of the entire component every time route changes.
  // Ref: https://github.com/ReactTraining/react-router/issues/6999
  // Therefore it is better to encapsulate the history object inside a service layer after
  // any of the page component class gets initialized; page is a page.

  return (
    <Switch>
      {routes.map((route: IRoutePropsWithAuth, index: number) => (
        <RouteWithSubRoutes key={index} {...route} />
      ))}
    </Switch>
  );
}