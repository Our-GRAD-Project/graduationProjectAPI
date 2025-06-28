import Stripe from 'stripe';
import dotenv from 'dotenv'

dotenv.config()

export const stripe = new Stripe(process.env.OP_SECRET);