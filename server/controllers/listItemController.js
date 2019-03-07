const listItemQueries = require('../db/queries.listItems');
const listQueries = require('../db/queries.lists');
const Authorizer = require('../policies/listitem');
const ListAuthorizer = require('../policies/list');
const Pusher = require('pusher');

const pusher = new Pusher({
	appId: '727497',
	key: process.env.PUSHER_KEY,
	secret: process.env.PUSHER_SECRET,
	cluster: 'us2',
	encrypted: true
});

module.exports = {
	listItems(req, res, next) {
		listItemQueries.getListItems(req.query.id, (err, listItems) => {
      if (err) {
        res.status(err.status).end();
      } else {
				const authorized = new Authorizer(req.user, listItems[0]).show();
				if (authorized) {
					res.json(listItems);
				} else {
					res.status(403).end();
				}
      }
    });
	},
	create(req, res, next) {
		listQueries.getList(req.body.listId, (err, list) => {
			if (err || list == null) {
				res.status(404).end();
			} else {
				const authorized = new ListAuthorizer(req.user, list).update();
				if (authorized) {
					let newListItem = {
						title: req.body.title,
						isPurchased: req.body.isPurchased,
						priority: req.body.priority,
						listId: list.id,
						userId: req.user.id
					};
					listItemQueries.addListItem(newListItem, (err, listItem) => {
						if (err) {
							res.status(500).end();
						} else {
							pusher.trigger('list', 'item', {message: "Item successfully created."});
							res.json(listItem);
						}
					});
				} else {
					res.status(403).end();
				}
			}
		});

	},
	get(req, res, next) {
    listItemQueries.getListItem(req.query.id, (err, listItem) => {
      if ( err || listItem == null) {
        res.status(404).end();
      } else {
				const authorized = new Authorizer(req.user, listItem).show();
				if (authorized) {
					res.json(listItem);
				} else {
					res.status(403).end();
				}
      }
    });
	},
	update(req, res, next) {
		let updatedListItem = {
			title: req.body.title,
			isPurchased: req.body.isPurchased,
			priority: req.body.priority,
		};
		listItemQueries.updateListItem(req.user, req.body.id, updatedListItem, (err, listItem) => {
			if (err || listItem == null) {
				res.status(500).end();
			} else {
				pusher.trigger('list', 'item', {message: "Item successfully updated."});
				res.json(listItem);
			}
		});
	},
	destroy(req, res, next) {
    listItemQueries.deleteListItem(req.user, req.body.id, (err) => {
      if (err) {
				console.log(err);
        res.status(500).end();
      } else {
				pusher.trigger('list', 'item', {message: "Item succesfully deleted."});
        res.status(200).end();
      }
    });
  },
}