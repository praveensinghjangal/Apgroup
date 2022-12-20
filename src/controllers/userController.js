let axios = require("axios")
const UserModel = require('../models/userModel')
const Validator = require('../validators/validator')
const jwt = require('jsonwebtoken')

const createUser = async function (req, res) {

    try {
        const data = req.body  
        if (!data) { return res.status(400).send({ status: false, msg: 'Please enter the data in request body ' }) }
        const { firstName, lastName, mobile, pincode, gender, Age, AadharNumber  } = data
        
        // to check the title is present or not 
        if (!Validator.isValidBody(firstName)) { return res.status(400).send({ status: false, msg: 'Please enter the title' }) }
        
        // // to validate the enum 
         if (["male", "female", "LGBTQ"].indexOf(gender) == -1) { return res.status(400).send({ status: false, msg: 'Please select the correct gender' }) }
        
        // to check the name is present 
        if (!Validator.isValidBody(lastName)) { return res.status(400).send({ status: false, msg: 'Please enter the Name' }) }
        
        // to check the phone Number is Prsent
        if (!Validator.isValidBody(mobile)) { return res.status(400).send({ status: false, msg: 'Please enter the Mobile Number' }) }
        
        // to validate the mobile number 
        if (!Validator.isValidPhone(mobile)) { return res.status(400).send({ status: false, msg: 'Please enter valid Mobile Number' }) }
        
        // to validate the number in database
        const isDuplicateNumber = await UserModel.find({ mobile: mobile })
        if (isDuplicateNumber.length != 0) { return res.status(400).send({ status: false, msg: 'This number is already exist' }) }
        
       
        if (!Validator.isValidPinCode(pincode))
        return res.status(400).send({ status: false, message: "pincode format not correct " })

        if (!Validator.isValidAadharcard(AadharNumber)) { return res.status(400).send({ status: false, msg: 'Please enter valid Aadhar Number' }) }
       
        if(Age < 18){ return res.status(400).send({ status: false, msg: 'Age cannot be Smaller than 18' }) }

        const createdUser = await UserModel.create(data)
        res.status(201).send({ msg: "createddata", data: createdUser })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    };
}


const loginUser = async function (req, res) {

    const requestbody = req.body
    if (!requestbody) { return res.status(400).send({ status: false, msg: 'Please enter mailId and password ' }) }
    const { email, password } = requestbody
    
    // to check the email is present 
    if (!Validator.isValidBody(email)) { return res.status(400).send({ status: false, msg: 'Please enter the Email Id' }) }
    
    // to validate the emailId 
    if (!Validator.isValidEmail(email)) { return res.status(400).send({ status: false, msg: 'Please enter valid emailId' }) }
    
    // to check the password is Present
    if (!Validator.isValidBody(password)) { return res.status(400).send({ status: false, msg: 'Please enter the password' }) }
    
    // to validate the password in given length
    //if (!Validator.isValidpassword(password)) { return res.status(400).send({ status: false, msg: "password should be have minimum 8 character and max 15 character" }) }

    const user=await UserModel.findOne({email:email,password:password})
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



let getStates = async function (req, res) {

    try {
        let options = {
            method: 'get',
            url: 'https://cdn-api.co-vin.in/api/v2/admin/location/states'
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


let getDistricts = async function (req, res) {
    try {
        let id = req.params.stateId
        let options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/admin/location/districts/${id}`
        }
        let result = await axios(options);
        console.log(result)
        let data = result.data
        res.status(200).send({ msg: data, status: true })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getByPin = async function (req, res) {
    try {
        let pin = req.query.pincode
        let date = req.query.date
        console.log(`query params are: ${pin} ${date}`)
        var options = {
            method: "get",
            url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pin}&date=${date}`
        }
        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}

let getOtp = async function (req, res) {
    try {
        let blahhh = req.body
        
        console.log(`body is : ${blahhh} `)
        var options = {
            method: "post",
            url: `https://cdn-api.co-vin.in/api/v2/auth/public/generateOTP`,
            data: blahhh
        }

        let result = await axios(options)
        console.log(result.data)
        res.status(200).send({ msg: result.data })
    }
    catch (err) {
        console.log(err)
        res.status(500).send({ msg: err.message })
    }
}


module.exports.getStates = getStates
module.exports.getDistricts = getDistricts
module.exports.getByPin = getByPin
module.exports.getOtp = getOtp
module.exports.createUser = createUser
module.exports.loginUser = loginUser

