import * as React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

import {AuthorizationStatus, Pages} from '../../const';
import {getAuthStatus} from '../../reducer/user/selectors';
import Loading from '../loading/loading';

const PrivateRoute = (props) => {
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

PrivateRoute.propTypes = {
  auth: PropTypes.shape({
    status: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    isProgress: PropTypes.bool.isRequired,
  }).isRequired,
  exact: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: getAuthStatus(state),
});

export default connect(mapStateToProps)(PrivateRoute);
