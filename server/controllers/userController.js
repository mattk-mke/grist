module.exports = {
	success(req, res, next) {
		res.redirect('/');
	},
	signOut(req, res, next) {
    req.logOut();
    res.redirect("/");
  },
}