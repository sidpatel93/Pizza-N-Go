const bcrypt = require('bcryptjs')

function homeController(db) {

  return {
      home: (req, res) => {
        db.query(`SELECT * FROM menuItems;`)
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
        console.log(typeof(req.body))
        const {name, email, phone, password} = req.body
        console.log(name, email, phone, password)
      //   db.query(`SELECT email
      //   FROM users
      //   where email=$1;`, [email])
      //  .then( data => {
      //     console.log(data.rows)
      //  })
      //  .catch((err)=> {
      //    console.log(err)
      //    console.log("failed to get the email from the db")
      //    //return res.redirect("/register")
      //  })
      //   // Check if all the fields are filled
      //   if(!name || !phone || !password || ! email){
      //     //put logic if the user has not filled all the fields
      //     return res.redirect("/register")
      //   }
        // Check if the user already exist in the system
        // db.query(`SELECT email
        //  FROM users
        //  where email=$1`, [email])
        // .then( data => {
        //   if(data.rows){
        //     // show error to user that they are already register here.
        //     console.log(res.rows)
        //     console.log("user is already registered")
        //     return res.redirect("/");
        //   }
        // })
        // .catch((err)=> {
        //   console.log(err)
        //   console.log("failed to get the email from the db")
        //   return res.redirect("/register")
        // })
        // If above conditions fail, then save this user data in the database
        const hashedPassword = await bcrypt.hash(password, 8)
        db.query(`INSERT INTO users (name, email, password, phone_number) VALUES ($1, $2, $3, $4);`, [name, email, hashedPassword, phone])
        .then((res)=> {
          // Once the user is registered, redirect to home page and log them in.
          return res.status(200).redirect("/")
        })
        .catch((err) => {
          console.log("Failed to insert new user in db")
          return res.redirect("/register")
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