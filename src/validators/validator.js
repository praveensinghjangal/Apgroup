const mongoose = require('mongoose')

const isValidBody = (value) => {
    if (typeof value === "undefined" || value === null) return false
    if (typeof value === "string" && value.trim().length === 0) return false
   // if (typeof (value) === 'object'|| Object.values(value) === 0) return false
    return true
}


const isValidName = (firstName) => {
    if (/^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z])$/i.test(firstName))
        return true
}




const isValidEmail = (email) => {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(email))
        return true
}

function isValidPhone(mobile) {
    if (/^[6-9][0-9]{9}$/.test(mobile))
        return true
    else return false
}







const isValidpassword = function (password) {

    let checkPassword = /^[a-zA-Z0-9!@#$%^&*]{8,15}$/
    if (checkPassword.test(password)) {
        return true
    }
    return false
}






module.exports = { isValidBody, isValidEmail, isValidName, isValidPhone, isValidpassword}