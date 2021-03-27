export const userLS = {
  setUser(user) {
    const prevUser = JSON.parse(localStorage.getItem("user"));
    if (user && "message" in user) {
      delete user.message;
    }

    const newUser = user && { ...prevUser, ...user };

    localStorage.setItem("user", JSON.stringify(newUser));

    const event = new Event("userUpdate");
    event.newValue = newUser;
    window.dispatchEvent(event);
  },
  getUser() {
    const user = localStorage.getItem("user") || null;
    return user && JSON.parse(user);
  },
  getTokenFromLS() {
    const { token } = this.getUser() || { token: null };
    return token;
  },
  getRefreshTokenFromLS() {
    const { refreshToken } = this.getUser() || { refreshToken: null };
    return refreshToken;
  },
  getUserIdFromLS() {
    const { userId } = this.getUser() || { userId: null };
    return userId;
  },
};
