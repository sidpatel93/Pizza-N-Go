const bcrypt = require('bcryptjs')

function homeController(db) {

  return {
      home: (req, res) => {
        db.query(`SELECT * FROM menu_items;`)
            .then(data => {
              const fooditems = data.rows;
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

     registerUser: async (req, res) => {
        //get the user data from form submit request
        const {name, email, phoneNumber, password} = req.body;
        console.log(name, email, phoneNumber, password)
        // Check if all the fields are filled
        if(!name || !phoneNumber || !password || ! email){
          //put logic if the user has not filled all the fields
          return res.redirect("users/register")
        }
        // Check if the user already exist in the system
        db.query(`select users.email as email form users where users.email=${email};`)
        .then((res)=> {
          if(res.rows[0]){
            // show error to user that they are already register here.
            console.log(res.rows[0])
            console.log("user is already registered")
            return res.redirect("users/register");
          }
        })
        .catch((err)=> {
          console.log(err)
          console.log("failed to get the email from the db")
          return res.render("users/register")
        })
        // If above conditions fail, then save this user data in the database
        const hashedPassword = await bcrypt.hash(password, 8)
        db.query(`INSERT INTO users (name, email, password, phone_number) VALUES ($1, $2, $3, $4);`, [name, email, hashedPassword, phoneNumber])
        .then((res)=> {
          // Once the user is registered, redirect to home page and log them in.
          return res.redirect("index")
        })
        .catch((err) => {
          console.log("Failed to insert new user in db")
          return res.redirect("users/register")
        })
     },

     login: (req, res)=> {
      res.render("login")
     },

     loginUser: (req, res) => {

     },

  }

}

module.exports = homeController;