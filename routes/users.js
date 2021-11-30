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
const isLoggedNotLoggedIn = require('../middlewares/isLoggedNotLoggedIn')
const isLoggedIn = require('../middlewares/isLoggedIn')
const adminController = require('../controllers/admin/adminController');



module.exports = (db) => {

  router.get('/', homeController(db).home)

  router.get('/register', isLoggedNotLoggedIn,homeController(db).register)
  router.post('/register', homeController(db).registerUser)

  router.get('/login', isLoggedNotLoggedIn,homeController(db).login)

  router.post('/login', homeController(db).loginUser)

  router.post('/logout', isLoggedIn,homeController(db).logout)

  router.get("/cart", cartController(db).cart)

  router.post("/cart-update", cartController(db).updateCart)


  // Users orders routes
  router.get("/user/orders", isLoggedIn, homeController(db).orders)
  router.post("/orders", isLoggedIn, cartController(db).placeOrder)

  //Admin route
  router.get('/admin/orders', isLoggedIn, adminController(db).newOrders)
  router.get('/admin/orders/new', isLoggedIn, adminController(db).newOrders)
  router.get('/admin/orders/inProgress', isLoggedIn, adminController(db).inProgressOrders)
  router.get('/admin/orders/complete', isLoggedIn, adminController(db).completedOrders)

  router.post('/admin/orders/estimatedTime', isLoggedIn, adminController(db).sendEstimatedTime)

  return router;
};
