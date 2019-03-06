const userController = require('../../server/controllers/userController');

module.exports = {
  fakeIt(app) {
    let name, role, id, email, googleId;
    const middleware = (req, res, next) => {
      name = req.body.name || name;
      role = req.body.role || role;
      id = req.body.userId || id;
      email = req.body.email || email;
      googleId = req.body.googleId || googleId;
      if (id && id != 0) {
        req.user = {
          "name": name,
          "id": id,
          "email": email,
          "role": role,
          "googleId": googleId
        };
      } else if (id == 0) {
        delete req.user;
      }
      if (next) { next() }
    }
    app.use(middleware);
    app.post("/auth/fake",
      userController.googleAuth,
      userController.generateToken,
      userController.sendToken);
  }
}