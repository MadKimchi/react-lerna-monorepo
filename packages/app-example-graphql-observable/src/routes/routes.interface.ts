import { RouteProps } from 'react-router-dom';

export interface IRoutePropsWithAuth extends RouteProps {
  requireAuth?: boolean;
  routes?: IRoutePropsWithAuth[];
}