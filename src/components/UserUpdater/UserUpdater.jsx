import React, { useEffect } from "react";
import actions from "../../utils/actions";
import { useDispatch } from "react-redux";

export const UserUpdater = ({ children }) => {
  const dispatch = useDispatch();
  const handleStorageChange = ({ newValue }) => {
    dispatch({ type: actions.SET_USER, user: newValue });
  };
  useEffect(() => {
    window.addEventListener("userUpdate", handleStorageChange);

    return () => window.removeEventListener("userUpdate", handleStorageChange);
  }, []);
  return <>{children}</>;
};
