const bcrypt = require('bcrypt');
const config = require('./config')
resetPasswordUrl = config.API_URL + '/reset-password'
const { compareSync, hashSync } = bcrypt;
const { sendMail } = require('../utils/mail')
function comparePassword(password, hashed) {
    const isEqual = compareSync(password, hashed);
    return isEqual;
}

function hashPassword(password, saltRounds = 12) {
    const encrypted = hashSync(password, saltRounds);
    return encrypted;
}
function isGoodPassword(password, regEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/) {
    if (password.length < 8) return false;
    console.log(regEX.test(password));
    return regEX.test(password);

}
function sendResetPasswordMail(email, token) {
    const message = PasswordMessage(email, token);
    console.log(resetPasswordUrl)
    sendMail(email, "reset password", `<a href="${resetPasswordUrl}?token=${token}" onclick> click here it will reset password</a>`, ` click on this link to reset password ${resetPasswordUrl}?token=${token}`);
}
module.exports = {
    comparePassword,
    hashPassword,
    isGoodPassword,
    sendResetPasswordMail
}
