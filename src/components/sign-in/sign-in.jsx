import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getAuthError} from '../../reducer/user/selector.js';
import {Operations as UserOperations} from '../../reducer/user/user.js';

import Footer from '../footer/footer.jsx';

class SignIn extends PureComponent {
  constructor(props) {
    super(props);

    this.emailRef = createRef();
    this.passwordRef = createRef();
  }

  render() {
    const {authorizationError, handleAuthSubmit} = this.props;

    const isInvalidRequest = authorizationError ?
      <React.Fragment>
        <div className="sign-in__message">
          <p>Please enter a valid email address</p>
        </div>
      </React.Fragment> : ``;

    return (<React.Fragment>
      <div className="user-page">
        <header className="page-header user-page__head">
          <div className="logo">
            <a href="/" className="logo__link">
              <span className="logo__letter logo__letter--1">W</span>
              <span className="logo__letter logo__letter--2">T</span>
              <span className="logo__letter logo__letter--3">W</span>
            </a>
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
  authorizationError: PropTypes.bool.isRequired,
  handleAuthSubmit: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationError: getAuthError(state),
});

const mapDispatchToProps = (dispatch) => ({
  handleAuthSubmit(authData) {
    dispatch(UserOperations.login(authData));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
