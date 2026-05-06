import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Users,
  Briefcase,
  ArrowLeft,
  CheckCircle,
} from "lucide-react";

/* ========================================================= */
/* LOCAL CAR IMAGES */
/* ========================================================= */

import saloonCar from "../assets/cars/saloon_car.svg";
import executiveCar from "../assets/cars/executive_car.svg";
import estateCar from "../assets/cars/estate_car.svg";
import peopleCarrier from "../assets/cars/people_carrier.svg";
import executivePeopleCarrier from "../assets/cars/executive_people_carrier.svg";
import minibus8 from "../assets/cars/8_seater_minibus.svg";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

/* ========================================================= */
/* VEHICLE IMAGES */
/* ========================================================= */

const vehicleImages = {
  saloon: saloonCar,

  executive: executiveCar,

  estate: estateCar,

  peoplecarrier: peopleCarrier,

  executivepeoplecarrier: executivePeopleCarrier,

  minibus: minibus8,
};

/* ========================================================= */
/* VEHICLE DETAILS */
/* ========================================================= */

const vehicleDetails = [
  {
    key: "saloon",

    title: "Saloon Car",

    description:
      "Ford Mondeo, VW Passat or similar. These can accommodate up to 3 passengers plus 3 standard suitcases (23kg max), or 4 passengers plus hand luggage.",

    image: vehicleImages.saloon,
  },

  {
    key: "executive",

    title: "Executive Car",

    description:
      "Mercedes E-Class or similar. These can accommodate up to 3 passengers plus 3 standard suitcases (23kg max), or 4 passengers plus hand luggage.",

    image: vehicleImages.executive,
  },

  {
    key: "estate",

    title: "Estate Car",

    description:
      "Volvo Estate, VW Passat or similar. These can accommodate up to 4 passengers plus 4 standard suitcases (23kg max).",

    image: vehicleImages.estate,
  },

  {
    key: "peoplecarrier",

    title: "People Carrier",

    description:
      "VW Sharan, Ford Galaxy or similar. These can accommodate up to 5 passengers plus 5 standard suitcases (23kg max), or 6 passengers plus hand luggage.",

    image: vehicleImages.peoplecarrier,
  },

  {
    key: "executivepeoplecarrier",

    title: "Executive People Carrier",

    description:
      "Mercedes V-Class or similar. These can accommodate up to 5 passengers plus 5 standard suitcases (23kg max), or 6 passengers plus hand luggage.",

    image: vehicleImages.executivepeoplecarrier,
  },

  {
    key: "minibus",

    title: "8 Seater Minibus",

    description:
      "VW Transporter or similar. These can accommodate 8 passengers plus up to 8 standard suitcases (23kg max).",

    image: vehicleImages.minibus,
  },
];

/* ========================================================= */
/* GET VEHICLE IMAGE */
/* ========================================================= */

const getVehicleImage = (name = "") => {
  const lower = name.toLowerCase().replace(/\s/g, "");

  if (lower.includes("executivepeople")) {
    return vehicleImages.executivepeoplecarrier;
  }

  if (lower.includes("people")) {
    return vehicleImages.peoplecarrier;
  }

  if (lower.includes("executive")) {
    return vehicleImages.executive;
  }

  if (lower.includes("estate")) {
    return vehicleImages.estate;
  }

  if (lower.includes("minibus")) {
    return vehicleImages.minibus;
  }

  return vehicleImages.saloon;
};

const CarSelection = () => {
  const navigate = useNavigate();

  const [bookingData, setBookingData] = useState(null);

  const [availableCars, setAvailableCars] = useState([]);

  const [selectedCar, setSelectedCar] = useState(null);

  const [tripType, setTripType] = useState("ONE_WAY");

  const [loading, setLoading] = useState(true);

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

    setBookingData(booking);

    async function loadCars() {
      try {
        const res = await fetch(`${API_BASE}/api/cars/public`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            fromPlaceId: booking.fromPlaceId,
            toPlaceId: booking.toPlaceId,
          }),
        });

        const result = await res.json();

        const filtered = (result.cars || []).filter(
          (car) =>
            car.capacity?.passengers >= Number(booking.passengers) &&
            car.capacity?.luggage >= Number(booking.luggage)
        );

        setAvailableCars(filtered);
      } catch (err) {
        console.error("Failed to load cars", err);
      } finally {
        setLoading(false);
      }
    }

    loadCars();
  }, [navigate]);

  /* ========================================================= */
  /* SELECT */
  /* ========================================================= */

  const handleSelectOneWay = (car) => {
    setSelectedCar(car);

    setTripType("ONE_WAY");
  };

  const handleSelectReturn = (car) => {
    if (!car.supportsReturnTrip) return;

    setSelectedCar(car);

    setTripType("RETURN");
  };

  /* ========================================================= */
  /* CONTINUE */
  /* ========================================================= */

  const handleContinue = () => {
    if (!selectedCar) return;

    const totalFare =
      tripType === "RETURN"
        ? selectedCar.pricing.roundTripFare
        : selectedCar.pricing.oneWayFare;

    localStorage.setItem(
      "bookingData",
      JSON.stringify({
        ...bookingData,

        selectedCar,

        tripType,

        pricing: {
          ...selectedCar.pricing,

          totalFare,

          type: tripType,
        },
      })
    );

    navigate("/booking/info");
  };

  if (!bookingData || loading) return null;

  return (
    <div className="min-h-screen bg-surface-light py-6 md:py-10">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ========================================================= */}
        {/* HEADER */}
        {/* ========================================================= */}

        <div className="mb-8 md:mb-12">

          <button
            onClick={() => navigate("/")}
            className="inline-flex items-center text-primary-900 hover:text-accent-500 mb-5 text-sm font-semibold transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />

            Back
          </button>

          <h1 className="text-3xl md:text-5xl font-black text-primary-900 leading-tight">

            Select Your Vehicle
          </h1>

          <p className="text-gray-600 mt-3 text-lg">
            Choose from our premium fleet of airport transfer vehicles
          </p>
        </div>

        {/* ========================================================= */}
        {/* VEHICLES */}
        {/* ========================================================= */}

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-20">

          {availableCars.map((car) => {
            const {
              oneWayFare,
              roundTripFare,
              originalOneWayFare,
              originalRoundTripFare,
            } = car.pricing || {};

            const isSelected = selectedCar?._id === car._id;

            return (
              <div
                key={car._id}
                className={`relative bg-white rounded-[28px] border p-6 shadow-soft hover:shadow-premium transition-all duration-300 overflow-hidden ${isSelected
                  ? "border-primary-900 ring-2 ring-primary-900"
                  : "border-gray-100"
                  }`}
              >

                {isSelected && (
                  <div className="absolute top-4 right-4 bg-primary-900 text-white rounded-full px-3 py-1 text-xs font-semibold">

                    Selected
                  </div>
                )}

                {/* IMAGE */}
                <div className="flex justify-center items-center mb-6 min-h-[120px]">

                  <img
                    src={getVehicleImage(car.name)}
                    alt={car.name}
                    className="w-full max-w-[220px] h-[90px] md:h-[110px] object-contain"
                  />
                </div>

                {/* NAME */}
                <h3 className="text-2xl font-black text-primary-900 text-center mb-4">

                  {car.name}
                </h3>

                {/* CAPACITY */}
                <div className="flex items-center justify-center gap-8 text-gray-600 mb-5">

                  <div className="flex items-center gap-2">

                    <Users className="w-5 h-5 text-accent-500" />

                    <span className="font-semibold">
                      {car.capacity?.passengers ?? 0}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">

                    <Briefcase className="w-5 h-5 text-accent-500" />

                    <span className="font-semibold">
                      {car.capacity?.luggage ?? 0}
                    </span>
                  </div>
                </div>

                {/* FEATURES */}
                {car.features?.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-6">

                    {car.features.map((feature, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 rounded-full bg-primary-50 text-primary-900 text-xs font-semibold"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                )}

                {/* PRICE BUTTONS */}
                <div className="grid grid-cols-2 gap-3">

                  <button
                    onClick={() => handleSelectOneWay(car)}
                    className={`rounded-2xl p-4 border-2 transition-all duration-300 ${isSelected && tripType === "ONE_WAY"
                      ? "bg-primary-900 border-primary-900 text-white"
                      : "bg-primary-50 border-primary-100 hover:border-primary-900"
                      }`}
                  >

                    {originalOneWayFare && (
                      <div className="text-xs line-through opacity-70 mb-1">
                        £{originalOneWayFare}
                      </div>
                    )}

                    <div className="text-2xl font-black">
                      £{oneWayFare}
                    </div>

                    <div className="text-xs uppercase tracking-wide mt-1">
                      One Way
                    </div>
                  </button>

                  <button
                    disabled={!car.supportsReturnTrip}
                    onClick={() => handleSelectReturn(car)}
                    className={`rounded-2xl p-4 border-2 transition-all duration-300 ${!car.supportsReturnTrip
                      ? "bg-gray-100 border-gray-200 text-gray-400 cursor-not-allowed"
                      : isSelected && tripType === "RETURN"
                        ? "bg-accent-500 border-accent-500 text-primary-950"
                        : "bg-accent-50 border-accent-100 hover:border-accent-500"
                      }`}
                  >

                    {originalRoundTripFare && (
                      <div className="text-xs line-through opacity-70 mb-1">
                        £{originalRoundTripFare}
                      </div>
                    )}

                    <div className="text-2xl font-black">
                      {car.supportsReturnTrip
                        ? `£${roundTripFare}`
                        : "--"}
                    </div>

                    <div className="text-xs uppercase tracking-wide mt-1">
                      Return
                    </div>
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* ========================================================= */}
        {/* VEHICLE DETAILS */}
        {/* ========================================================= */}

        <div className="bg-white rounded-[32px] border border-gray-100 shadow-premium p-6 md:p-10 mb-28">

          <div className="mb-10">

            <h2 className="text-3xl md:text-4xl font-black text-primary-900 mb-4">

              Vehicle Information
            </h2>

            <p className="text-gray-600 text-lg">
              Vehicle examples and luggage/passenger capacities
            </p>
          </div>

          <div className="space-y-10">

            {vehicleDetails.map((vehicle, index) => (
              <div
                key={index}
                className="flex flex-col md:flex-row gap-6 md:gap-10 items-start border-b border-gray-100 pb-10 last:border-0 last:pb-0"
              >

                <div className="w-full md:w-[180px] flex justify-center shrink-0">

                  <img
                    src={vehicle.image}
                    alt={vehicle.title}
                    className="w-full max-w-[180px] h-[90px] object-contain"
                  />
                </div>

                <div>

                  <h3 className="text-2xl font-black text-primary-900 mb-3">

                    {vehicle.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed text-lg">

                    {vehicle.description}
                  </p>

                  <div className="flex items-center gap-2 mt-4 text-sm text-green-700 font-semibold">

                    <CheckCircle className="h-4 w-4" />

                    Suitable for airport transfers
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTINUE BAR */}
        {selectedCar && (
          <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 shadow-2xl p-4 z-50">

            <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">

              <div>

                <p className="text-sm text-gray-500 mb-1">
                  Selected Vehicle
                </p>

                <p className="text-lg md:text-2xl font-black text-primary-900">

                  {selectedCar.name} — £
                  {tripType === "RETURN"
                    ? selectedCar.pricing.roundTripFare
                    : selectedCar.pricing.oneWayFare}
                </p>

                <p className="text-sm text-gray-500 mt-1">
                  {tripType === "RETURN"
                    ? "Return Journey"
                    : "One Way Journey"}
                </p>
              </div>

              <button
                onClick={handleContinue}
                className="rounded-2xl bg-primary-900 hover:bg-primary-800 text-white font-bold px-8 py-4 transition-all duration-300 shadow-card hover:shadow-premium hover:-translate-y-1"
              >
                Continue
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarSelection;