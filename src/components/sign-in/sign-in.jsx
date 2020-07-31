import React, {PureComponent, createRef} from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getAuthStatus} from '../../reducer/user/selectors.js';
import {Operations as UserOperations} from '../../reducer/user/user.js';

import {Pages} from '../../const.js';
import Footer from '../footer/footer.jsx';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.emailRef = createRef();
    this.passwordRef = createRef();
  }

  render() {
    const {auth, handleAuthSubmit} = this.props;

    const isInvalidRequest = auth.error ?
      <React.Fragment>
        <div className="sign-in__message">
          <p>Please enter a valid email address</p>
        </div>
      </React.Fragment> : ``;

    return (<React.Fragment>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <Link to={Pages.MAIN} className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </Link>
          </div>

          <h1 className="page-title user-page__title">Sign in</h1>
        </header>

        <div className="sign-in user-page__content">
          <form action="#" className="sign-in__form"
            onSubmit={(evt) => {
              evt.preventDefault();
              handleAuthSubmit({
                email: this.emailRef.current.value,
                password: this.passwordRef.current.value,
              });
            }}
          >
            {isInvalidRequest}
            <div className="sign-in__fields">
              <div className="sign-in__field">
                <input className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" required
                  ref={this.emailRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
              </div>
              <div className="sign-in__field">
                <input className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" required
                  ref={this.passwordRef}
                />
                <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
              </div>
            </div>
            <div className="sign-in__submit">
              <button className="sign-in__btn" type="submit">Sign in</button>
            </div>
          </form>
        </div>

        <Footer />
      </div>
    </React.Fragment>);
  }
}

SignIn.propTypes = {
  auth: PropTypes.shape({
    status: PropTypes.string.isRequired,
    error: PropTypes.bool.isRequired,
  }).isRequired,
  checkAuth: PropTypes.func.isRequired,
  handleAuthSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: getAuthStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleAuthSubmit(authData) {
    dispatch(UserOperations.login(authData));
  },

  checkAuth() {
    dispatch(UserOperations.checkAuth());
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
