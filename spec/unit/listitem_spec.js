/* eslint-disable no-unused-expressions */
const sequelize = require("../../server/db/models/index").sequelize;
const List = require("../../server/db/models").List;
const ListItem = require("../../server/db/models").ListItem;
const User = require("../../server/db/models").User;

describe("ListItem", () => {
  beforeEach(done => {
    this.user;
    this.list;
    this.listItem;
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
              ListItem.create({
                title: "Floor cleaner",
                isPurchased: false,
                priority: "high",
                listId: this.list.id,
                userId: this.user.id
              })
              .then( listItem => {
                this.listItem = listItem;
                done();
              });
            });
        });
    });
  });

  describe("#create()", () => {
    it("should create a listitem object with a title", done => {
      ListItem.create({
        title: "USB charger",
        isPurchased: false,
        userId: this.user.id,
        listId: this.list.id
      })
        .then( listItem => {
          expect(listItem.title).toBe("USB charger");
          expect(listItem.isPurchased).toBe(false);
          done();
        })
        .catch(err => {
          console.log(err);
          done();
        });
    });
    it("should not create a listitem with a missing title", done => {
      ListItem.create({
        isPurchased: false
      })
        .then( list => {
          done();
        })
        .catch( err => {
          expect(err.message).toContain("ListItem.title cannot be null");
          done();
        });
    });
  });

  describe("#setUser()", () => {
    it("should associate a listitem and a user together", done => {
      User.create({
        name: "Ada Jones",
        email: "ada@example.com",
        googleId: "82934827346",
				picture: "http://example.com/testimage.png"
      })
      .then( newUser => {
        expect(this.listItem.userId).toBe(this.user.id);
        this.listItem.setUser(newUser)
        .then( updatedListItem => {
          expect(updatedListItem.userId).toBe(newUser.id);
          done();
        });
      });
    });
  });

  describe("#getUser()", () => {
    it("should return the associated user", done => {
      this.listItem.getUser()
      .then( associatedUser => {
        expect(associatedUser.email).toBe("user@example.com");
        done();
      });
    });
  });

  describe("#setList()", () => {
    it("should associate a list and a listItem together", done => {
      List.create({
        title: "Groceries",
        isGroup: false,
        userId: this.user.id 
      })
      .then( newList => {
        expect(this.listItem.listId).toBe(this.list.id);
        this.listItem.setList(newList)
        .then( updatedListItem => {
          expect(updatedListItem.listId).toBe(newList.id);
          done();
        });
      });
    });
  });

  describe("#getList()", () => {
    it("should return the associated list", done => {
      this.listItem.getList()
      .then( associatedList => {
        expect(associatedList.title).toBe("Shopping");
        done();
      });
    });
  });
}); 