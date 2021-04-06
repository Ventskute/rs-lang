export const userLS = {
  setUser(user) {
    const prevUser = this.getUser() || {};
    if (user && 'message' in user) {
      delete user.message;
    }

    const newUser = user && { ...prevUser, ...user };

    localStorage.setItem('user', JSON.stringify(newUser));

    const event = new Event('userUpdate');
    event.newValue = newUser;
    window.dispatchEvent(event);
  },
  getUser() {
    let user = localStorage.getItem('user');
    if (!user || user === 'undefined' || user === 'null') {
      return null;
    }
    return JSON.parse(user);
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

export const textBookLS = {
  setTextBook(difficulty, page) {
    localStorage.setItem('textBook', JSON.stringify([page, difficulty]));
  },
  getTextBookLS() {
    let textBook = localStorage.getItem('textBook');
    if (!textBook || textBook === 'undefined' || textBook === 'null') {
      return null;
    }
    return JSON.parse(textBook);
  },
};
