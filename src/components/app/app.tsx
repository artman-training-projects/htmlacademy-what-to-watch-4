import * as React from 'react';
import {Route, Router, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import PrivateRoute from '../private-route/private-route';

import history from '../../history';
import {AuthorizationStatus, Pages} from '../../const';
import {getAuthStatus} from '../../reducer/user/selectors';
import {getFilmsStatus} from '../../reducer/data/selectors';

import Main from '../main/main';
import MovieCard from '../movie-card/movie-card';
import MyList from '../my-list/my-list';
import AddReview from '../add-review/add-review';
import VideoPlayerFull from '../video-player-full/video-player-full';
import SignIn from '../sign-in/sign-in';
import Loading from '../loading/loading';

import withActiveTab from '../../hoc/with-active-tab/with-active-tab';
import withComment from '../../hoc/with-comment/with-comment';
import withCountFilms from '../../hoc/with-count-films/with-count-films';
import withVideoControls from '../../hoc/with-video-controls/with-video-controls';

const MainWrapped = withCountFilms(Main);
const MovieCardWrapped = withActiveTab(MovieCard);
const AddReviewWrapped = withComment(AddReview);
const VideoPlayerFullWrapped = withVideoControls(VideoPlayerFull);

const App = (props) => {
  const {auth, loadFilmsStatus} = props;
  const isAuth = auth.status === AuthorizationStatus.AUTH;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={Pages.MAIN}
          render={() => <MainWrapped isAuth={isAuth} />}
        />

        <Route exact path={Pages.SIGN_IN}
          render={() => !isAuth ? <SignIn /> :
            <Redirect to={Pages.MAIN} />}
        />

        <Route exact path={`${Pages.FILM}/:id?`}
          render={(routeProps) => {
            const selectedID = +routeProps.match.params.id;
            return (loadFilmsStatus.filmsIsLoading ?
              <Loading /> :
              <MovieCardWrapped selectedID={selectedID} />);
          }}
        />

        <PrivateRoute exact path={`${Pages.FILM}/:id?/review`}
          render={(routeProps) => {
            const selectedID = +routeProps.match.params.id;
            return (loadFilmsStatus.filmsIsLoading ?
              <Loading /> :
              <AddReviewWrapped selectedID={selectedID}/>);
          }}
        />

        <Route exact path={`${Pages.PLAYER}/:id?`}
          render={(routeProps) => {
            const selectedID = +routeProps.match.params.id;
            return (loadFilmsStatus.filmsIsLoading ?
              <Loading /> :
              <VideoPlayerFullWrapped selectedID={selectedID} />);
          }}
        />

        <PrivateRoute exact path={Pages.MY_LIST}
          render={() => <MyList />}
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  auth: PropTypes.shape({
    status: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
    isProgress: PropTypes.bool.isRequired,
  }).isRequired,
  loadFilmsStatus: PropTypes.shape({
    filmsIsLoading: PropTypes.bool.isRequired,
    loadingIsError: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  auth: getAuthStatus(state),
  loadFilmsStatus: getFilmsStatus(state),
});

export default connect(mapStateToProps)(App);
