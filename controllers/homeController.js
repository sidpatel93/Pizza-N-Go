

function homeController(db) {

  return {
      home: (req, res) => {
        db.query(`SELECT * FROM menu_items;`)
            .then(data => {
              const fooditems = data.rows;
              console.log(fooditems)
              res.render("index", {fooditems})
            })
            .catch(err => {
              res
                .status(500)
                .json({ error: err.message });
            });
     
     },
     
     register: (req, res)=> {
      res.render("users/register")
     },

     login: (req, res)=> {
      res.render("login")
     },

  }

}

module.exports = homeController;