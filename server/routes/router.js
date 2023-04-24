const express = require("express")
const route = express.Router();

const services = require('../services/render');
const controller = require('../controller/controller');

/* Admin Side Routing */

const credential = {
    email : "admin@gmail.com",
    password : "admin123"
}



/**
 * @description Login Route
 * @method POST / Admin Login
 */

route.post('/login',(req,res)=>{
    if(req.body.email == credential.email && req.body.password == credential.password){
        req.session.user = req.body.email;

        res.redirect('/home');
    }
    else{
        res.end("Invalie Username or Password.")
    }
})

/**
 * @description Logout Route
 * @method POST / Admin Logout
 */

route.get('/logout',(req,res)=>{
    res.render('login');
})
/**
 * @description Login Page
 * @method GET / Admin Login page
 */
route.get('/',services.loginRoutes);
/**
 * @description Root Route
 * @method GET / Home
 */
route.get('/home',services.homeRoutes);

/**
 * @description add Users
 * @method GET / add-user
 */

route.get('/add-user',services.addUser);

/**
 * @description Update User
 * @method GET / update-user
 */

route.get('/update_user' ,services.updateUser)
/**
 * @description Attendence
 * @method GET / attendence admin
 */

route.get('/adminAtten' ,services.studentAttend)


/* Studetn Side Routing */
route.get('/stuLogin',services.studentLoginPage)

route.post('/studlogin',services.studentHome)

route.get('/studProfile',services.studetnProfile)



route.get('/studAtte',services.studentAtten)


// API
route.post('/api/users',controller.create);
route.get('/api/users',controller.find);
route.put('/api/users/:id',controller.update);
route.delete('/api/users/:id',controller.delete);

module.exports = route;