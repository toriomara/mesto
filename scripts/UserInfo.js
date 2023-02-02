export class UserInfo {
  constructor({ name, job }) {
    this._profileName = document.querySelector(name);
    this._profileJob = document.querySelector(job);
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      job: this._profileJob.textContent,
    };
  }

  setUserInfo({ name, job }) {
    this._profileName.textContent = name;
    this._profileJob.textContent = job;
  }
}
