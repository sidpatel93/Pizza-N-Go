const bcrypt = require('bcryptjs');
const passport = require('passport');
const moment = require('moment')

function homeController(db) {

  const userRole = (req) => {
    if(req.user.isadmin){
      return 'admin/orders/new'
    }
    return '/'
  }



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

     registerUser: (req, res) => {
        //get the user data from form submit request
        // console.log("this is request body",req.body)
        const {name, email_address, phone_number, password} = req.body
        
        // Check if all the fields are filled
        if(!name || !phone_number || !password || ! email_address){
          //put logic if the user has not filled all the fields
          return res.redirect("/register")
        }

        // Check if the user already exist in the system
        db.query(`SELECT email_address
         FROM users
         where email_address=$1`, [email_address])
        .then(async (data) => {
          if((data.rows).length !== 0){
            // show error to user that they are already register here.
            console.log("user is already registered")
            return res.redirect("/");
          } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            db.query(`INSERT INTO users 
            (name, email_address, password, phone_number) 
            VALUES ($1, $2, $3, $4)
            returning *`, [name, email_address, hashedPassword, phone_number])
            .then( data => {
              // Once the user is registered, redirect to home page and log them in.
              return res.redirect("/")
            })
            .catch((err) => {
              console.log("Failed to insert new user in db")
              return res.redirect("/register")
            })
          }
        })
        .catch((err)=> {
          console.log(err)
          console.log("failed to get the email from the db")
          return res.redirect("/register")
        })
     },

     login: (req, res)=> {
      res.render("login")
     },

     loginUser: (req, res, next) => {
        passport.authenticate('local', (err, user, info)=>{
          if(err){
            console.log("error:",info.message)
            return next(err)
          }
          if(!user){
            console.log("error:", info.message)
            return res.redirect("/login")
          }

          req.login(user, (err) => {
            if(err){
              console.log("error:",info.message)
              return next(err)
            }
            // if the user is admin then redirect to admin/orders page and if not then redirecto to home page

            return res.redirect(userRole(req))
          })

        })(req, res, next)
     },

     logout: (req, res) => {
       // .logout is from passport library
       req.logout()
       return res.redirect('/login')
     },

     orders: (req, res) => {
       //get all the orders for the current users here to display
        customerId = req.user.id
        db.query(`
        select orders.*
        from orders
        where orders.user_id=$1
        order by order_time`, [customerId])
        .then(data => {
          const userOrders = data.rows
          console.log("user id:", customerId)
          console.log("orders",data.rows)
          res.render('users/userOrders', {userOrders, moment})
        })
        .catch((err)=> {
          console.log("Error fetching the user's orders", err)
          res.redirect('/')
        })
     }

  }

}

module.exports = homeController;