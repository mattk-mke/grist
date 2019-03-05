const express = require("express");
const router = express.Router();
const listController = require('../controllers/ListController');
const userController = require('../controllers/userController');

router.get('/api/lists/public', listController.publicLists);
router.get('/api/lists/user',
	userController.verifyToken,
	listController.userLists );
router.post('/api/lists/create',
	userController.verifyToken,
	listController.create);

module.exports = router;