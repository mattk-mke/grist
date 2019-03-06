const express = require("express");
const router = express.Router();
const listItemController = require('../controllers/listItemController');
const userController = require('../controllers/userController');

router.get('/api/listitems',
	userController.verifyToken,
	listItemController.listItems);
router.get('/api/listitems/get',
	userController.verifyToken,
	listItemController.get);
router.post('/api/listitems/create',
	userController.verifyToken,
	listItemController.create);
router.post('/api/listitems/update',
	userController.verifyToken,
	listItemController.update);
router.post('/api/listitems/destroy',
	userController.verifyToken,
	listItemController.destroy);


module.exports = router;