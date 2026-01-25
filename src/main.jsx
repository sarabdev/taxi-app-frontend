import { StrictMode } from 'react'
import { Elements } from "@stripe/react-stripe-js";

import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { loadStripe } from "@stripe/stripe-js";
const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);
createRoot(document.getElementById('root')).render(
  <Elements stripe={stripePromise}>
    <App />
  </Elements>
)
