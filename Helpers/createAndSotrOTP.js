import connection from "../config/ConnectDB.js";
import crypto from "crypto";
import sendingMail from "./send_email.js";
import dotenv from "dotenv"

dotenv.config()

// Store OTP in the database and delete after 5 minutes
function createAndStoreOTP(userEmail, res) {
    // Generate OTP function
    function generateOTP(length = 6) {
        return crypto.randomInt(100000, 999999).toString();  // Generates a 6-digit OTP
    }

    const otp = generateOTP();
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000);  // 5 minutes from now

    // res.json({otp})

    // // Insert OTP into the MySQL database
    connection.query(
        'INSERT INTO otp_table (`user_email`, `otp_code`, `expires_at`) VALUES (?, ?, ?)',
        [userEmail, otp, expirationTime],
        (err, results) => {
            if (err) {
                console.error('Error inserting OTP into the database:', err);
                return res.json({ status: false, reason: 'Error generating OTP, try again after sometime' });
            }

            sendingMail({from: process.env.EMAIL, to: userEmail, subject: "OTP to verify your email", text: `Your OTP is ${otp} \nEnter this OTP to verify your email`})
            
            // OTP successfully inserted
            res.json({ status: true, reason: 'OTP generated and sent to email' });
            
            
        }
    );
}

export default createAndStoreOTP
