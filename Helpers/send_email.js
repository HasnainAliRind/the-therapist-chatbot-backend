//importing modules
import nodemailer from 'nodemailer'
import dotenv from "dotenv"

dotenv.config()


//function to send email to the user
const sendingMail = async ({ from, to, subject, text }) => {

  try {
    let mailOptions = ({
      from,
      to,
      subject,
      text
    })
   
    const Transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAILPASS,
      },
    });

    //return the Transporter variable which has the sendMail method to send the mail
    //which is within the mailOptions
    return await Transporter.sendMail(mailOptions)
  } catch (error) {
    console.log(error)
  }

}

export default sendingMail