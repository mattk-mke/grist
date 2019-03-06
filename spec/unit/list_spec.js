/* eslint-disable no-unused-expressions */
const sequelize = require("../../server/db/models/index").sequelize;
const List = require("../../server/db/models").List;
const User = require("../../server/db/models").User;

describe("List", () => {
  beforeEach(done => {
    this.list;
    this.user;
    sequelize.sync({ force: true }).then((res) => {
      User.create({
        name: "User Smith",
        email: "user@example.com",
				googleId: "1234567890",
				picture: "http://example.com/testimage.png"
      })
        .then(user => {
          this.user = user; 
          List.create({
            title: "Shopping",
            isGroup: false,
            userId: this.user.id      
            })
            .then((list) => {
              this.list = list; 
              done();
            });
        });
    });
  });

  describe("#create()", () => {
    it("should create a list object with a title", done => {
      List.create({
        title: "Groceries",
        isGroup: false,
        userId: this.user.id
      })
        .then( list => {
          expect(list.title).toBe("Groceries");
          expect(list.isGroup).toBe(false);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should not create a list with a missing title", done => {
      List.create({
        isGroup: false
      })
        .then( list => {
          done();
        })
        .catch( err => {
          expect(err.message).toContain("List.title cannot be null");
          done();
        });
    });
  });

  describe("#setUser()", () => {
    it("should associate a list and a user together", done => {
      User.create({
        name: "Ada Jones",
        email: "ada@example.com",
        googleId: "82934827346",
				picture: "http://example.com/testimage.png"
      })
      .then( newUser => {
        expect(this.list.userId).toBe(this.list.id);
        this.list.setUser(newUser)
        .then( list => {
          expect(this.list.userId).toBe(newUser.id);
          done();
        });
      });
    });
  });
  describe("#getUser()", () => {
    it("should return the associated user", done => {
      this.list.getUser()
      .then( associatedUser => {
        expect(associatedUser.email).toBe("user@example.com");
        done();
      });
    });
  });
}); 