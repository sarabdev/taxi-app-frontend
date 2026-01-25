import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, CreditCard, Lock, CheckCircle } from "lucide-react";
import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const Payment = () => {
  const navigate = useNavigate();
  const stripe = useStripe();
  const elements = useElements();

  const [bookingData, setBookingData] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const data = localStorage.getItem("bookingData");
    if (!data) {
      navigate("/");
      return;
    }

    const booking = JSON.parse(data);
    if (!booking.selectedCar || !booking.pricing?.totalFare) {
      navigate("/booking/cars");
      return;
    }

    setBookingData(booking);
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setProcessing(true);
    setError(null);

    try {
      /* 1️⃣ Create payment intent */
      const intentRes = await fetch(
        `${API_BASE}/api/payments/create-intent`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: bookingData.pricing.totalFare,
            currency: "gbp",
          }),
        }
      );

      const { clientSecret } = await intentRes.json();

      /* 2️⃣ Confirm card payment */
      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      if (result.error) {
        setError(result.error.message);
        setProcessing(false);
        return;
      }

      /* 3️⃣ Create booking AFTER payment success */
      if (result.paymentIntent.status === "succeeded") {
        await fetch(`${API_BASE}/api/bookings`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerName: bookingData.customerName,
            customerEmail: bookingData.customerEmail,
            customerPhone: bookingData.customerPhone,
            pickupLocation: bookingData.fromLocation,
            dropoffLocation: bookingData.toLocation,
            carId: bookingData.selectedCar._id,
            distanceMiles: bookingData.pricing.distanceMiles,
            isReturnTrip: bookingData.isReturnTrip,
          }),
        });

        setCompleted(true);

        setTimeout(() => {
          localStorage.removeItem("bookingData");
          navigate("/");
        }, 3000);
      }
    } catch (err) {
      setError("Payment failed. Please try again.");
    } finally {
      setProcessing(false);
    }
  };

  if (!bookingData) return null;

  /* ✅ Success Screen */
  if (completed) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="card text-center max-w-md">
          <CheckCircle className="h-14 w-14 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Booking Confirmed</h2>
          <p className="text-gray-600">
            Payment successful. Your booking is confirmed.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">

        {/* Header */}
        <button
          onClick={() => navigate("/booking/cars")}
          className="flex items-center text-primary-600 mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Payment */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold">Payment</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <Lock className="h-4 w-4 mr-1" />
                  Secure
                </div>
              </div>

              {/* Card option */}
              <div className="flex items-center gap-3 mb-4 border rounded-lg p-3 bg-gray-50">
                <CreditCard className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Credit / Debit Card</span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border rounded-md p-3">
                  <CardElement />
                </div>

                {error && (
                  <div className="text-sm text-red-600">{error}</div>
                )}

                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>£{bookingData.pricing.totalFare}</span>
                </div>

                <button
                  type="submit"
                  disabled={processing || !stripe}
                  className="btn-primary w-full"
                >
                  {processing
                    ? "Processing..."
                    : `Pay £${bookingData.pricing.totalFare}`}
                </button>

                <p className="text-xs text-gray-500 flex items-center">
                  <Lock className="h-3 w-3 mr-1" />
                  Payments handled by Stripe
                </p>
              </form>
            </div>
          </div>

          {/* Booking Summary */}
          <div className="lg:col-span-1">
            <div className="card sticky top-24">
              <h3 className="text-lg font-semibold mb-4">
                Booking Summary
              </h3>

              {/* <img
                src={bookingData.selectedCar.image}
                alt={bookingData.selectedCar.name}
                className="w-full h-40 object-cover rounded mb-4"
              /> */}

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Vehicle</span>
                  <span className="font-medium">
                    {bookingData.selectedCar.name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>From</span>
                  <span>{bookingData.fromLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span>To</span>
                  <span>{bookingData.toLocation}</span>
                </div>
                <div className="flex justify-between">
                  <span>Passengers</span>
                  <span>{bookingData.passengers}</span>
                </div>
                <div className="flex justify-between">
                  <span>Luggage</span>
                  <span>{bookingData.luggage}</span>
                </div>

                {bookingData.isReturnTrip && (
                  <div className="bg-primary-50 text-primary-700 text-xs px-2 py-1 rounded mt-2">
                    Round Trip Applied
                  </div>
                )}
              </div>

              <div className="border-t mt-4 pt-3 flex justify-between font-bold">
                <span>Total</span>
                <span className="text-primary-600">
                  £{bookingData.pricing.totalFare}
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Payment;
