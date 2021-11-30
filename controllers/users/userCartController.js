// require twillio
const accountSid = process.env.ACCOUNTSID;
const authToken = process.env.AUTHTOKEN;
const client = require("twilio")(accountSid, authToken);

function cartController(db) {
  return {
    cart: (req, res) => {
      res.render("users/cart");
    },

    updateCart: (req, res) => {
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

      res.json({ data: "sending response back for updated cart." });
    },

     placeOrder: (req, res) => {
        // create the order to store in database
        // order details are stored in the session.
        const customerId = req.user.id;
        const items = req.session.cart.foodItems;
        
        //store this order in the database.
        db.query(`INSERT INTO orders (user_id, items)
        VALUES ($1, $2)`, [customerId, items])
        .then(data => {
          // if the order placed successfuly then clear the cart and 
          // redirect to customers order page.
          // We might need to add the message notification logic here
          console.log(req.user)
          delete req.session.cart;
          return res.redirect('/user/orders')
        })
        .catch((err) => {
          //if the error occur, then redirect to cart
          console.log("can not insert order in db", err)
          return res.redirect('/cart')
        })

     }
  }

    // sendOrder: (req, res) => {
    //   //insert logic here
    //   console.log("point is hit");
    //   client.messages
    //     .create({
    //       body: "A new order has been submitted",
    //       from: "+12082188536",
    //       to: "+14162624439",
    //     })
    //     .then((message) => console.log(message.sid));
    //   res.redirect("/");
    // },
  };


module.exports = cartController;
