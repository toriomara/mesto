export class UserInfo {
  constructor({
    userNameSelector,
    userDescriptionSelector,
    userAvatarSelector,
  }) {
    this._profileName = document.querySelector(userNameSelector);
    this._profileAbout = document.querySelector(userDescriptionSelector);
    this._profileAvatar = document.querySelector(userAvatarSelector);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      about: this._profileAbout.textContent,
    };
  }

  getUserId() {
    return this._id;
  }

  setUserInfo(dataInfo) {
    this._profileName.textContent = dataInfo.name;
    this._profileAbout.textContent = dataInfo.about;
    this._profileAvatar.src = dataInfo.avatar;
    this._id = dataInfo._id;
  }
}
