
import { IRoutePropsWithAuth } from './routes.interface';

// TODO: fix this with a barrel file. Currently typescript-eslint/parser:2.24.0 used by react-router-dom throws a parsing error with it
import { RouteEnum } from '../core/enums/route.enum';
import { LoginPage } from '../pages/login-page';
import { DashboardPage } from '../pages/dashboard-page';
import { NotFoundPage } from '../pages/not-found-page';

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