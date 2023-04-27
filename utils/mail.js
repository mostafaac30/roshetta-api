const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.EMAIL_API_KEY)


exports.sendMail = function (to, subject, html, text) {
    let message = {
        from: "m.ibrahem@entlaqa.com",
        to: to || "m.ibrahem@entlaqa.com",
        subject: subject || "Hello ✔",
        text: text || "Hello world?",
        html: html || "<b>Hello world?</b>",
    };
    sgMail.send(message).then(() => console.log("email send successfuly")).catch(e => console.log(e.message))
}

exports.isGoodEmail = function (email, regEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g) {
    return regEX.test(email)
}