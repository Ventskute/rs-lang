import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthFormContainer from "../AuthForm/AuthFormContainer";
import actions from "../../utils/actions";
import { userLS } from "../../utils/localStore";
import { Button, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './Header.scss';

const Header = () => {
  const dispatch = useDispatch();
  const { authForm, user } = useSelector((state) => state);
  
  const logoutUser = () => {
    userLS.setUser(null);
  };
  
  const openSignupForm = () => {
    dispatch({
      type: actions.SET_AUTHFORM,
      payload: { isFormOpen: true, isSignup: true },
    });
  };
  const openSigninForm = () => {
    dispatch({
      type: actions.SET_AUTHFORM,
      payload: { isFormOpen: true, isSignup: false },
    });
  };
  const closeAuthForm = (e) => {
    if (!e || e.target === e.currentTarget) {
      dispatch({
        type: actions.SET_AUTHFORM,
        payload: { isFormOpen: false },
      });
    }
  };

  return (
    <header>
      <Container>
        <Link to="/">
          <h1 className="logo_title"><span className="logo_title--rs">RS</span> LANG</h1>
        </Link>
        <div className="login-buttons">
          { !user && <>
            <Button variant="primary" className="login-button" onClick={openSignupForm}>Зарегистрироваться</Button>
            <Button variant="primary" className="login-button" onClick={openSigninForm}>Войти</Button>
          </>}
          { user && <>
            { user.avatar &&
              <div className="avatar-wrapper">
                <img src={user.avatar} />
              </div>
            }
            <h3 className="login-name">{user.login}</h3>
            <button className="login-button" onClick={logoutUser}>Выйти</button>
          </>}
        </div>
      </Container>
      { authForm.isFormOpen && (
        <AuthFormContainer closeForm={closeAuthForm} isSignup={authForm.isSignup} />
      )}
    </header>
  );
};

export default Header;
