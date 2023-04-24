const userDB = require('../model/model');

// Create and save new user
exports.create=(req,res)=>{
    // validate request
    if(!req.body){
        res.status(400).send({message : "Content can not be empty!"});
        return;
    }
    // new user
    const user = new userDB({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status : req.body.status
    })

    // Save user in the data base
    user
        .save(user)
        .then(data =>{
            // res.send(data);
            res.redirect('/add-user')
        })
        .catch(err =>{
            res.status(500).send({
                message : err.message || "Some error occured while creating a create operation."
            });
        });
}

// Retrieve and return all users/retrieve and return a single user
exports.find = (req,res)=>{

    if(req.query.id){ 
        const id = req.query.id;  // single user

        userDB.findById(id)
            .then(data =>{
                if(!data){
                    res.status(404).send({message : "Not found user with id "+id});
                }
                else{
                    res.send(data);
                }
            })
            .catch(err=>{
                res.status(500).send({message : "Error retrieving user with id "+ id});
            });

    }else{
        userDB.find()  // Multiple users
        .then(user =>{
            res.send(user);
        })
        .catch(err =>{
            res.status(500).send({message : err.message || "Error Occured while retriving user information."});
        })

    }
}

// Update a new identified user by userID
exports.update = (req,res)=>{
    if(!req.body){
        return res.status(400).send({message : "Data cannot be empty."})
    }

    const id = req.params.id;
    userDB.findByIdAndUpdate(id, req.body, { useFindAndModify: false})
        .then(data =>{
        if(!data){
            res.status(404).send({message : `Cannot Update user with ${id}.Maybe user not find.`});
        }
        else{
            res.send(data);
        }
    })
       .catch(err=>{
        res.status(500).send({message : "Error Updata user Information."})
    })
}

// Delete user with specified userID in the request
exports.delete = (req,res)=>{
    const id = req.params.id;

    userDB.findByIdAndDelete(id)
        .then(data =>{
            if(!data){
                res.status(404).send({message : `Cannot delete with id ${id}. Maybe id is wrong.`});
            }
            else{
                res.send({
                    message : "User was deleted Successfully!"
                });
            }
        })
        .catch(err=>{
            res.status(500).send({
                message : "Could not delete User with id : "+id
            });
        });
}


