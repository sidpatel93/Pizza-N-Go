const moment = require('moment')


function adminController(db) {

  return {

    newOrders: (req, res) => {
        // get all the orders from database
        db.query(`
        select orders.* , users.name as username, users.id as userid, users.phone_number as userphone
        from orders
        join users on orders.user_id = users.id
        where order_status ='new'
        order by order_time DESC;`)
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
      select orders.* , users.name as username, users.id as userid, users.phone_number as userphone
      from orders
      join users on orders.user_id = users.id
      where order_status ='inProgress'
      order by order_time;`)
      .then(data => {
      const orderItems = data.rows;
      console.log(orderItems)
      if(req.xhr){
        return res.json(orderItems)
      } else {
        res.render("admin/inProgressOrders",{orderItems, moment})
      }
      }).catch(err => {
        console.log("error fetching orders from db", err)
      })
    },

    completedOrders: (req, res)=> {
      // get all the orders from database
      db.query(`
      select orders.* , users.name as username, users.id as userid, users.phone_number as userphone
      from orders
      join users on orders.user_id = users.id
      where order_status ='complete'
      order by order_time;`)
      .then(data => {
      const orderItems = data.rows;
      console.log(orderItems)
      //console.log('food items',{orderItems})
      if(req.xhr){
          return res.json(orderItems)
      } else {
          res.render("admin/completedOrders",{orderItems, moment})
      }
      }).catch(err => {
        console.log("error fetching orders from db", err)
      })
    },


    sendEstimatedTime: (req, res) => {
      // put logic for sending estimated time to user here.
      // Task send sms to user.
      // Change the clicked order status to in progress
      const OrderId = req.body.OrderId
      const estimatedTime = req.body.estimatedTime
      console.log("order to update is:", OrderId)
      
      db.query(`
      update orders 
      set order_status = 'inProgress' 
      where orders.id =$1`, [OrderId])
      .then((data) => {
        // Put logic for sending the sms here for notification.
        //console.log("order is updated");
        // on sucessfull order change send the events to particular user
        const eventEmitter = req.app.get('eventEmitter')
        eventEmitter.emit('orderInProgress', {OrderId, estimatedTime})
        
        return res.redirect('/admin/orders/new')
      })
      .catch((err) => {
        console.log("There is an error updating the order", err)
        return res.redirect('/admin/orders/new')
      })
    }, 

    sendCompleteOrder: (req, res) => {
      const OrderId = req.body.OrderId

      db.query(`
      update orders 
      set order_status = 'complete' 
      where orders.id = $1`, [OrderId])
      .then((data) => {
        //send notification to customer about the order completion here.
        return res.redirect('/admin/orders/inProgress')
      })
      .catch((err) => {
        console.log("There is an error completing order the order", err)
        return res.redirect('/admin/orders/inProgress')
      })
    }

    // orders: (req, res) => {
    //   // find all the orders that are not completed:
    //   db.query(`
    //   select orders.* , users.name as username, users.id as userid, users.phone_number as userphone
    //   from orders
    //   join users on orders.user_id = users.id
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

