/* eslint-disable no-unused-expressions */
const axios = require("axios");
const server = require("../../server/server");
const base = "http://localhost:8080/api/lists";

const sequelize = require("../../server/db/models/index").sequelize;
const List = require("../../server/db/models").List;
const User = require("../../server/db/models").User;

describe("routes : lists", () => {
  beforeEach((done) => {
    this.list;
    this.user;
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
          done();
        });
      });
    });
  });
  
  // Public context

  describe("public user performing read only actions for lists", () => {
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
        done();
      });
    });

    describe("GET /api/lists/public", () => {
      it("should return all public lists", done => {
        axios.get(`${base}/public`)
        .then( res => {
          expect(res.data[0].title).toContain("Public List");
          done();
        })
        .catch( err => {
          expect(err).toBeNull();
        })
      });
    });

    describe("POST /api/lists/create", () => {
      it("should not create a list", done => {
        axios.post(`${base}/create`, {
          title: "My Special List",
          isGroup: false,
          isPublic: false,
          userId: this.user.id
        })
        .then( res => {
          expect(res).toBeNull();
        })
        .catch( err => {
          expect(err.response.status).toBe(403);
          List.findOne({where: {title: "My Special List"}})
          .then( list => {
            expect(list).toBeNull();
            done();
          })
        });
      });
    });
  });

  // Standard user context

  describe("standard user performing CRUD actions for lists", () => {
    beforeEach( done => {
      this.token;
      this.anotherList;
      User.create({
        name: "The Doctor",
        email: "thedoctor@example.com",
        role: "standard",
				googleId: "133713371337",
				picture: "http://example.com/testimage.png"
      })
      .then( user => {
        axios.post("http://localhost:8080/auth/fake", {
            role: user.role,
            userId: user.id,
            email: user.email,
            googleId: user.googleId
        })
        .then( res => {
          this.token = res.headers['x-auth-token'];
          List.create({
            title: "Another List",
            isGroup: false,
            isPublic: false,
            userId: user.id
          })
          .then((list) => {
            this.anotherList = list;
            done();
          });
        });
      });
    });

    describe("POST /api/lists/create", () => {
      it("should create a new list and return status code 200", done => {
        axios.post(`${base}/create`, {
          title: "Time Travel List",
          isGroup: false,
          isPublic: false,
        }, { headers: {
          "x-auth-token": this.token
        }})
        .then( res => {
          List.findOne({where: {title: "Time Travel List"}})
          .then( list => {
            expect(list).not.toBeNull();
            expect(list.title).toBe("Time Travel List");
            expect(list.userId).not.toBeNull();
            done();
          })
          .catch( err => {
            console.log(err);
            done();
          });
        })
        .catch( err => {
          expect(err).toBeNull();
        });
      });
    });

    describe("GET /api/lists?listId=", () => {
      it("should retrieve the specified list", done => {
        axios.get(base, {
          params: {
            id: this.anotherList.id
          },
          headers: {
            "x-auth-token": this.token
          }
        })
        .then( res => {
          expect(res.data.title).toBe("Another List");
          expect(res.data.userId).toBe(this.anotherList.userId);
          done();
        })
        .catch( err => {
          expect(err).toBeNull();
        });
      });
    });

    describe("POST /api/lists/destroy", () => {
      it("should destroy the specified list", done => {
        axios.post(`${base}/destroy`, {
          id: this.anotherList.id
        }, {
          headers: {
            "x-auth-token": this.token
          }
        })
        .then( res => {
          expect(res.status).toBe(200);
          List.findOne({where: {title: "Another List"}})
          .then( list => {
            expect(list).toBeNull();
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
