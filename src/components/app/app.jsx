import React from 'react';
import {Route, Router, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {CustomPropTypes} from '../custom-prop-types.js';

import history from '../../history.js';
import {AuthorizationStatus, Pages} from '../../const.js';
import {getAuthStatus} from '../../reducer/user/selector.js';
import {Operations as DataOperations} from '../../reducer/data/data.js';
import {getFilms, getPromo} from '../../reducer/data/selectors.js';

import Main from '../main/main.jsx';
import MovieCard from '../movie-card/movie-card.jsx';
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

const COUNT_OF_SAME_FILMS = 4;

const App = (props) => {
  const {
    authorizationStatus,
    films,
    getComments,
    handleSubmitReview,
    onFilmSelect,
    selectedFilm
  } = props;

  const renderMain = () => (
    <MainWrapped
      onSmallMovieCardClick={onFilmSelect}
    />
  );

  const renderFilm = () => {
    const sameFilms = films
      .filter((movie) => movie.genre === selectedFilm.genre && movie.title !== selectedFilm.title)
      .slice(0, COUNT_OF_SAME_FILMS);

    getComments(selectedFilm.id);

    return <MovieCardWrapped
      {...props}
      authorizationStatus={authorizationStatus}
      film={selectedFilm}
      onSmallMovieCardClick={onFilmSelect}
      sameFilms={sameFilms}
    />;
  };

  const renderAddReview = () => (
    <AddReviewWrapped
      film={selectedFilm}
      onSubmitReview={handleSubmitReview}
    />
  );

  const renderPlayer = () => {
    return <VideoPlayerFullWrapped
      film={selectedFilm}
      onSmallMovieCardClick={onFilmSelect}
    />;
  };

  const renderMyList = () => true;

  const renderSignIn = () => <SignIn />;


  return (
    <Router history={history}>
      <Switch>
        <Route exact path={Pages.MAIN}
          render={() => renderMain()}>
        </Route>
        <Route exact path={`${Pages.FILM}/:id?`}
          render={() => renderFilm()}>
        </Route>
        <Route exact path={Pages.SIGN_IN}
          render={() => authorizationStatus === AuthorizationStatus.NO_AUTH ?
            renderSignIn() :
            <Redirect to={Pages.MAIN} />
          }>
        </Route>
        <Route exact path={`${Pages.FILM}/:id?/review`}
          render={() => renderAddReview()}>
        </Route>
        <Route exact path={`${Pages.PLAYER}/:id?`}
          render={() => renderPlayer()}>
        </Route>
        <Route exact path={Pages.MY_LIST}
          render={() => authorizationStatus === AuthorizationStatus.AUTH ?
            renderMyList() :
            <Redirect to={Pages.SIGN_IN}/>
          }>
        </Route>
      </Switch>
    </Router>
  );
};

App.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  films: PropTypes.arrayOf(CustomPropTypes.FILM).isRequired,
  getComments: PropTypes.func.isRequired,
  handleSubmitReview: PropTypes.func.isRequired,
  moviePoster: PropTypes.oneOfType([
    CustomPropTypes.FILM,
    PropTypes.bool,
  ]),
  onFilmSelect: PropTypes.func.isRequired,
  selectedFilm: PropTypes.oneOfType([
    CustomPropTypes.FILM,
    PropTypes.bool,
  ]),
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatus(state),
  films: getFilms(state),
  moviePoster: getPromo(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleSubmitReview(review, id) {
    dispatch(DataOperations.sendComment(review, id));
  },

  getComments(filmID) {
    dispatch(DataOperations.loadComments(filmID));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
