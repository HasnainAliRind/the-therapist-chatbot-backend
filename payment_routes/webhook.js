import Stripe from 'stripe';
import bodyParser from 'body-parser';
import dotenv from "dotenv";
import getRawBody from "raw-body"
import connection from "../config/ConnectDB.js"

dotenv.config();



const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);



async function updateUserDonationStatus(userId, status) {

    if(userId){
        let update_user = "UPDATE users SET `isDonated` = ? WHERE `email` = ?";
        console.log(userId);
        
        connection.query(update_user, [1,userId], (error, result) => {
            if (error) return console.log(error); 
        })
    }
    console.log(`Updating user ${userId} isDonated status to ${status}`);
    return true;
}


// Middleware to handle raw body for Stripe
export const stripeWebhookHandler = async (req, res) => {
    const sig = req.headers['stripe-signature'];
    const endpointSecret = "whsec_683fc22d53ff8ef5d2e55858f3403bb8cca8b80b527365c5246b7b7bed3c18cd";
    
    
    let event; 
    
    try {
        event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
        console.error('Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle the checkout.session.completed event
    if (event.type == 'checkout.session.completed') {
        const session = event.data.object;

        // Get the user_id from the session's metadata
        const userId = session.metadata.user_email;
        console.log(session);
        
        // console.log(userId);
        
        // Update the user's isDonated status in your database
        try {
            await updateUserDonationStatus(userId, true); // DB logic
            // console.log(`User with ID ${userId} donation status updated successfully.`);
        } catch (dbError) {
            console.error('Error updating user donation status:', dbError);
        }
    }

    res.json({ received: true });
};