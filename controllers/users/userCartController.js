function cartController(db) {

  return {

    cart: (req, res) => {
      res.render("users/cart")
     },
     
     updateCart: (req, res) => {
       // add an item in the cart

       // check if the cart exist in the session
          //if it is not then create the cart
          if(!req.session.cart){
            req.session.cart = {
              foodItems: {},
              totalOty: 0,
              totalPrice: 0
            }
          }
          let cart = req.session.cart;
          console.log(req.body)
      // If the cart already exist then update the cart.
          //check if the added item exist in the cart, it not then add it 
          if(cart.foodItems) {

          }
     }
  }

}

module.exports = cartController;