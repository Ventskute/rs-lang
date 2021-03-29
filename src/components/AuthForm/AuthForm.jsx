import React from "react";

import "./AuthForm.scss";

const AuthForm = ({
  isSignup,
  closeForm,
  handleSignup,
  handleSignin,
  namePlaceHolder,
  nameValue,
  imgUrl,
  readImg,
  changeNameValue,
}) => {
  return (
    <div className="auth-modal" onClick={closeForm}>
      <div className="auth-form-container">
        <div className="close" onClick={closeForm}>
          X
        </div>
        <h2 className="auth-form--title">{isSignup ? "signup" : "signin"}</h2>
        <form className="auth-form" onSubmit={isSignup ? handleSignup : handleSignin}>
          {isSignup && (
            <input
              name="name"
              type="text"
              required
              placeholder={namePlaceHolder}
              value={nameValue}
              className="auth-form--input"
              onChange={changeNameValue}
            />
          )}
          <input
            name="email"
            type="email"
            required
            placeholder={"email"}
            className="auth-form--input"
          />
          <input
            type="password"
            name="password"
            className="auth-form--input"
            required
            placeholder={"password"}
          />
          {isSignup && (
            <label
              className="add-avatar-btn auth-form--input_file"
              style={{ backgroundImage: `url(${imgUrl})` }}
            >
              <input type="file" accept="image/*" name="profileImg" onChange={readImg} />
              {"add avatar"}
            </label>
          )}
          <input type="submit" className="auth-form_submit" value={"submit"} />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
