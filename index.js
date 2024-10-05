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

// Apply bodyParser.json() to all routes *except* /webhook
// app.use((req, res, next) => {
//   if (req.originalUrl === "/webhook") {
//     next(); // Skip the JSON parsing middleware for /webhook
//   } else {
//     bodyParser.json()(req, res, next);
//   }
// });


initWebRoutes(app);

// app.use(express.json());
// app.use(bodyParser.json());

app.listen(8081, () => {
    console.log("Backend is running at http://localhost:8081....");
});