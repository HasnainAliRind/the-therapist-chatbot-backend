// Importing modules
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import Sib from "sib-api-v3-sdk";

dotenv.config();

let client = Sib.ApiClient.instance;
const apiKey = client.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY

const tranEmailApi = new Sib.TransactionalEmailsApi()

// Function to send email to the user
const sendingMail = async ({ from, to, subject, text }) => {


  try {

    const sender = {
      email: 'nrind4956@gmail.com',
      name: 'Hasnain Ali',
    }
    const receivers = [
      {
        email: to,
      },
    ]

    console.log(tranEmailApi);
    console.log(apiKey);
    
    

    tranEmailApi.sendTransacEmail({
      sender,
      to: receivers,
      subject: "Verify Your Email with This OTP Code",
      htmlContent: `
      <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">The Therapist</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Welcome to The Therapist! To complete your signup, please use the following One-Time Password (OTP). The OTP is valid for 5 minutes, so make sure to enter it soon.</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${text}</h2>
    <p style="font-size:0.9em;">Thank you for joining,<br />The Therapist App Developer</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>YourApp Inc</p>
      <p>123 Startup Lane</p>
      <p>Silicon Valley, CA</p>
    </div>
  </div>
</div>

      `
    }).then(resp => console.log(resp)
    ).catch(e => console.log(e)
    )

  } catch (error) {
    console.log('Error sending email:', error);
  }
};

export default sendingMail;
