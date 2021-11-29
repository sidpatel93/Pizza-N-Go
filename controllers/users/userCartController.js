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

    sendOrder: (req, res) => {
      //insert logic here
      console.log("point is hit");
      client.messages
        .create({
          body: "A new order has been submitted",
          from: "+12082188536",
          to: "+14162624439",
        })
        .then((message) => console.log(message.sid));
      res.redirect("/");
    },
  };
}

module.exports = cartController;
