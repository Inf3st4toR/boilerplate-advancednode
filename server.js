"use strict";
require("dotenv").config();
const express = require("express");
const myDB = require("./connection");
const fccTesting = require("./freeCodeCamp/fcctesting.js");
const routes = require("./routes.js");
const auth = require("./auth.js");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.set("view engine", "pug");
app.set("views", "./views/pug");

fccTesting(app); //For FCC testing purposes
app.use("/public", express.static(process.cwd() + "/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Database call
myDB(async (client) => {
  const myDataBase = await client.db("database").collection("users");
  const authMiddleware = auth(app, myDataBase);
  routes(app, myDataBase, authMiddleware.ensureAuthenticated);

  let currentUsers = 0;

  //Socket.io connection
  io.on("connection", (socket) => {
    console.log("A user has connected");
    ++currentUsers;
    io.emit("user count", currentUsers);
  });

  const PORT = process.env.PORT || 3000;
  http.listen(PORT, () => {
    console.log("Listening on port " + PORT);
  });

  //End of myDB Block
}).catch((e) => {
  app.route("/").get((req, res) => {
    res.render("index", { title: e, message: "Unable to connect to database" });
  });
});
