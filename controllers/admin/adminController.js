const moment = require('moment')

function adminController(db) {

  return {

    get: (req,res) => {
      // get all the orders from database
      db.query(`SELECT orders.id,orders.order_time, users.name as username,users.phone_number, menuItems.*,orderItems.* FROM orders
                JOIN orderItems ON orders.id = order_id
                JOIN users ON user_id = users.id
                JOIN menuItems ON menuItems.id = orderItems.menuItem_id
                ORDER BY orders.order_time;`)
      .then(data => {
        const orderItems = data.rows;
        //console.log('food items',{orderItems})
        res.render("admin/order",{orderItems, moment})
      })

    },

    newOrders: (req, res) => {
        // get all the orders from database
        db.query(`SELECT orders.id,orders.order_time, users.name as username,users.phone_number, menuItems.*,orderItems.* FROM orders
        JOIN orderItems ON orders.id = order_id
        JOIN users ON user_id = users.id
        JOIN menuItems ON menuItems.id = orderItems.menuItem_id
        where orders.status = 'New'
        ORDER BY orders.order_time;`)
        .then(data => {
        const orderItems = data.rows;
        //console.log('food items',{orderItems})
        res.render("admin/adminOrders",{orderItems, moment})
        }). catch(err => {
          console.log("error fetching orders from db", err)
        })
    },

    inProgressOrders: (req, res) => {
      // get all the orders from database
      db.query(`SELECT orders.id,orders.order_time, users.name as username,users.phone_number, menuItems.*,orderItems.* FROM orders
      JOIN orderItems ON orders.id = order_id
      JOIN users ON user_id = users.id
      JOIN menuItems ON menuItems.id = orderItems.menuItem_id
      where orders.status = 'In Progress'
      ORDER BY orders.order_time;`)
      .then(data => {
      const orderItems = data.rows;
      //console.log('food items',{orderItems})
      res.render("admin/adminOrders",{orderItems, moment})
      }). catch(err => {
        console.log("error fetching orders from db", err)
      })
    },

    completedOrders: (req, res)=> {
      // get all the orders from database
      db.query(`SELECT orders.id,orders.order_time, users.name as username,users.phone_number, menuItems.*,orderItems.* FROM orders
      JOIN orderItems ON orders.id = order_id
      JOIN users ON user_id = users.id
      JOIN menuItems ON menuItems.id = orderItems.menuItem_id
      where orders.status = 'Complete'
      ORDER BY orders.order_time;`)
      .then(data => {
      const orderItems = data.rows;
      //console.log('food items',{orderItems})
      res.render("admin/adminOrders",{orderItems, moment})
      }). catch(err => {
        console.log("error fetching orders from db", err)
      })
    },


    sendEstimatedTime: (req,res) => {
      res.send("super nice job")
      // put logic for sending estimated time to user here.
      // Task send sms to user.
      // Change the clicked order status to in progress
    }

  }

}

module.exports = adminController;

