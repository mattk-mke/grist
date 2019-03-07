const List = require("./models").List;
const ListItem = require("./models").ListItem;
const Authorizer = require("../policies/list");

module.exports = {
  getPublicLists(callback) {
    return List.findAll({
      where: {
        isPublic: true
      }
    })
    .then( lists => {
      callback(null, lists);
    })
    .catch( err => {
      callback(err);
    });
	},
  getUserLists(id, callback) {
    return List.all({
      where: {
        userId: id
      }
    })
    .then( lists => {
      callback(null, lists);
    })
    .catch( err => {
      callback(err);
    });
	},
	addList(newList, callback) {
    return List.create(newList)
    .then( list => {
			callback(null, list);
    })
    .catch( err => {
      console.log(err);
      callback(err);
    });
	},
	getList(id, callback) {
		return List.findByPk(id, {
      include : [{
        model : ListItem,
        as: 'listItems'
     }],
     order: [
       [{model: ListItem, as: "listItems" }, 'isPurchased', 'ASC']
     ]
    })
    .then( list => {
      callback(null, list);
    })
    .catch( err => {
      callback(err);
    });
	},
	updateList(user, listId, updatedList, callback) {
		return List.findByPk(listId)
    .then( list => {
      if (!list) {
        return callback("List not found");
      }
      const authorized = new Authorizer(user, list).update();
      if (authorized) {
        list.update(updatedList, {
          fields: Object.keys(updatedList)
				})
				.then( list => {
					callback(null, list);
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
	deleteList(user, id, callback) {
    return List.findByPk(id)
    .then( list => {
      if (!list) {
        return callback(404);
      }
      const authorized = new Authorizer(user, list).destroy();
      if (authorized) {
        list.destroy()
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