import brevo from '@getbrevo/brevo';
import dotenv from 'dotenv';

let key = process.env.SIB_API_KEY;

const apiInstance = new brevo.TransactionalEmailsApi();

// Set the API key using setApiKey function
apiInstance.setApiKey(brevo.TransactionalEmailsApiApiKeys.apiKey, key);

let sendSmtpEmail = new brevo.SendSmtpEmail();


const sendingMail = async ({ from, to, subject, text }) => {


  try {
    sendSmtpEmail.subject = "Verify Your Email with This OTP Code";
    sendSmtpEmail.htmlContent = `
 <div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">    <div style="margin:50px auto;width:70%;padding:20px 0">      <div style="border-bottom:1px solid #eee">
       <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">The Therapist</a>
 </div>      <p style="font-size:1.1em">Hi,</p>      <p>Welcome to The Therapist! To complete your signup, please use the following One-Time Password (OTP). The OTP is valid for 5 minutes, so make sure to enter it soon.</p>
 <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${text}</h2>
     <p style="font-size:0.9em;">Thank you for joining,<br />The Therapist App Developer</p>
     <hr style="border:none;border-top:1px solid #eee" />
   </div>
 </div>

       `;
    sendSmtpEmail.sender = { "name": "Hasnain Ali", "email": "nrind4956@gmail.com" };
    sendSmtpEmail.to = [
      { "email": to }
    ];

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function (error) {
      console.error(error);
    });

  } catch (e) {
    console.log("error occured while sending emails");
  }

}


export default sendingMail;
