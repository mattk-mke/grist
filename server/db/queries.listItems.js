const ListItem = require("./models").ListItem;
const Authorizer = require("../policies/listitem");

module.exports = {
  getListItems(id, callback) {
    return ListItem.findAll({
      where: {
        listId: id
      }
    })
    .then( listItems => {
      callback(null, listItems);
    })
    .catch( err => {
      callback(err);
    });
	},
	addListItem(newListItem, callback) {
    return ListItem.create(newListItem)
    .then( list => {
			callback(null, list);
    })
    .catch( err => {
      console.log(err);
      callback(err);
    });
	},
	getListItem(id, callback) {
		return ListItem.findByPk(id)
    .then( list => {
      callback(null, list);
    })
    .catch( err => {
      callback(err);
    });
	},
	updateListItem(user, id, updatedListItem, callback) {
		return ListItem.findByPk(id)
    .then( listItem => {
      if (!listItem) {
        return callback("ListItem not found");
      }
      const authorized = new Authorizer(user, listItem).update();
      if (authorized) {
        listItem.update(updatedListItem, {
          fields: Object.keys(updatedListItem)
				})
				.then( listItem => {
					callback(null, listItem);
				})
				.catch( err => {
					console.log(err);
					callback(err);
				});
			}
		})
		.catch( err => {
			console.log(err);
			callback(err);
		});
	},
	deleteListItem(user, id, callback) {
    return ListItem.findByPk(id)
    .then( listItem => {
      if (!listItem) {
        return callback(404);
      }
      const authorized = new Authorizer(user, listItem).destroy();
      if (authorized) {
        listItem.destroy()
				.then( () => {
					callback(null);
				})
				.catch( err => {
					console.log(err);
					callback(err);
				});
			} else {
        return callback(401);
      }
		})
		.catch( err => {
			console.log(err);
			callback(err);
		});
  },
	
	
}