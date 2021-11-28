/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const homeController = require('../controllers/homeController')
const cartController = require('../controllers/users/userCartController')

module.exports = (db) => {


  // router.get("", (req, res) => {
  //   db.query(`SELECT * FROM users;`)
  //     .then(data => {
  //       const users = data.rows;
  //       res.json({ users });
  //     })
  //     .catch(err => {
  //       res
  //         .status(500)
  //         .json({ error: err.message });
  //     });
  // });

  router.get('/', homeController(db).home)

  router.get('/register', homeController(db).register)
  router.post('/register', homeController(db).registerUser)

  router.get('/login', homeController(db).login)
  router.post('/login', homeController(db).loginUser)

  router.get("/cart", cartController(db).cart)

  router.post("/cart-update", cartController(db).updateCart)

  return router;
};
