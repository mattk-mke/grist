/* eslint-disable no-unused-expressions */
const axios = require("axios");
const server = require("../../server/server");
const base = "http://localhost:8080/api/listitems";

const sequelize = require("../../server/db/models/index").sequelize;
const List = require("../../server/db/models").List;
const ListItem = require("../../server/db/models").ListItem;
const User = require("../../server/db/models").User;

describe("routes : listitems", () => {
  beforeEach((done) => {
    this.user;
    this.list;
    this.listItem;
    sequelize.sync({force: true}).then((res) => {
      User.create({
        name: "User Smith",
        email: "user@example.com",
				googleId: "1234567890",
				picture: "http://example.com/testimage.png"
      })
      .then((user) => {
        this.user = user;
        List.create({
          title: "Shopping",
          isGroup: false,
          isPublic: false,
          userId: this.user.id
        })
        .then((list) => {
          this.list = list;
          ListItem.create({
            title: "Floor Cleaner",
            priority: "medium",
            isPurchased: false,
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
  
  // Public context

  describe("public user performing read only actions for list items", () => {
    beforeEach( (done) => {
      this.publicList;
      List.create({
        title: "Public List",
        isGroup: false,
        isPublic: true,
        userId: this.user.id
      })
      .then((list) => {
        this.publicList = list;
        ListItem.create({
          title: "Public Item",
          priority: "medium",
          isPurchased: false,
          listId: list.id,
          userId: this.user.id
        })
        .then( listItem => {
          this.publicListItem = listItem;
          done();
        });
      });
    });

    describe("GET /api/listitems?id=", () => {
      it("should return the public list items", done => {
        axios.get(`${base}`, {
          params: {
            id: this.publicList.id
          }
        })
        .then( res => {
          expect(res.data[0].title).toContain("Public Item");
          done();
        })
        .catch( err => {
          expect(err).toBeNull();
        })
      });
    });

    describe("POST /api/listitems/create", () => {
      it("should not create a list item", done => {
        axios.post(`${base}/create`, {
          title: "Test Item",
          isPurchased: false,
          priority: "medium",
          listId: this.list.id
        })
        .then( res => {
          expect(res).toBeNull();
        })
        .catch( err => {
          expect(err.response.status).toBe(403);
          ListItem.findOne({where: {title: "Test Item"}})
          .then( listItem => {
            expect(listItem).toBeNull();
            done();
          })
        });
      });
    });
  });

  // Standard user context

  describe("standard user performing CRUD actions for list items", () => {
    beforeEach( done => {
      this.authUser;
      this.token;
      this.anotherList;
      this.anotherListItem;
      User.create({
        name: "The Doctor",
        email: "thedoctor@example.com",
        role: "standard",
				googleId: "133713371337",
				picture: "http://example.com/testimage.png"
      })
      .then( user => {
        this.authUser = user;
        axios.post("http://localhost:8080/auth/fake", {
            role: user.role,
            userId: user.id,
            email: user.email,
            googleId: user.googleId
        })
        .then( res => {
          this.token = res.headers['x-auth-token'];
          List.create({
            title: "Time Travel List",
            isGroup: false,
            isPublic: false,
            userId: user.id
          })
          .then((list) => {
            this.anotherList = list;
            ListItem.create({
              title: "Wibbly Wobblies",
              priority: "medium",
              isPurchased: false,
              listId: this.anotherList.id,
              userId: user.id
            })
            .then( listItem => {
              this.anotherListItem = listItem;
              done();
            });
            done();
          });
        });
      });
    });

    describe("POST /api/listitems/create", () => {
      it("should create a new list item and return status code 200", done => {
        axios.post(`${base}/create`, {
          title: "Sonic screwdriver",
          priority: "high",
          isPurchased: false,
          listId: this.anotherList.id
        }, { headers: {
          "x-auth-token": this.token
        }})
        .then( res => {
          ListItem.findOne({where: {title: "Sonic screwdriver"}})
          .then( listItem => {
            expect(listItem).not.toBeNull();
            expect(listItem.title).toBe("Sonic screwdriver");
            expect(listItem.userId).toBe(this.authUser.id);
            expect(listItem.listId).toBe(this.anotherList.id);
            done();
          })
          .catch( err => {
            expect(err).toBeNull();
          });
        })
        .catch( err => {
          expect(err).toBeNull();
        });
      });
    });

    describe("POST /api/listitems/update", () => {
      it("should update a list item with the appropriate values", done => {
        expect(this.anotherListItem.title).toBe("Wibbly Wobblies");
        axios.post(`${base}/update`, {
          title: "Timey Wimeys",
          id: this.anotherListItem.id
        }, { headers: {
          "x-auth-token": this.token
        }})
        .then( res => {
          ListItem.findByPk(this.anotherListItem.id)
          .then( listItem => {
            expect(listItem).not.toBeNull();
            expect(listItem.title).toBe("Timey Wimeys");
            expect(listItem.priority).toBe("medium");
            done();
          })
          .catch( err => {
            expect(err).toBeNull();            
            done();
          });
        })
        .catch( err => {
          expect(err).toBeNull();
        });
      });
    });

    describe("GET /api/listitems/get?id=", () => {
      it("should retrieve the specified list item", done => {
        axios.get(`${base}/get`, {
          params: {
            id: this.anotherListItem.id
          },
          headers: {
            "x-auth-token": this.token
          }
        })
        .then( res => {
          expect(res.data.title).toBe("Wibbly Wobblies");
          expect(res.data.userId).toBe(this.anotherListItem.userId);
          expect(res.data.listId).toBe(this.anotherListItem.listId);
          done();
        })
        .catch( err => {
          expect(err).toBeNull();
        });
      });
    });

    describe("POST /api/listitems/destroy", () => {
      it("should destroy the specified list item", done => {
        axios.post(`${base}/destroy`, {
          id: this.anotherListItem.id
        }, {
          headers: {
            "x-auth-token": this.token
          }
        })
        .then( res => {
          expect(res.status).toBe(200);
          ListItem.findOne({where: {title: "Wibbly Wobblies"}})
          .then( listItem => {
            expect(listItem).toBeNull();
            done();
          })
          .catch( err => {
            console.log(err);
          });
        })
        .catch( err => {
          expect(err).toBeNull();
        });
      });
    });
  });
});
