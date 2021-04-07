import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthFormContainer from "../AuthForm/AuthFormContainer";
import actions from "../../utils/actions";
import { userLS } from "../../utils/localStore";

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
    if (!e) {
      dispatch({
        type: actions.SET_AUTHFORM,
        payload: { isFormOpen: false },
      });
    } else if (e.target === e.currentTarget) {
      dispatch({
        type: actions.SET_AUTHFORM,
        payload: { isFormOpen: false },
      });
    }
  };
  return (
    <header>
      {user && user.name}
      <button className="login-button" onClick={openSignupForm}>
        signup
      </button>
      <button className="login-button" onClick={openSigninForm}>
        login
      </button>
      <button className="login-button" onClick={logoutUser}>
        logout
      </button>
      {authForm.isFormOpen && (
        <AuthFormContainer closeForm={closeAuthForm} isSignup={authForm.isSignup} />
      )}
    </header>
  );
};

export default Header;
