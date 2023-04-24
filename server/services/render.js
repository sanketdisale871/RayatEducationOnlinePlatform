const axios = require('axios');


exports.loginRoutes=(req,res)=>{
    res.render('login');
}

exports.homeRoutes=(req,res)=>{
   // Make a request to api/users\
   axios.get('http://localhost:3000/api/users')
    .then(function(response){
        // console.log(response.data)
        res.render('index',{users:response.data});
    })
    .catch(err=>{
        res.send(err);
    })
} 

exports.addUser =(req,res)=>{
    
    res.render('add_user');
}

exports.updateUser = (req,res)=>{
    axios.get('http://localhost:3000/api/users',{params :{id:req.query.id}})
        .then(function(userdata){
            res.render('update_user',{user : userdata.data})
        })
        .catch(err =>{
            res.send(err);
        })
    
}

exports.studentAttend = (req,res)=>{
    // Make a request to api/users\
   axios.get('http://localhost:3000/api/users')
   .then(function(response){
       // console.log(response.data)
       res.render('adminAtten',{users:response.data});
   })
   .catch(err=>{
       res.send(err);
   })
}

exports.studentLoginPage = (req,res)=>{
    res.render('studLogin');
}

let id ;

exports.studentHome = (req,res)=>{
     id = req.body.id;

    axios.get(`http://localhost:3000/api/users?id=${id}`)
        .then(function(response){
            // res.send("Student logged Succesfully.");
            res.render('stuHome',{student : response.data});
        })
        .catch(err=>{
            res.send("Invalid Student Login");
        })
}

exports.studetnProfile=(req,res)=>{
    axios.get(`http://localhost:3000/api/users?id=${id}`)
    .then(function(response){
        // res.send("Student logged Succesfully.");
        res.render('stuHome',{student : response.data});
    })
    .catch(err=>{
        res.send("Invalid Student Login");
    })
}

exports.studentAtten = (req,res)=>{
    res.render('attendenceStud');
}