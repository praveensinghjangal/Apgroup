
//const employeeModel = require('../models/employeeModel')
const Validator = require('../validators/validator')

const employeeModel = require("../models/employeeModel")

const createdemployee = async function (req, res) {

    try {
        const data = req.body  
        if (!data) { return res.status(400).send({ status: false, msg: 'Please enter the data in request body ' }) }
        const { firstName, lastName } = data
        
        // to check the title is present or not 
        if (!Validator.isValidBody(firstName)) { return res.status(400).send({ status: false, msg: 'Please enter the title' }) }
        
        
        // to check the name is present 
        if (!Validator.isValidBody(lastName)) { return res.status(400).send({ status: false, msg: 'Please enter the Name' }) }
        
      const createdemployee = await employeeModel.create(data)
        res.status(201).send({ msg: "createddata", data: createdemployee })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    };
}

const getemployeedata = async function (req, res) {
    try{
     let result = req.params.employeeId
 
   
     
         const dbcall = await employeeModel.findById({ _id: result })
         if(!dbcall) return  res.status(400).send({status: false, message:"No user found with this userId"})
         return res.status(200).send({ status: true, message: "User profile details", data: dbcall })
     }
     
     catch (error) {
         return res.status(500).send({ status: false, message: "error" })
 
     }
 }
 
 
 
 const updateemployee = async function (req, res) {
         try{
 
             let employeeId = req.params.employeeId
        
         var data = req.body
         let { fname, lname, mobile } = data
         // to check the title is present or not 
         if (!Validator.isValidBody(fname)) { return res.status(400).send({ status: false, msg: 'Please enter the title' }) }
        
        
         // to check the name is present 
         if (!Validator.isValidBody(lname)) { return res.status(400).send({ status: false, msg: 'Please enter the Name' }) }

         if (!Validator.isValidPhone(mobile)) { return res.status(400).send({ status: false, msg: 'Please enter the correct mobile Number' }) }
         if (!Validator.isValidEmail(email)) { return res.status(400).send({ status: false, msg: 'Please enter the correct Email format' }) }


         
       const update = await employeeModel.findOneAndUpdate({_id : employeeId }, 
               {$set:{fname: fname, lname:lname,} },
                     {new: true}
        )
        return res.status(200).send({ status: true, message: "Employee profile uodated", data: update })
 
          } catch (err) {
             console.log(err)
         res.status(500).send({ status: false, message: err.message });
     }
    }

    const deleteEmployee = async function (req, res) {
        try {
      
          const getId = req.params.employeeId
      
          if (getId.length < 24) {
      
            return res.status(400).send({ status: false, msg: "Make sure your employee Id is correct or not??" })
      
          }
      
      
      
          const deletedemployee = await employeeModel.findOneAndUpdate(
            { _id: getId, isDeleted: false },
            { $set: { isDeleted: true} },
            { new: true })
      
      
          if (!deletedemployee) {
           return res.status(400).send({ status: false, msg: "No such as employee found" })
          }
         return res.status(200).send({ status: true, data: "Done: this employee is deleted" })
      
        } catch (error) {
         return res.status(500).send({ msg: error.message });
        }
      };


 
 module.exports = { createdemployee, getemployeedata, updateemployee, deleteEmployee };







