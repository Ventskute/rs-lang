export const user = {
  set(user) {
    const prevUser = JSON.parse(localStorage.getItem("user"));
    localStorage.setItem("user", JSON.stringify({ ...prevUser, ...user }));
  },
  get() {
    const user = localStorage.getItem("user") || null;
    return user && JSON.parse(user);
  },
  getTokenFromLS() {
    const { token } = this.get() || { token: null };
    return token;
  },
  getRefreshTokenFromLS() {
    const { refreshToken } = this.get() || { refreshToken: null };
    return refreshToken;
  },
  getUserIdFromLS() {
    const { userId } = this.get() || { userId: null };
    return userId;
  },
};
