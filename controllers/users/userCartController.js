const sendSMS = require("../../twilioMessage");
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require("twilio")(accountSid, authToken);

function cartController(db) {
  return {
    cart: (req, res) => {
      res.render("users/cart");
    },

    updateCart: (req, res) => {
      //Making the cart start at 0

      // add an item in the cart
      // check if the cart exist in the session
      //if it is not then create the cart
      if (!req.session.cart) {
        req.session.cart = {
          foodItems: {},
          totalQty: 0,
          totalPrice: 0,
        };
      }
      let cart = req.session.cart;
      console.log(typeof req.body);
      // If the cart already exist then update the cart.
      //check if the added item exist in the cart, it not then add it
      if (!cart.foodItems[req.body.id]) {
        (cart.foodItems[req.body.id] = {
          item: req.body,
          qty: 1,
        }),
          (cart.totalQty += 1),
          (cart.totalPrice += req.body.price);
      } else {
        // If item already exist them update the qty, totalQty, totalprice
        cart.foodItems[req.body.id]["qty"] += 1;
        (cart.totalQty += 1), (cart.totalPrice += req.body.price);
      }

      res.json({ totalQty: req.session.cart.totalQty });
    },

     placeOrder: (req, res) => {
        // create the order to store in database
        // order details are stored in the session.
        const customerId = req.user.id;
        const items = req.session.cart.foodItems;

        //store this order in the database.
        db.query(`INSERT INTO orders (user_id, items)
        VALUES ($1, $2)
        returning *`, [customerId, items])
        .then(data => {
          // if the order placed successfuly then clear the cart and
          // redirect to customers order page.
          // We might need to add the message notification logic here
          // send events that the order is placed

          const eventEmitter = req.app.get('eventEmitter')
          const dataToSend = data.rows[0]
          dataToSend["username"] = req.user.name;
          dataToSend["userphone"] = req.user.phone_number
          console.log(dataToSend)
          eventEmitter.emit('userPlacedOrder', dataToSend)

          delete req.session.cart;
          //Send sms to client about the order placed
          //sendSMS(`Your order is successfully placed.`)
          return res.redirect('/user/orders')
        })
        .catch((err) => {
          //if the error occur, then redirect to cart
          console.log("can not insert order in db", err)
          return res.redirect('/cart')
        })
     }
  }

  };


module.exports = cartController;
