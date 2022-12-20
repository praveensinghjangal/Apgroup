const express = require('express');
const router = express.Router();
const userController= require("../controllers/userController")
const adminController= require("../controllers/adminController")
const mw=require('../middlewares/auth')


router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/creteuser", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/cowin/states",mw.authenticated, userController.getStates)
router.get("/cowin/districtsInState/:stateId",mw.authenticated, userController.getDistricts)
router.get("/cowin/getByPin", mw.authenticated , userController.getByPin)


router.get("/cowin/getOtp",mw.authenticated, userController.getOtp)

router.post("/createadmin", adminController.createadmin)

router.post("/loginadmin", adminController.admin)

// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date



module.exports = router;