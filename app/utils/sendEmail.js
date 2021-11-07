const nodemailer = require("nodemailer");
const SystemConf = require("../configs/system"); 

// async..await is not allowed in global scope, must use a wrapper
const sendEmail = async (options) =>  {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: SystemConf.SMTP_HOST,
    port: SystemConf.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: SystemConf.SMTP_EMAIL, // generated ethereal user
      pass: SystemConf.SMTP_PASSWORD, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: `${SystemConf.FORM_NAME} <${SystemConf.FORM_EMAIL}>` , // sender address
    to: options.email, // list of receivers
    subject: options.subject, // Subject line
    text: options.message, // plain text body
  });
  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

module.exports = {
    sendEmail
}
