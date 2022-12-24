const jwt=require('jsonwebtoken')
const Validator = require('../validators/validator')


const login = function (req, res) {

    const requestbody = req.body
 
    const { email, password } = requestbody
    

    
    if(email ==  "admin@admin.com" && password == "password" ) {
        let token =jwt.sign({
            project: "Project-3",
            iat:Math.floor(Date.now() / 1000),
            exp:Math.floor(Date.now() / 1000) + 10*60*60
        }, "Apgroup");
       // res.setHeader('x-api-key',token)
        res.status(200).send({
            status:true,
            message:'SuccessFully loggedIn',
            token:token,
        })
    }else{
        return res.status(400).send({ status: false, msg: 'Please enter the correct credentials' })
    }

    
}

module.exports = {login}
