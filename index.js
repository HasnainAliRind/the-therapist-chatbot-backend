import bodyParser from "body-parser";
import express from "express";
import initWebRoutes from "./routes/web.js";
import cors from "cors";
import connection from "./config/ConnectDB.js";


let app = express();

// dotenv.config()


app.use(cors());

app.use((req, res, next) => {
    if (req.originalUrl === "/webhook") {
        next(); // Skip the JSON parsing middleware for /webhook route
    } else {
        express.json()(req, res, next); // Use express.json() for other routes
    }
}); // General JSON parsing middleware

initWebRoutes(app);


// Function to delete expired OTPs from the database
const deleteExpiredOTPs = () => {
    const currentTime = new Date();  // Get the current time
    connection.query(
        'DELETE FROM otp_table WHERE expires_at < ?',
        [currentTime],
        (err, results) => {
            if (err) {
                console.error('Error deleting expired OTPs:', err);
            } else {
                console.log(`Deleted ${results.affectedRows} expired OTPs.`);
            }
        }
    );
}

// Schedule the deleteExpiredOTPs function to run every 5 minutes
setInterval(deleteExpiredOTPs, 5 * 60 * 1000);  // 5 minutes in milliseconds


app.listen(8082, () => {
    console.log("Backend is running at http://localhost:8081....");
});
