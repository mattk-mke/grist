const ApplicationPolicy = require("./application");

module.exports = class ListPolicy extends ApplicationPolicy {
  _isOwner() {
    if (!this.user) {
      return false;
    } else {
      return this.record && (this.record.userId === this.user.id);
    }
  }

  show() {
    if (this.record.isPublic === false) {
      return this._isOwner() || this._isAdmin();
    } else {
      return true;
    }
  }
  edit() {
    return this._isOwner() || this._isAdmin();
  }
  update() {
    return this.edit();
  }
  destroy() {
    return this.update();
  }
}