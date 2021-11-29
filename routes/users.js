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
const isLoggedNotIn = require('../middlewares/isLoggedNotIn')
const adminController = require('../controllers/admin/adminController');


module.exports = (db) => {

  router.get('/', homeController(db).home)

  router.get('/register', isLoggedNotIn,homeController(db).register)
  router.post('/register', homeController(db).registerUser)

  router.get('/login', isLoggedNotIn,homeController(db).login)
  router.post('/login', homeController(db).loginUser)

  router.post('/logout', homeController(db).logout)

  router.get("/cart", cartController(db).cart)

  router.post("/cart-update", cartController(db).updateCart)

  router.post('/cart',cartController(db).sendOrder)

  router.get('/order', adminController(db).get)
  
  router.post('/order', adminController(db).post)

  return router;
};
