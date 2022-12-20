const Validator = require('../validators/validator')
const adminModel = require('../models/adminModel')
const jwt = require('jsonwebtoken')

const createadmin= async function (req, res) {

    try {
        const raw = req.body;
        
        if (!raw) { return res.status(400).send({ status: false, msg: 'Please enter the data in request body ' }) }
        
        
       
        const createdUser = await adminModel.create(raw)
        res.status(201).send({ msg: "createddata", data: createdUser })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    };
}


const admin = async function (req, res) {

    const requestbody = req.body
    if (!Validator.isvalidRequestBody(requestbody)) { return res.status(400).send({ status: false, msg: 'Please enter mailId and password ' }) }
    const { email, password } = requestbody
    
    // to check the email is present 
    if (!Validator.isValidBody(email)) { return res.status(400).send({ status: false, msg: 'Please enter the Email Id' }) }
    
    // to validate the emailId 
    if (!Validator.isValidEmail(email)) { return res.status(400).send({ status: false, msg: 'Please enter valid emailId' }) }
    
    // to check the password is Present
    if (!Validator.isValidBody(password)) { return res.status(400).send({ status: false, msg: 'Please enter the password' }) }
    
    // to validate the password in given length
    if (!Validator.isValidpassword(password)) { return res.status(400).send({ status: false, msg: "password should be have minimum 8 character and max 15 character" }) }

    const user=await adminModel.findOne({email:email,password:password})
    if(!user) {return res.status(404).send({status:false,msg:'No such user found'})}

    let token =jwt.sign({
        userId:user._id.toString(),
        project: "Project-star",
        iat:Math.floor(Date.now() / 1000),
        exp:Math.floor(Date.now() / 1000) + 10*60*60
    }, "Project-Runo ");
    res.setHeader('x-api-key',token)
    res.status(200).send({
        status:true,
        message:'SuccessFully loggedIn',
        token:token,
    })
}



module.exports.createadmin = createadmin
module.exports.admin = admin








