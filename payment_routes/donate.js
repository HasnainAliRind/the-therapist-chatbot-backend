import dotenv from "dotenv";
import Stripe from "stripe";

dotenv.config();
const stripe = Stripe(process.env.STRIPE_SECRET);

// checkout api

const donate = async (req, res) => {
    try {

        const { amount, user_email } = req.body;
        // Fixed amount for donation, $3 in cents (300 cents)
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "gbp",
                        product_data: {
                            name: "Donation to The Therapist & Chat Helpers",
                        },
                        unit_amount: amount * 100, // $3 in cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
            metadata: {
                user_email: user_email
            }
        });


        // Checking if the payment is confirmed
        const checkSessionStatus = async (sessionId) => {
            const session = await stripe.checkout.sessions.retrieve(sessionId);

            console.log(session);
            
            // Check if payment was successful
            if (session.payment_status === "paid") {
                return true
                // Perform post-payment actions like updating your database
            } else {
                return false
            }
        };
        
        setTimeout(() => checkSessionStatus(session.id), 2000);

        // Send the session ID back to the frontend to complete the checkout
        res.json({ status: true, id: session.id });

    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.json({ status: false, error: "Failed to create Stripe session" });
    }
};


export default donate