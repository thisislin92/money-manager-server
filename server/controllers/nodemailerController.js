const nodemailer = require('nodemailer');

class Controller {

   static  async sendMail(req, res, next) {
        try {
            const {email} = req.params
          let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'herlinalim92@gmail.com',
              pass: 'rkjqhnfkfplprmdx'
            }
          });
      
          const mailDetails = {
            to: email,
            subject: 'Welcome to Money Manager',
            text: 'You Have Successfully Registered to Money Manager App'
          };
          await mailTransporter.sendMail(mailDetails)
          console.log("Email sent successfully");
          res.json({
            message: "Email sent successfully"
          })
        } catch (err) {
          console.log("Error Occurs: ", err);
          next(err)
        }
      }
      

    }

module.exports = Controller