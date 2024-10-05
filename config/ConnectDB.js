import sql from "mysql";
import dotenv from "dotenv"

dotenv.config()

let connection = sql.createConnection({
    host: process.env.HOST,
    database: process.env.DATABASE,
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.DB_PORT
});

connection.connect((err, result) => {
    if (err) {
        console.log(err);
        
        return console.log("Error encountered while connecting with DB!")
    }
    return console.log("connected with DB!");
});

export default connection;

