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
  err,
}) => {
  return (
    <div className="auth-modal" onClick={closeForm}>
      <div className="auth-form-container">
        <div className="close" onClick={closeForm}>
          X
        </div>
        <h2 className="auth-form--title">{isSignup ? "регистрация" : "вход"}</h2>
        <h6 className="auth-form--title">{err}</h6>
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
            placeholder={"Email"}
            className="auth-form--input"
          />
          <input
            type="password"
            name="password"
            className="auth-form--input"
            required
            placeholder={"Пароль"}
            autoComplete="current-password"
          />
          {isSignup && (
            <label
              className="add-avatar-btn auth-form--input_file"
              style={{ backgroundImage: `url(${imgUrl})` }}
            >
              <input type="file" accept="image/*" name="profileImg" onChange={readImg} />
              {"Выбрать фото"}
            </label>
          )}
          <input type="submit" className="auth-form_submit" value={"Подтвердить"} />
        </form>
      </div>
    </div>
  );
};

export default AuthForm;
