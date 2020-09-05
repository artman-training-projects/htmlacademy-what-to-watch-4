import * as React from 'react';
import {Route, HashRouter, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PrivateRoute from '../private-route/private-route';

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

interface Props {
  auth: {
    status: string;
    error: boolean;
    isProgress: boolean;
  };
  loadFilmsStatus: {
    filmsIsLoading: boolean;
    loadingIsError: boolean;
  };
}

const App: React.FC<Props> = (props: Props) => {
  const {auth, loadFilmsStatus} = props;
  const isAuth = auth.status === AuthorizationStatus.AUTH;

  return (
    <HashRouter>
      <Switch>
        <Route exact path={Pages.MAIN}
          render={(routeProps) => <MainWrapped isAuth={isAuth} history={routeProps.history} />}
        />

        <Route exact path={Pages.SIGN_IN}
          render={(routeProps) => !isAuth ? <SignIn history={routeProps.history} /> :
            <Redirect to={Pages.MAIN} />}
        />

        <Route exact path={`${Pages.FILM}/:id?`}
          render={(routeProps) => {
            const selectedID = +routeProps.match.params.id;
            return (loadFilmsStatus.filmsIsLoading ?
              <Loading /> :
              <MovieCardWrapped selectedID={selectedID} history={routeProps.history} />);
          }}
        />

        <PrivateRoute exact path={`${Pages.FILM}/:id?/review`}
          render={(routeProps) => {
            const selectedID = +routeProps.match.params.id;
            return (loadFilmsStatus.filmsIsLoading ?
              <Loading /> :
              <AddReviewWrapped selectedID={selectedID} history={routeProps.history} />);
          }}
        />

        <Route exact path={`${Pages.PLAYER}/:id?`}
          render={(routeProps) => {
            const selectedID = +routeProps.match.params.id;
            return (loadFilmsStatus.filmsIsLoading ?
              <Loading /> :
              <VideoPlayerFullWrapped selectedID={selectedID} history={routeProps.history} />);
          }}
        />

        <PrivateRoute exact path={Pages.MY_LIST}
          render={(routeProps) => <MyList history={routeProps.history} />}
        />
      </Switch>
    </HashRouter>
  );
};

const mapStateToProps = (state) => ({
  auth: getAuthStatus(state),
  loadFilmsStatus: getFilmsStatus(state),
});

export default connect(mapStateToProps)(App);
