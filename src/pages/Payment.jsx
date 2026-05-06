import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  ArrowLeft,
  CreditCard,
  Lock,
  CheckCircle,
  Shield,
  BadgeCheck,
  Plane,
  Users,
  Briefcase,
} from "lucide-react";

import {
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

const API_BASE =
  import.meta.env.VITE_API_BASE || "http://localhost:5000";

const Payment = () => {
  const navigate = useNavigate();

  const stripe = useStripe();

  const elements = useElements();

  const [bookingData, setBookingData] = useState(null);

  const [processing, setProcessing] = useState(false);

  const [completed, setCompleted] = useState(false);

  const [error, setError] = useState(null);

  /* ========================================================= */
  /* LOAD */
  /* ========================================================= */

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

  /* ========================================================= */
  /* SUBMIT */
  /* ========================================================= */

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

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            amount: bookingData.pricing.totalFare,
            currency: "gbp",
          }),
        }
      );

      const { clientSecret } = await intentRes.json();

      /* 2️⃣ Confirm card payment */
      const result = await stripe.confirmCardPayment(
        clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement),
          },
        }
      );

      if (result.error) {
        setError(result.error.message);

        setProcessing(false);

        return;
      }

      /* 3️⃣ Create booking AFTER payment success */
      if (result.paymentIntent.status === "succeeded") {
        await fetch(`${API_BASE}/api/bookings`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            customerName: bookingData.user.fullName,
            customerEmail: bookingData.user.email,
            customerPhone: bookingData.user.mobile,

            pickupLocation: bookingData.fromLocation,
            dropoffLocation: bookingData.toLocation,

            carId: bookingData.selectedCar._id,
            distanceMiles:
              bookingData.pricing.distanceMiles,

            isReturnTrip:
              bookingData.isReturnTrip,

            couponCode:
              bookingData.pricing?.appliedCoupon ||
              null,

            passengers:
              bookingData.user.passengers,

            luggage: {
              largeBags23kg:
                bookingData.user.luggage
                  .largeBags23kg,

              smallBags15kg:
                bookingData.user.luggage
                  .smallBags15kg,

              extraLargeItemType:
                bookingData.user.luggage
                  .extraLargeItemType,

              extraLargeItemNote:
                bookingData.user.luggage
                  .extraLargeItemNote || "",
            },

            flight: {
              flightNumber:
                bookingData.user.flight
                  .flightNumber,

              arrivingFrom:
                bookingData.user.flight
                  .arrivingFrom,

              arrivalDateTime:
                bookingData.user.flight
                  .arrivalDateTime,

              meetAndGreet:
                bookingData.user.flight
                  .meetAndGreet,
            },
          }),
        });

        setCompleted(true);

        setTimeout(() => {
          localStorage.removeItem("bookingData");

          navigate("/");
        }, 3000);
      }
    } catch (err) {
      setError(
        "Payment failed. Please try again."
      );
    } finally {
      setProcessing(false);
    }
  };

  if (!bookingData) return null;

  /* ========================================================= */
  /* SUCCESS */
  /* ========================================================= */

  if (completed) {
    return (
      <div className="min-h-screen bg-surface-light flex items-center justify-center px-4">

        <div className="bg-white rounded-[36px] border border-gray-100 shadow-premium p-12 max-w-lg w-full text-center">

          <div className="flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mx-auto mb-8">

            <CheckCircle className="h-14 w-14 text-green-600" />
          </div>

          <h2 className="text-4xl font-black text-primary-900 mb-5">

            Booking Confirmed
          </h2>

          <p className="text-gray-600 text-lg leading-relaxed">

            Payment completed successfully.
            Your airport transfer has been booked.
          </p>

          <div className="mt-10 inline-flex items-center gap-2 rounded-full bg-green-50 border border-green-200 px-5 py-3 text-green-700 font-semibold">

            <BadgeCheck className="h-5 w-5" />

            Redirecting shortly...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface-light py-6 md:py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <div className="mb-10">

          <button
            onClick={() => navigate("/booking/info")}
            className="inline-flex items-center text-primary-900 hover:text-accent-500 mb-5 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />

            Back To Passenger Information
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-900 px-4 py-2 text-sm font-semibold mb-5">

                <BadgeCheck className="h-4 w-4 text-accent-500" />

                Final Step
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-primary-900 leading-tight">

                Secure Payment
              </h1>

              <p className="text-gray-600 text-lg mt-4">
                Complete your booking securely with Stripe
              </p>
            </div>

            {/* Total Card */}
            <div className="bg-white rounded-[28px] border border-gray-100 shadow-soft px-8 py-6 min-w-[300px]">

              <p className="text-sm text-gray-500 mb-2">
                Total Amount
              </p>

              <div className="text-5xl font-black text-accent-500">

                £{bookingData.pricing.totalFare}
              </div>

              <p className="text-gray-500 mt-2">
                Secure encrypted payment
              </p>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* GRID */}
        {/* ========================================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* ========================================================= */}
          {/* PAYMENT */}
          {/* ========================================================= */}

          <div className="xl:col-span-2">

            <div className="bg-white rounded-[36px] border border-gray-100 shadow-premium overflow-hidden">

              {/* Header */}
              <div className="bg-primary-900 px-8 md:px-10 py-8">

                <div className="flex items-center justify-between gap-6">

                  <div>

                    <h2 className="text-3xl font-black text-white">

                      Payment Details
                    </h2>

                    <p className="text-gray-300 mt-3 text-lg">
                      Your payment is fully secured
                    </p>
                  </div>

                  <div className="hidden md:flex items-center gap-2 rounded-full bg-white/10 border border-white/10 px-4 py-2 text-white text-sm font-semibold">

                    <Lock className="h-4 w-4 text-accent-400" />

                    SSL Protected
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 md:p-10">

                {/* Card Option */}
                <div className="rounded-[28px] border border-gray-100 bg-primary-50 p-6 mb-8">

                  <div className="flex items-center gap-4">

                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-900 text-accent-400">

                      <CreditCard className="h-6 w-6" />
                    </div>

                    <div>

                      <h3 className="text-xl font-bold text-primary-900">

                        Credit / Debit Card
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Visa, Mastercard, American Express
                      </p>
                    </div>
                  </div>
                </div>

                {/* FORM */}
                <form
                  onSubmit={handleSubmit}
                  className="space-y-8"
                >

                  {/* Stripe */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-4">
                      Card Details
                    </label>

                    <div className="rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                      <div className="px-5 py-5">
                        <CardElement
                          options={{
                            hidePostalCode: true,

                            style: {
                              base: {
                                fontSize: "16px",
                                color: "#111827",
                                fontFamily: "Inter, sans-serif",

                                "::placeholder": {
                                  color: "#9ca3af",
                                },
                              },

                              invalid: {
                                color: "#dc2626",
                              },
                            },
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-red-700">

                      {error}
                    </div>
                  )}

                  {/* Total */}
                  <div className="rounded-[28px] border border-gray-100 bg-gray-50 p-6">

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-gray-500 mb-2">
                          Total Amount
                        </p>

                        <div className="text-4xl font-black text-primary-900">

                          £
                          {
                            bookingData.pricing
                              .totalFare
                          }
                        </div>
                      </div>

                      <Shield className="h-10 w-10 text-accent-500" />
                    </div>
                  </div>

                  {/* Button */}
                  <button
                    type="submit"
                    disabled={
                      processing || !stripe
                    }
                    className="w-full rounded-2xl bg-primary-900 hover:bg-primary-800 text-white font-bold py-5 px-8 transition-all duration-300 shadow-card hover:shadow-premium hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {processing
                      ? "Processing Payment..."
                      : `Pay £${bookingData.pricing.totalFare}`}
                  </button>

                  {/* Stripe */}
                  <div className="flex items-center justify-center gap-2 text-sm text-gray-500">

                    <Lock className="h-4 w-4" />

                    Payments securely processed by Stripe
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* ========================================================= */}
          {/* SIDEBAR */}
          {/* ========================================================= */}

          <div>

            <div className="sticky top-28 bg-white rounded-[32px] border border-gray-100 shadow-soft p-8">

              <h3 className="text-2xl font-black text-primary-900 mb-8">

                Booking Summary
              </h3>

              <div className="space-y-6">

                {/* Vehicle */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      Vehicle
                    </p>

                    <p className="font-bold text-primary-900">
                      {
                        bookingData.selectedCar
                          .name
                      }
                    </p>
                  </div>

                  <Users className="h-5 w-5 text-accent-500" />
                </div>

                <div className="border-t border-gray-100"></div>

                {/* From */}
                <div>

                  <p className="text-sm text-gray-500 mb-2">
                    Pickup
                  </p>

                  <p className="font-semibold text-primary-900 leading-relaxed">
                    {bookingData.fromLocation}
                  </p>
                </div>

                <div className="border-t border-gray-100"></div>

                {/* To */}
                <div>

                  <p className="text-sm text-gray-500 mb-2">
                    Destination
                  </p>

                  <p className="font-semibold text-primary-900 leading-relaxed">
                    {bookingData.toLocation}
                  </p>
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Journey */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      Journey Type
                    </p>

                    <p className="font-bold text-primary-900">
                      {bookingData.tripType ===
                        "RETURN"
                        ? "Return Journey"
                        : "One Way"}
                    </p>
                  </div>

                  <Plane className="h-5 w-5 text-accent-500" />
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Passengers */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      Passengers
                    </p>

                    <p className="font-bold text-primary-900">
                      {
                        bookingData.user
                          .passengers
                      }
                    </p>
                  </div>

                  <Users className="h-5 w-5 text-accent-500" />
                </div>

                <div className="border-t border-gray-100"></div>

                {/* Luggage */}
                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      Luggage
                    </p>

                    <p className="font-bold text-primary-900">
                      {bookingData.user
                        .luggage
                        .largeBags23kg +
                        bookingData.user
                          .luggage
                          .smallBags15kg}
                    </p>
                  </div>

                  <Briefcase className="h-5 w-5 text-accent-500" />
                </div>

                {/* Total */}
                <div className="border-t border-gray-100 pt-6">

                  <div className="flex items-center justify-between">

                    <div>

                      <p className="text-sm text-gray-500 mb-2">
                        Total Fare
                      </p>

                      <div className="text-4xl font-black text-accent-500">

                        £
                        {
                          bookingData.pricing
                            .totalFare
                        }
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust */}
              <div className="mt-10 rounded-2xl bg-primary-50 border border-primary-100 p-6">

                <div className="flex items-center gap-3 mb-4">

                  <Shield className="h-6 w-6 text-accent-500" />

                  <h4 className="font-bold text-primary-900">
                    Secure Checkout
                  </h4>
                </div>

                <div className="space-y-3">

                  {[
                    "256-bit SSL encryption",
                    "Secure Stripe payments",
                    "No card data stored",
                    "24/7 customer support",
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start gap-3"
                    >

                      <CheckCircle className="h-4 w-4 text-green-600 shrink-0 mt-0.5" />

                      <span className="text-sm text-gray-700">
                        {item}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;