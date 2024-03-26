const AdminModel = require('../models/adminmodel');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateTokens');

async function createAdmin(req, res) {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        // Check if admin with the given username already exists
        const existingAdmin = await AdminModel.findOne({
            username: req.body.username
        });

        if (existingAdmin) {
            return res.status(409).send({
                status: false,
                message: "Admin already exists"
            });
        }

        // Create new admin
        const newUser = {
            username: req.body.username,
            password: hashedPassword
        }

        await AdminModel.create(newUser);

        res.status(200).send({
            status: true,
            message: "Admin account created successfully",
            token : generateToken(newUser)
        });

    } catch (error) {
        console.error(error);
        res.status(500).send({
            status: false,
            message: "Internal server error"
            
        });
    }
}


async function adminSignIn(req,res){
    try{
        const findUser = await AdminModel.findOne({username : req.body.username})

        if(!findUser)
        res.status(401).send('User Not Found');
        
        bcrypt.compare(req.body.password, findUser.password).then(function(result) {
            if(!result)
            res.status(401).send('User Not Found');

            res.status(200).json({
                stauts : true,
                message : "user LoggedIn successfully",
                token : generateToken(findUser._id)
            })
        });

    }catch(err)
    {
        console.log(err);
        res.status(200).send({
            status : false,
            message : "Internal Server error"
        })
    }
    
}

module.exports = { createAdmin ,adminSignIn};
