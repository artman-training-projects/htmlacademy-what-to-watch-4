import * as React from 'react';
import {Route, Redirect, RouteComponentProps} from 'react-router-dom';
import {connect} from 'react-redux';

import {AuthorizationStatus, Pages} from '../../const';
import {getAuthStatus} from '../../reducer/user/selectors';
import Loading from '../loading/loading';

interface Props {
  auth: {
    status: string;
    error: boolean;
    isProgress: boolean;
  };
  exact: boolean;
  path: string;
  render: (routeProps: RouteComponentProps<number> | null) => React.ReactNode;
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
  const {auth, exact, path, render} = props;

  const isAuth = auth.status === AuthorizationStatus.AUTH;
  const isProgress = auth.isProgress;

  return (
    <Route
      exact={exact}
      path={path}
      render={(routeProps) => {
        if (isAuth && !isProgress) {
          return render(routeProps);
        }

        if (isProgress) {
          return <Loading />;
        }

        return <Redirect to={`${Pages.SIGN_IN}`} />;
      }}
    />
  );
};

const mapStateToProps = (state) => ({
  auth: getAuthStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
