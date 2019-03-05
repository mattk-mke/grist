const List = require("./models").List;
const Authorizer = require("../policies/list");

module.exports = {
  getPublicLists(callback) {
    return List.all({
      where: {
        public: true
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
	deleteList(user, listId, callback) {
    return List.findByPk(listId)
    .then( list => {
      if (!list) {
        return callback("List not found");
      }
      const authorized = new Authorizer(user, list).update();
      if (authorized) {
        list.destroy()
				.then( () => {
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
	
	
}