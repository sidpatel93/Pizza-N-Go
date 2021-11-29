function adminController(db) {

  return {

    get: (req,res) => {
      db.query(`SELECT orders.id,orders.order_time, users.name as username,users.phone_number, menuItems.*,orderItems.* FROM orders
                JOIN orderItems ON orders.id = order_id
                JOIN users ON user_id = users.id
                JOIN menuItems ON menuItems.id = orderItems.menuItem_id ;`)
      .then(data => {
        const orderItems = data.rows;
        console.log('food items',{orderItems})
        res.render("admin/order",{orderItems})
      })

    },

    post: (req,res) => {
      res.send("super nice job")
    }

  }

}

module.exports = adminController;

