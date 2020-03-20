import { RouteEnum } from '../core/enums';

import { IRoutePropsWithAuth } from './routes.interface';
import { LoginPage, DashboardPage, NotFoundPage } from '../pages';

const routes: IRoutePropsWithAuth[] = [
  {
    path: '/',
    exact: true,
    component: LoginPage
  },
  {
    path: `/${RouteEnum.login}`,
    exact: true,
    component: LoginPage
  },
  {
    path: `/${RouteEnum.dashboard}`,
    exact: true,
    component: DashboardPage,
    requireAuth: true
  },
  {
    path: `/*`,
    exact: true,
    component: NotFoundPage
  }
];

export default routes