const moment = require('moment')


function adminController(db) {

  return {

    newOrders: (req, res) => {
        // get all the orders from database
        db.query(`
        select test_orders.* , users.name as username, users.id as userid, users.phone_number as userphone
        from test_orders
        join users on test_orders.user_id = users.id
        where order_status ='new'
        order by order_time;`)
        .then(data => {
        const orderItems = data.rows;
        //console.log('food items',{orderItems})
        if(req.xhr){
          return res.json(orderItems)
        } else {
        res.render("admin/adminOrders",{orderItems, moment})
        }
        }).catch(err => {
          console.log("error fetching orders from db", err)
        })
    },

    inProgressOrders: (req, res) => {
      // get all the orders from database
      db.query(`
      select test_orders.* , users.name as username, users.id as userid, users.phone_number as userphone
      from test_orders
      join users on test_orders.user_id = users.id
      where order_status ='inProgress'
      order by order_time;`)
      .then(data => {
      const orderItems = data.rows;
      //console.log('food items',{orderItems})
      res.render("admin/adminOrders",{orderItems, moment})
      }).catch(err => {
        console.log("error fetching orders from db", err)
      })
    },

    completedOrders: (req, res)=> {
      // get all the orders from database
      db.query(`
      select test_orders.* , users.name as username, users.id as userid, users.phone_number as userphone
      from test_orders
      join users on test_orders.user_id = users.id
      where order_status ='complete'
      order by order_time;`)
      .then(data => {
      const orderItems = data.rows;
      //console.log('food items',{orderItems})
      res.render("admin/adminOrders",{orderItems, moment})
      }).catch(err => {
        console.log("error fetching orders from db", err)
      })
    },


    sendEstimatedTime: (req,res) => {
      res.send("super nice job")
      // put logic for sending estimated time to user here.
      // Task send sms to user.
      // Change the clicked order status to in progress
    }, 

    // orders: (req, res) => {
    //   // find all the orders that are not completed:
    //   db.query(`
    //   select test_orders.* , users.name as username, users.id as userid, users.phone_number as userphone
    //   from test_orders
    //   join users on test_orders.user_id = users.id
    //   where order_status!='completed'
    //   order by order_time;`)
    //   .then(data => {
    //     const  pendingOrders = data.rows 
    //     console.log("all pending Oeders", pendingOrders)
    //     res.render('admin/adminOrders', {pendingOrders, moment})
    //   })
    //   .catch(err => {
    //     console.log("Error fetching incomplete orders", err)
    //   })

    // },


  }
}


module.exports = adminController;

