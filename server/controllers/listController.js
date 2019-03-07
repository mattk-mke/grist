const listQueries = require('../db/queries.lists');
const Authorizer = require('../policies/list');

module.exports = {
	publicLists(req, res, next) {
		listQueries.getPublicLists((err, lists) => {
      if (err) {
        console.log(err);
        res.status(500).end();
      } else {
        res.json(lists);
      }
    });
	},
	userLists(req, res, next) {
		listQueries.getUserLists(req.user.id, (err, lists) => {
      if (err) {
        res.status(err.status).end();
      } else {
        res.json(lists);
      }
    });
	},
	create(req, res, next) {
    const authorized = new Authorizer(req.user).create();
    if (authorized) {
      let newList = {
        title: req.body.title,
        isGroup: req.body.isGroup,
        isPublic: req.body.isPublic,
        userId: req.user.id
      };
      listQueries.addList(newList, (err, list) => {
        if (err) {
          res.status(500).end();
        } else {
          res.json(list);
        }
      });
    } else {
      res.status(403).end();
    }
	},
	get(req, res, next) {
    listQueries.getList(req.query.id, (err, list) => {
      if ( err || list == null) {
        console.log(err);
        res.status(404).end();
      } else {
				const authorized = new Authorizer(req.user, list).show();
				if (authorized) {
					res.json(list);
				} else {
					res.status(403).end();
				}
      }
    });
	},
	update(req, res, next) {
    let updatedList = {
      title: req.body.title,
      isGroup: req.body.isGroup,
      isPublic: req.body.isPublic
    };
    listQueries.updateList(req.user, req.body.listId, updatedList, (err, list) => {
      if (err || list == null) {
        res.status(500).end();
      } else {
        res.json(list);
      }
    });
	},
	destroy(req, res, next) {
    listQueries.deleteList(req.user, req.body.id, (err) => {
      if (err) {
        res.status(500).end();
      } else {
        res.status(200).end();
      }
    });
  },
}