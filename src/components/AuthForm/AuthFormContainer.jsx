import React, { useState } from "react";
import { signin, signup } from "../../utils/api/api";
import AuthForm from "./AuthForm";

const AuthFormContainer = ({ isSignup, closeForm }) => {
  const [imgUrl, setImgUrl] = useState(
    "https://www.pinclipart.com/picdir/big/15-154296_gender-neutral-user-account-icon-png-clipart.png"
  );
  const [nameValue, setNameValue] = useState("");
  const [namePlaceHolder, setNamePlaceHolder] = useState("Имя");
  const [authErr, setAuthErr] = useState(null);
  const reader = new FileReader();

  reader.onload = (e) => {
    setImgUrl(e.target.result);
  };

  const readImg = (e) => {
    reader.readAsDataURL(e.target.files[0]);
  };

  const changeNameValue = (e) => {
    setNameValue(e.target.value);
  };

  const handleSignin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    const res = await signin(data);
    if (res.status === 403) {
      setAuthErr("incorrect email or password");
    }
    if (res.status === 200) {
      setAuthErr(null);
      closeForm();
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const res = await signup(data);
    const resStatus = await res.status;
    const resUser = await res.user;
    if (resStatus === 422) {
      setAuthErr("incorrect email or password");
    }
    if (resStatus === 200) {
      setAuthErr(null);
      closeForm();
    }
  };

  return (
    <AuthForm
      handleSignup={handleSignup}
      handleSignin={handleSignin}
      namePlaceHolder={namePlaceHolder}
      nameValue={nameValue}
      closeForm={closeForm}
      isSignup={isSignup}
      imgUrl={imgUrl}
      readImg={readImg}
      changeNameValue={changeNameValue}
      err={authErr}
    />
  );
};

export default AuthFormContainer;
