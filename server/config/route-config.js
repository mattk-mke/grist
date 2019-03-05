module.exports = {
  init(app){
    const cors = require('cors');
    const express = require("express");
    const path = require('path');

    const userRoutes = require("../routes/users");
    const listRoutes = require("../routes/lists");

    const corsOptions = {
      origin: true,
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
      exposedHeaders: ['x-auth-token']
    };
    app.use(cors(corsOptions));
  
    const clientPath = path.resolve(__dirname, '../../build/'); 
		app.use(express.static(clientPath));
    app.use(userRoutes);
    app.use(listRoutes);
  }
}