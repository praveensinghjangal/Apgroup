const express = require('express');
const router = express.Router();
const employeeController= require("../controllers/employeeController")
const companyController= require("../controllers/companyController")
const mw=require('../middlewares/auth')
const adminController= require("../controllers/adminController")


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/creteuser", employeeController.createdemployee)
router.get("/get/:employeeId",mw.authenticated, employeeController.getemployeedata)
router.put("/update/:employeeId",mw.authenticated, employeeController.updateemployee)
router.delete("/delete/:employeeId", mw.authenticated , employeeController.deleteEmployee)



router.post("/cretecompany",mw.authenticated, companyController.createcompany)
router.get("/get/:companyId",mw.authenticated, companyController.getcompany)
router.get("/getallcompany",mw.authenticated, companyController.getallcompany)
router.put("/update/:companyId",mw.authenticated, companyController.updatecompany)
router.delete("/delete/:companyId", mw.authenticated , companyController.deletecompany)


router.post("/login", adminController.login) 





// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date

module.exports = router;