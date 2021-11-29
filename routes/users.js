/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const homeController = require('../controllers/homeController')
const cartController = require('../controllers/users/userCartController');
const adminController = require('../controllers/admin/adminController')
const isLoggedIn = require('../middlewares/isLoggedIn');
const isNotLoggedIn = require('../middlewares/isNotLoggedIn')

module.exports = (db) => {

  router.get('/', homeController(db).home)

  router.get('/register', isNotLoggedIn,homeController(db).register)
  router.post('/register', homeController(db).registerUser)

  router.get('/login', isNotLoggedIn,homeController(db).login)
  router.post('/login', homeController(db).loginUser)

  router.post('/logout', homeController(db).logout)

  router.get("/cart", cartController(db).cart)

  router.post("/cart-update", cartController(db).updateCart)

  // Users orders routes
  router.get("/user/orders", isLoggedIn, homeController(db).orders)
  router.post("/orders", isLoggedIn, cartController(db).placeOrder)

  //Admin route
  router.get("/admin/orders", isLoggedIn, adminController(db).orders)


  return router;
};
