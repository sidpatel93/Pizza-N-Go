const isLoggedIn = (req, res, next) => {
  
  //check if the user is loggedIn. isAuthenticated() function is coming from 
  // passport library. if the user is logged in then send the request further
  if(!req.isAuthenticated()){
    return next()
  }
  //if user is logged in then redirect to home page.
  return res.redirect('/')
}

module.exports = isLoggedIn