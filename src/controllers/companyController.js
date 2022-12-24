const Validator = require('../validators/validator')
const companyModel = require('../models/companyModel')


const createcompany= async function (req, res) {

    try {
        const raw = req.body;
        
        if (!raw) { return res.status(400).send({ status: false, msg: 'Please enter the data in request body ' }) }
        
        if (!Validator.isValidBody(raw.Name)) { return res.status(400).send({ status: false, msg: 'Please enter the Company name' }) }
       
        const createdUser = await companyModel.create(raw)
        res.status(201).send({ msg: "createddata", data: createdUser })

    } catch (err) {
        res.status(500).send({
            status: false,
            msg: err.message
        })
    };
}



const getcompany = async function (req, res) {
    try{
     let result = req.params.companyId
     if(!result) return res.status(400).send({status: false, message:"No company found with this userId"})
   
     
         const dbcall = await employeeModel.find({ companyId: result, isDeleted: false })
         if(!dbcall) return  res.status(400).send({status: false, message:"No company found with this Id"})
         return res.status(200).send({ status: true, message: "company profile details", data: dbcall })
     }
     
     catch (error) {
         return res.status(500).send({ status: false, message: "error" })
 
     }
 }


 const getallcompany = async function (req, res) {
    try{
    //  if(!result) return res.status(400).send({status: false, message:"No company found with this userId"})
   
     
         const dbcall = await companyModel.find({ isDeleted: false })
         if(!dbcall) return  res.status(400).send({status: false, message:"No company found with this Id"})
         return res.status(200).send({ status: true, message: "company profile details", data: dbcall })
     }
     
     catch (error) {
         return res.status(500).send({ status: false, message: "error" })
 
     }
 }
 
 
 
 const updatecompany = async function (req, res) {
         try{
 
             let companyId = req.params.companyId
        
         var data = req.body
         let { Name,website } = data
         // to check the title is present or not 
         if (!Validator.isValidBody(Name)) { return res.status(400).send({ status: false, msg: 'Please enter the title' })}


         
       const update = await companyModel.findOneAndUpdate({_id : companyId, isDeleted: false}, 
               {$set:{Name: Name, website: website} },
                     {new: true}
        )
        return res.status(200).send({ status: true, message: "Employee profile uodated", data: update })
 
          } catch (err) {
             console.log(err)
         res.status(500).send({ status: false, message: err.message });
     }
    }

    const deletecompany = async function (req, res) {
        try {
      
          const getId = req.params.companyId
      
          if (getId.length < 24) {
      
            return res.status(400).send({ status: false, msg: "Make sure your company Id is correct or not??" })
      
          }
      
      
      
          const deletedcompany = await companyModel.findOneAndUpdate(
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





module.exports =  { createcompany, getcompany, updatecompany, deletecompany, getallcompany};









