function cartController(db) {

  return {

    cart: (req, res) => {
      res.render("users/cart")
     },
     
  }

}

module.exports = cartController;