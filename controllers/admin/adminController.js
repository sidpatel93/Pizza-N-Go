const moment = require('moment')


function adminController(db) {

  return {

    orders: (req, res) => {
      // find all the orders that are not completed:
      db.query(`
      select test_orders.* , users.name as username, users.id as userid, users.phone_number as userphone
      from test_orders
      join users on test_orders.user_id = users.id
      where order_status!='completed'
      order by order_time;`)
      .then(data => {
        const  pendingOrders = data.rows 
        console.log("all pending Oeders", pendingOrders)
        res.render('admin/adminOrders', {pendingOrders, moment})
      })
      .catch(err => {
        console.log("Error fetching incomplete orders", err)
      })

    },


  }
}


module.exports = adminController;