module.exports = {
  init(app){
    const cors = require('cors');
    const express = require("express");
    const path = require('path');

    const userRoutes = require("../routes/users");
    const listRoutes = require("../routes/lists");
    const listItemRoutes = require("../routes/listitems");

    const corsOptions = {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      exposedHeaders: ['x-auth-token']
    };
    app.use(cors(corsOptions));

    if(process.env.NODE_ENV === "test") {
      const mockAuth = require("../../spec/support/mock-auth.js");
      mockAuth.fakeIt(app);
    }
  
    const clientPath = path.resolve(__dirname, '../../build/'); 
		app.use(express.static(clientPath));
    app.use(userRoutes);
    app.use(listRoutes);
    app.use(listItemRoutes);
  }
}