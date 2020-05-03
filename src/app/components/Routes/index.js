import React, { lazy } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Switch } from 'react-router-dom';

import Suspense from '../Suspense';

import AuthenticatedRoute from './components/AuthenticatedRoute';
import styles from './styles.scss';

import Routes from '~constants/routes';
import { history } from '~redux/store';

const Dashboard = lazy(() => import('~screens/Dashboard'));
const Login = lazy(() => import('~screens/Login'));

function AppRoutes() {
  return (
    <ConnectedRouter history={history}>
      <div className={styles.container}>
        <Suspense>
          <Switch>
            <AuthenticatedRoute isPublicRoute exact path={Routes.LOGIN} component={Login} />
            <AuthenticatedRoute isPublicRoute path={Routes.HOME} component={Dashboard} />
          </Switch>
        </Suspense>
      </div>
    </ConnectedRouter>
  );
}

export default AppRoutes;
