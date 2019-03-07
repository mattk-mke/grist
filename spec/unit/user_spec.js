const sequelize = require("../../server/db/models/index").sequelize;
const User = require("../../server/db/models").User;

describe("User", () => {
  beforeEach((done) => {
    sequelize.sync({force: true})
    .then(() => {
      done();
    })
    .catch((err) => {
      done();
    });
  });

  describe("#create()", () => {
    it("should create a User object with a valid name, email, googleId, and picture", (done) => {
      User.create({
        name: "User Smith",
        email: "user@example.com",
				googleId: "1234567890",
				picture: "http://example.com/testimage.png"
      })
      .then((user) => {
				expect(user.id).toBe(1);
        expect(user.name).toBe("User Smith");
        expect(user.email).toBe("user@example.com");
				expect(user.googleId).toBe("1234567890");
				expect(user.picture).toBe("http://example.com/testimage.png");
        done();
      })
      .catch((err) => {
        done();
      });
    });
    it("should not create a user with invalid email or password", (done) => {
      User.create({
        name: "Mario Plumber",
        email: "It's-a me, Mario!",
				password: "1234567890",
				googleId: "1234567890",
				picture: "http://example.com/testimage.png"
      })
      .then((user) => {
        done();
      })
      .catch((err) => {
        expect(err.message).toContain("Validation error: must be a valid email");
        done();
      });
    });
    it("should not create a user with an email already taken", (done) => {
      User.create({
        name: "User Smith",
        email: "user@example.com",
				googleId: "1234567890",
				picture: "http://example.com/testimage.png"

      })
      .then((user) => {

        User.create({
          name: "User Smith",
          email: "user@example.com",
					googleId: "482934753948",
					picture: "http://example.com/testimage.png"
        })
        .then((user) => {
          done();
        })
        .catch((err) => {
          expect(err.message).toContain("Email already exists");
          done();
        });
        done();
      })
      .catch((err) => {
        done();
      });
    });
  });
});