/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

// Controllers
const homeController = require('../controllers/homeController')
const cartController = require('../controllers/users/userCartController')
const adminController = require('../controllers/admin/adminController');
// Middlewares
const isNotLoggedIn = require('../middlewares/isNotLoggedIn')
const isLoggedIn = require('../middlewares/isLoggedIn')
const isAdmin = require('../middlewares/isAdmin')


module.exports = (db) => {

  router.get('/', homeController(db).home)

  router.get('/register', isNotLoggedIn,homeController(db).register)
  router.post('/register', homeController(db).registerUser)

  router.get('/login', isNotLoggedIn,homeController(db).login)

  router.post('/login', homeController(db).loginUser)

  router.post('/logout', isLoggedIn,homeController(db).logout)

  router.get("/cart", cartController(db).cart)

  router.post("/cart-update", cartController(db).updateCart)


  // Users orders routes
  router.get("/user/orders", isLoggedIn, homeController(db).orders)
  router.post("/orders", isLoggedIn, cartController(db).placeOrder)

  //Admin route
  router.get('/admin/orders', isAdmin, adminController(db).newOrders)
  router.get('/admin/orders/new', isAdmin, adminController(db).newOrders)
  router.get('/admin/orders/inProgress', isAdmin, adminController(db).inProgressOrders)
  router.get('/admin/orders/complete', isAdmin, adminController(db).completedOrders)

  router.post('/admin/orders/estimatedTime', isAdmin, adminController(db).sendEstimatedTime)

  return router;
};
