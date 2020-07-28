import React from 'react';
import {Route, Router, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

import history from '../../history.js';
import {AuthorizationStatus, Pages} from '../../const.js';
import {getAuthStatus} from '../../reducer/user/selector.js';
import {getFilmsStatus} from '../../reducer/data/selectors.js';

import Main from '../main/main.jsx';
import MovieCard from '../movie-card/movie-card.jsx';
import MyList from '../my-list/my-list.jsx';
import AddReview from '../add-review/add-review.jsx';
import VideoPlayerFull from '../video-player-full/video-player-full.jsx';
import SignIn from '../sign-in/sign-in.jsx';

import withActiveTab from '../../hoc/with-active-tab/with-active-tab.jsx';
import withComment from '../../hoc/with-comment/with-comment.jsx';
import withCountFilms from '../../hoc/with-count-films/with-count-films.jsx';
import withVideoControls from '../../hoc/with-video-controls/with-video-controls.jsx';

const MainWrapped = withCountFilms(Main);
const MovieCardWrapped = withActiveTab(MovieCard);
const AddReviewWrapped = withComment(AddReview);
const VideoPlayerFullWrapped = withVideoControls(VideoPlayerFull);

const App = (props) => {
  const {authorizationStatus, loadFilmsStatus} = props;

  const isAuth = authorizationStatus === AuthorizationStatus.AUTH ? true : false;

  return (
    <Router history={history}>
      <Switch>
        <Route exact path={Pages.MAIN}
          render={() => <MainWrapped />}
        />

        <Route exact path={Pages.SIGN_IN}
          render={() => isAuth ?
            <Redirect to={Pages.MAIN} /> :
            <SignIn />
          }
        />

        <Route exact path={`${Pages.FILM}/:id?`}
          render={(routeProps) => {
            const selectedID = +routeProps.match.params.id;
            return (loadFilmsStatus.filmsIsLoading ||
              <MovieCardWrapped
                selectedID={selectedID}
              />);
          }}
        />

        <Route exact path={`${Pages.FILM}/:id?/review`}
          render={(routeProps) => {
            if (isAuth) {
              const selectedID = +routeProps.match.params.id;
              return (loadFilmsStatus.filmsIsLoading ||
              <AddReviewWrapped
                selectedID={selectedID}
              />);
            }

            return <SignIn />;
          }}
        />

        <Route exact path={`${Pages.PLAYER}/:id?`}
          render={(routeProps) => {
            const selectedID = +routeProps.match.params.id;
            return (loadFilmsStatus.filmsIsLoading ||
              <VideoPlayerFullWrapped
                selectedID={selectedID}
              />);
          }}
        />

        <Route exact path={Pages.MY_LIST}
          render={() => isAuth ?
            <MyList /> :
            <Redirect to={Pages.SIGN_IN}/>
          }
        />
      </Switch>
    </Router>
  );
};

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  loadFilmsStatus: PropTypes.shape({
    filmsIsLoading: PropTypes.bool.isRequired,
    loadingIsError: PropTypes.bool.isRequired,
  }),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatus(state),
  loadFilmsStatus: getFilmsStatus(state),
});

export default connect(mapStateToProps)(App);
