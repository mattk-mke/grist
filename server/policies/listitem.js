const ApplicationPolicy = require("./application");
const ListPolicy = require("./list");

module.exports = class ListItemPolicy extends ApplicationPolicy {
  _isOwner() {
    if (!this.user) {
      return false;
    } else {
      return this.record && (this.record.userId === this.user.id);
    }
  }
	
  show() {
		return this.record.getList()
		.then( list => {
			return new ListPolicy(this.user, list).show();
		});
  }
  edit() {
		return this.record.getList()
		.then( list => {
			return new ListPolicy(this.user, list).edit();
		});
  }
  update() {
    return this.record.getList()
		.then( list => {
			return new ListPolicy(this.user, list).update();
		});
  }
  destroy() {
    return this.record.getList()
		.then( list => {
			return new ListPolicy(this.user, list).destroy();
		});
  }
}