import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  User,
  Mail,
  Smartphone,
  Briefcase,
  Plane,
  Calendar,
  Users,
  CheckCircle,
  Shield,
  ArrowLeft,
  BadgeCheck,
} from "lucide-react";

const initialForm = {
  fullName: "",
  email: "",
  mobile: "",
  passengers: 1,

  luggage: {
    largeBags23kg: 0,
    smallBags15kg: 0,
    extraLargeItemType: "none",
    extraLargeItemNote: "",
  },

  flight: {
    flightNumber: "",
    arrivingFrom: "",
    arrivalDateTime: "",
    meetAndGreet: false,
  },
};

const UserInfo = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);

  const [errors, setErrors] = useState({});

  const [bookingData, setBookingData] = useState(null);

  /* ========================================================= */
  /* LOAD */
  /* ========================================================= */

  useEffect(() => {
    const bookingDataRaw = localStorage.getItem("bookingData");

    if (!bookingDataRaw) {
      navigate("/booking");
      return;
    }

    const parsed = JSON.parse(bookingDataRaw);

    if (!parsed?.selectedCar) {
      navigate("/booking/cars");
      return;
    }

    setBookingData(parsed);

    if (parsed.user) {
      setForm(parsed.user);
    }
  }, [navigate]);

  /* ========================================================= */
  /* HELPERS */
  /* ========================================================= */

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (path, value) => {
    setForm((prev) => {
      const updated = { ...prev };

      let ref = updated;

      for (let i = 0; i < path.length - 1; i++) {
        ref = ref[path[i]];
      }

      ref[path[path.length - 1]] = value;

      return updated;
    });
  };

  const validate = () => {
    const err = {};

    if (!form.fullName.trim()) err.fullName = "Required";

    if (!form.mobile.trim()) err.mobile = "Required";

    if (!form.email.trim()) err.email = "Required";

    if (!form.flight.flightNumber.trim())
      err.flightNumber = "Required";

    if (!form.flight.arrivingFrom.trim())
      err.arrivingFrom = "Required";

    if (!form.flight.arrivalDateTime)
      err.arrivalDateTime = "Required";

    if (
      form.luggage.extraLargeItemType === "other" &&
      !form.luggage.extraLargeItemNote.trim()
    ) {
      err.extraLargeItemNote = "Please specify the item";
    }

    if (
      form.email &&
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
    ) {
      err.email = "Enter a valid email";
    }

    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const err = validate();

    setErrors(err);

    if (Object.keys(err).length) return;

    const existing = JSON.parse(
      localStorage.getItem("bookingData") || "{}"
    );

    localStorage.setItem(
      "bookingData",
      JSON.stringify({
        ...existing,
        user: form,
      })
    );

    navigate("/booking/payment");
  };

  const renderError = (field) =>
    errors[field] ? (
      <p className="text-sm text-red-600 mt-2">
        {errors[field]}
      </p>
    ) : null;

  const numberOptions = [0, 1, 2, 3, 4];

  if (!bookingData) return null;

  return (
    <div className="min-h-screen bg-surface-light py-6 md:py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <div className="mb-10">

          <button
            onClick={() => navigate("/booking/cars")}
            className="inline-flex items-center text-primary-900 hover:text-accent-500 mb-5 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />

            Back To Vehicle Selection
          </button>

          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

            <div>

              <div className="inline-flex items-center gap-2 rounded-full bg-primary-50 text-primary-900 px-4 py-2 text-sm font-semibold mb-5">

                <BadgeCheck className="h-4 w-4 text-accent-500" />

                Step 3 Of 4
              </div>

              <h1 className="text-4xl md:text-5xl font-black text-primary-900 leading-tight">

                Passenger Information
              </h1>

              <p className="text-gray-600 text-lg mt-4">
                Complete your booking details
              </p>
            </div>

            {/* Summary */}
            <div className="bg-white rounded-[28px] border border-gray-100 shadow-soft px-8 py-6 min-w-[300px]">

              <p className="text-sm text-gray-500 mb-2">
                Selected Vehicle
              </p>

              <h3 className="text-2xl font-black text-primary-900">

                {bookingData.selectedCar?.name}
              </h3>

              <p className="text-gray-500 mt-2">
                {bookingData.tripType === "RETURN"
                  ? "Return Journey"
                  : "One Way Journey"}
              </p>

              <div className="mt-4 text-3xl font-black text-accent-500">

                £{bookingData.pricing?.totalFare}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* MAIN GRID */}
        {/* ========================================================= */}

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

          {/* ========================================================= */}
          {/* FORM */}
          {/* ========================================================= */}

          <div className="xl:col-span-2">

            <form
              onSubmit={handleSubmit}
              className="bg-white rounded-[36px] border border-gray-100 shadow-premium overflow-hidden"
            >

              {/* ========================================================= */}
              {/* TOP HEADER */}
              {/* ========================================================= */}

              <div className="bg-primary-900 px-8 md:px-10 py-8">

                <h2 className="text-3xl font-black text-white">
                  Booking Information
                </h2>

                <p className="text-gray-300 mt-3 text-lg">
                  Passenger, luggage and flight details
                </p>
              </div>

              {/* ========================================================= */}
              {/* CONTENT */}
              {/* ========================================================= */}

              <div className="p-6 md:p-10">

                {/* ========================================================= */}
                {/* PASSENGER */}
                {/* ========================================================= */}

                <section>

                  {/* Section Header */}
                  <div className="flex items-center gap-4 mb-8">

                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-900 text-accent-400">

                      <User className="h-6 w-6" />
                    </div>

                    <div>

                      <h3 className="text-2xl font-black text-primary-900">
                        Passenger Details
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Main passenger information
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">

                    {/* Name */}
                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Full Name *
                      </label>

                      <div className="relative">

                        <User className="icon-left" />

                        <input
                          name="fullName"
                          value={form.fullName}
                          onChange={handleChange}
                          className="input-field pl-11 h-14 border-gray-200 focus:ring-primary-900"
                          placeholder="John Doe"
                        />
                      </div>

                      {renderError("fullName")}
                    </div>

                    {/* Mobile + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Mobile Number *
                        </label>

                        <div className="relative">

                          <Smartphone className="icon-left" />

                          <input
                            name="mobile"
                            value={form.mobile}
                            onChange={handleChange}
                            className="input-field pl-11 h-14 border-gray-200 focus:ring-primary-900"
                            placeholder="+44 7000 000000"
                          />
                        </div>

                        {renderError("mobile")}
                      </div>

                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Email Address *
                        </label>

                        <div className="relative">

                          <Mail className="icon-left" />

                          <input
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            className="input-field pl-11 h-14 border-gray-200 focus:ring-primary-900"
                            placeholder="you@example.com"
                          />
                        </div>

                        {renderError("email")}
                      </div>
                    </div>

                    {/* Passengers */}
                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Number Of Passengers
                      </label>

                      <div className="select-wrapper">

                        <select
                          className="select-field h-14 border-gray-200 focus:ring-primary-900"
                          value={form.passengers}
                          onChange={(e) =>
                            handleNestedChange(
                              ["passengers"],
                              Number(e.target.value)
                            )
                          }
                        >
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                            <option
                              key={n}
                              value={n}
                            >
                              {n}
                            </option>
                          ))}
                        </select>

                        <span className="select-icon">
                          ⌄
                        </span>
                      </div>
                    </div>
                  </div>
                </section>

                {/* DIVIDER */}
                <div className="my-12 border-t border-gray-100"></div>

                {/* ========================================================= */}
                {/* LUGGAGE */}
                {/* ========================================================= */}

                <section>

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8">

                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-900 text-accent-400">

                      <Briefcase className="h-6 w-6" />
                    </div>

                    <div>

                      <h3 className="text-2xl font-black text-primary-900">
                        Luggage Information
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Help us prepare the right vehicle
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Large */}
                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Large Bags (23kg)
                        </label>

                        <div className="select-wrapper">

                          <select
                            className="select-field h-14 border-gray-200 focus:ring-primary-900"
                            value={form.luggage.largeBags23kg}
                            onChange={(e) =>
                              handleNestedChange(
                                ["luggage", "largeBags23kg"],
                                Number(e.target.value)
                              )
                            }
                          >
                            {numberOptions.map((n) => (
                              <option
                                key={n}
                                value={n}
                              >
                                {n}
                              </option>
                            ))}
                          </select>

                          <span className="select-icon">
                            ⌄
                          </span>
                        </div>
                      </div>

                      {/* Small */}
                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Small Bags (15kg)
                        </label>

                        <div className="select-wrapper">

                          <select
                            className="select-field h-14 border-gray-200 focus:ring-primary-900"
                            value={form.luggage.smallBags15kg}
                            onChange={(e) =>
                              handleNestedChange(
                                ["luggage", "smallBags15kg"],
                                Number(e.target.value)
                              )
                            }
                          >
                            {numberOptions.map((n) => (
                              <option
                                key={n}
                                value={n}
                              >
                                {n}
                              </option>
                            ))}
                          </select>

                          <span className="select-icon">
                            ⌄
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Extra */}
                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Extra Large Item
                      </label>

                      <div className="select-wrapper">

                        <select
                          className="select-field h-14 border-gray-200 focus:ring-primary-900"
                          value={form.luggage.extraLargeItemType}
                          onChange={(e) =>
                            handleNestedChange(
                              ["luggage", "extraLargeItemType"],
                              e.target.value
                            )
                          }
                        >
                          <option value="none">
                            None
                          </option>

                          <option value="extra_large_bag_35kg">
                            Extra Large Bag (35kg)
                          </option>

                          <option value="wheelchair">
                            Wheelchair
                          </option>

                          <option value="pram">
                            Pram
                          </option>

                          <option value="golf_bag">
                            Golf Bag
                          </option>

                          <option value="other">
                            Other
                          </option>
                        </select>

                        <span className="select-icon">
                          ⌄
                        </span>
                      </div>

                      {form.luggage.extraLargeItemType ===
                        "other" && (
                          <div className="mt-4">

                            <input
                              className="input-field h-14 border-gray-200 focus:ring-primary-900"
                              placeholder="Please specify"
                              value={
                                form.luggage.extraLargeItemNote
                              }
                              onChange={(e) =>
                                handleNestedChange(
                                  [
                                    "luggage",
                                    "extraLargeItemNote",
                                  ],
                                  e.target.value
                                )
                              }
                            />

                            {renderError(
                              "extraLargeItemNote"
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </section>

                {/* DIVIDER */}
                <div className="my-12 border-t border-gray-100"></div>

                {/* ========================================================= */}
                {/* FLIGHT */}
                {/* ========================================================= */}

                <section>

                  {/* Header */}
                  <div className="flex items-center gap-4 mb-8">

                    <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-primary-900 text-accent-400">

                      <Plane className="h-6 w-6" />
                    </div>

                    <div>

                      <h3 className="text-2xl font-black text-primary-900">
                        Flight Information
                      </h3>

                      <p className="text-gray-500 mt-1">
                        Arrival and airport details
                      </p>
                    </div>
                  </div>

                  <div className="space-y-6">

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                      {/* Flight */}
                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Flight Number *
                        </label>

                        <input
                          className="input-field h-14 border-gray-200 focus:ring-primary-900"
                          value={form.flight.flightNumber}
                          onChange={(e) =>
                            handleNestedChange(
                              ["flight", "flightNumber"],
                              e.target.value
                            )
                          }
                        />

                        {renderError("flightNumber")}
                      </div>

                      {/* From */}
                      <div>

                        <label className="block text-sm font-semibold text-gray-700 mb-3">
                          Arriving From *
                        </label>

                        <input
                          className="input-field h-14 border-gray-200 focus:ring-primary-900"
                          value={form.flight.arrivingFrom}
                          onChange={(e) =>
                            handleNestedChange(
                              ["flight", "arrivingFrom"],
                              e.target.value
                            )
                          }
                        />

                        {renderError("arrivingFrom")}
                      </div>
                    </div>

                    {/* Date */}
                    <div>

                      <label className="block text-sm font-semibold text-gray-700 mb-3">
                        Arrival Date & Time *
                      </label>

                      <input
                        type="datetime-local"
                        className="input-field h-14 border-gray-200 focus:ring-primary-900"
                        value={form.flight.arrivalDateTime}
                        onChange={(e) =>
                          handleNestedChange(
                            ["flight", "arrivalDateTime"],
                            e.target.value
                          )
                        }
                      />

                      {renderError("arrivalDateTime")}
                    </div>

                    {/* Meet */}
                    <div className="rounded-2xl border border-primary-100 bg-primary-50 p-5">

                      <label className="flex items-start gap-4 cursor-pointer">

                        <input
                          type="checkbox"
                          className="mt-1 h-5 w-5 rounded border-gray-300 text-primary-900 focus:ring-primary-900"
                          checked={form.flight.meetAndGreet}
                          onChange={(e) =>
                            handleNestedChange(
                              ["flight", "meetAndGreet"],
                              e.target.checked
                            )
                          }
                        />

                        <div>

                          <div className="font-bold text-primary-900">
                            Meet & Greet Service
                          </div>

                          <p className="text-gray-600 text-sm mt-1">
                            Driver will meet you inside the
                            airport arrivals terminal.
                          </p>
                        </div>
                      </label>
                    </div>
                  </div>
                </section>

                {/* BUTTON */}
                <div className="pt-12">

                  <button className="w-full rounded-2xl bg-primary-900 hover:bg-primary-800 text-white font-bold py-5 px-8 transition-all duration-300 shadow-card hover:shadow-premium hover:-translate-y-1">

                    Continue To Payment
                  </button>
                </div>
              </div>
            </form>
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

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      Vehicle
                    </p>

                    <p className="font-bold text-primary-900">
                      {bookingData.selectedCar?.name}
                    </p>
                  </div>

                  <Users className="h-5 w-5 text-accent-500" />
                </div>

                <div className="border-t border-gray-100"></div>

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      Journey Type
                    </p>

                    <p className="font-bold text-primary-900">
                      {bookingData.tripType === "RETURN"
                        ? "Return Journey"
                        : "One Way"}
                    </p>
                  </div>

                  <Plane className="h-5 w-5 text-accent-500" />
                </div>

                <div className="border-t border-gray-100"></div>

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-sm text-gray-500 mb-1">
                      Total Fare
                    </p>

                    <div className="text-4xl font-black text-accent-500">

                      £{bookingData.pricing?.totalFare}
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust */}
              <div className="mt-10 rounded-2xl bg-primary-50 border border-primary-100 p-6">

                <div className="flex items-center gap-3 mb-4">

                  <Shield className="h-6 w-6 text-accent-500" />

                  <h4 className="font-bold text-primary-900">
                    Safe & Secure Booking
                  </h4>
                </div>

                <div className="space-y-3">

                  {[
                    "Professional licensed chauffeurs",
                    "Secure payment processing",
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

export default UserInfo;