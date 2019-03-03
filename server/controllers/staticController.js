const path = require('path');

module.exports = {
	index(req, res, next) {
		res.sendFile(path.resolve(__dirname, '../../build/index.html'));
	}
}