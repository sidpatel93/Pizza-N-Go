// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const path = require('path')
const app = express();
const morgan = require("morgan");
const ejsLayouts= require('express-ejs-layouts');
const session = require('express-session')
const pgSession = require('connect-pg-simple')(session)
const passport = require('passport')
const emitter = require('events')


// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// sesstion store config
const sessionStore = new pgSession({
  pool: db,
})

const eventEmitter = new emitter()
app.set('eventEmitter', eventEmitter)

// session config to store the user session like user credentials, cart etc.
app.use(session({
  store: sessionStore,
  secret: process.env.SESSION_SECRET,
  resave: false,
  cookie: {
    secure: false,
    maxAge: 3600000
  }
}))

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

// Passport config
const passportConfig = require('./middlewares/passportConfig')
passportConfig(passport, db)
app.use(passport.initialize())
app.use(passport.session())

// Global middleware to get the session content from each request
// this will enable use to user the session in the template
app.use((req, res, next) => {
  res.locals.session = req.session;
  res.locals.user = req.user
  next();
})

//Setup views and ejs template
app.set('views', path.join(__dirname, './views'));
app.use(ejsLayouts);
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));
app.use(express.json());

// Separated Routes
const usersRoutes = require("./routes/users");
// Mount all resource routes
app.use("/", usersRoutes(db));


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).
//Home page of the app. This will show the all the menu and available food options
app.get("/", (req, res) => {
  res.render("index");
});

const foodApp = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// Using the existing server to connect with socket.io
const io = require('socket.io')(foodApp)

io.on("connection", (socket)=> {
    socket.on('join', (roomName) => {
      socket.join(roomName)
    })
})

eventEmitter.on('userPlacedOrder', (data)=> {
  io.to('adminRoom').emit('userPlacedOrder', data)
})

eventEmitter.on('orderInProgress', (data)=> {
  io.to(`order_${data.OrderId}`).emit('orderInProgress', data)
})