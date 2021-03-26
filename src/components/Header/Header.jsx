import React from "react";
import { useDispatch, useSelector } from "react-redux";
import AuthFormContainer from "../AuthForm/AuthFormContainer";
import actions from "../../utils/actions";

const Header = () => {
  const dispatch = useDispatch();
  const { authForm } = useSelector((state) => state);
  const logoutUser = () => {
    dispatch({ type: actions.REMOVE_USER });
    throw new Error("not implemented");
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
    <>
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
    </>
  );
};

export default Header;
