const ApplicationPolicy = require("./application");

module.exports = class ListPolicy extends ApplicationPolicy {
  _isOwner() {
    if (!this.user) {
      return false;
    } else {
      return this.record && (this.record.userId == this.user.id);
    }
  }

  show() {
    if (this.record.private == true) {
      return this._isOwner() || this._isAdmin();
    } else {
      return true;
    }
  }
  edit() {
    if (this.record.private == true) {
      return this._isOwner() || this._isAdmin();
    } else {
      return this.create() && this.record;
    }
  }
  update() {
    return this.edit();
  }
  destroy() {
    return this.update();
  }
}