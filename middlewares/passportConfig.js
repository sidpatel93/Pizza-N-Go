const passportLocal = require('passport-local').Strategy
const bcrypt = require('bcryptjs')

const init = (passport, db) => {
  passport.use(new passportLocal({ usernameField: 'email_address'}, (email_address, password, done)=> {
      //Check if the user exist in the database
      db.query(`SELECT users.*
      FROM users
      where email_address=$1`,[email_address])
     .then(async (data) => {
      //console.log("fetching user", data.rows[0])
      if((data.rows).length === 0){
       // If no user found in the db then, call the callback
        done(null, false, {message: 'No user found with this email'})
      } else {
        // if user exist then match the password
        const isCorrect = await bcrypt.compare(password, data.rows[0].password)
        //if password matches
        if(isCorrect) {
          const user = data.rows[0]
          return done(null, user, {message: "User found, logged in"} )
        }
        else {
            return done(null, false, {message: "incorrect username or password"})
        }
      }
       })
      .catch((err)=> {
        console.log("error while fetching the user")
      })
}))

// This will store the user.id in the session db
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  // This will get the user that is currently logged in
  passport.deserializeUser((id, done) => {
    db.query(`SELECT users.*
    FROM users
    where users.id=$1`, [id])
    .then( data => {
      user = data.rows[0]
      done(null, user)
    })
    .catch((err)=> {
      console.log("There was error fetching the user")
    })
  })

}


module.exports = init