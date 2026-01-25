import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Users, Briefcase, ArrowLeft, Car } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5000";

const CarSelection = () => {
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState(null);
  const [availableCars, setAvailableCars] = useState([]);
  const [selectedCar, setSelectedCar] = useState(null);
  const [tripType, setTripType] = useState("ONE_WAY"); // ✅ DEFAULT
  const [loading, setLoading] = useState(true);

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
          headers: { "Content-Type": "application/json" },
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

  const handleSelectOneWay = (car) => {
    setSelectedCar(car);
    setTripType("ONE_WAY");
  };

  const handleSelectReturn = (car) => {
    if (!car.supportsReturnTrip) return;
    setSelectedCar(car);
    setTripType("RETURN");
  };

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
          totalFare, // 🔐 LOCKED PRICE
          type: tripType,
        },
      })
    );

    navigate("/booking/info");
  };

  if (!bookingData || loading) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-5 md:py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-5 md:mb-8">
          <button
            onClick={() => navigate("/")}
            className="flex items-center text-primary-600 hover:text-primary-700 mb-2 text-sm"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </button>
          <h1 className="text-xl md:text-4xl font-bold text-gray-900">
            Select Your Vehicle
          </h1>
          <p className="text-gray-600 text-xs md:text-base">
            Choose from our premium fleet
          </p>
        </div>

        {/* Cars */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-6 mb-24">
          {availableCars.map((car) => {
            const {
              oneWayFare,
              roundTripFare,
              originalOneWayFare,
              originalRoundTripFare,
            } = car.pricing || {};

            return (
              <div
                key={car._id}
                className={`card border shadow-sm p-2 md:p-5 transition-all ${selectedCar?._id === car._id
                    ? "ring-3 ring-primary-500"
                    : ""
                  }`}
              >
                {/* Icon */}
                <div className="mx-auto bg-white border w-9 h-9 md:w-16 md:h-16 rounded-full flex items-center justify-center mb-2">
                  <Car size={16} className="md:w-8 md:h-8 text-gray-600" />
                </div>

                {/* Name */}
                <div className="font-semibold text-[11px] md:text-lg truncate text-center">
                  {car.name}
                </div>

                {/* Capacity */}
                <div className="flex items-center justify-center gap-3 text-[10px] md:text-sm text-gray-600 mt-1">
                  <span className="flex items-center gap-1">
                    <Users className="w-3 h-3" />
                    {car.capacity?.passengers ?? 0}
                  </span>
                  <span className="flex items-center gap-1">
                    <Briefcase className="w-3 h-3" />
                    {car.capacity?.luggage ?? 0}
                  </span>
                </div>

                {/* Features */}
                {car.features?.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-1 mt-2">
                    {car.features.map((f, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 text-[9px] md:text-xs rounded-full bg-gray-100 text-gray-700"
                      >
                        {f}
                      </span>
                    ))}
                  </div>
                )}

                {/* Prices */}
                <div className="flex gap-1.5 mt-3">
                  {/* ONE WAY */}
                  <button
                    onClick={() => handleSelectOneWay(car)}
                    className={`relative flex-1 flex flex-col items-center justify-center 
          py-1 md:py-2 rounded-md border-2 bg-blue-600 text-white
          ${selectedCar?._id === car._id && tripType === "ONE_WAY"
                        ? "ring-2 ring-blue-400"
                        : ""
                      }`}
                  >
                    {originalOneWayFare && (
                      <span className="text-[8px] line-through opacity-70">
                        £{originalOneWayFare}
                      </span>
                    )}
                    <span className="text-xs md:text-lg font-bold">
                      £{oneWayFare}
                    </span>
                    <span className="text-[8px] uppercase">One Way</span>
                  </button>

                  {/* RETURN */}
                  <button
                    disabled={!car.supportsReturnTrip}
                    onClick={() => handleSelectReturn(car)}
                    className={`relative flex-1 flex flex-col items-center justify-center 
          py-1 md:py-2 rounded-md border-2
          ${car.supportsReturnTrip
                        ? "bg-yellow-400 text-gray-900"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      }
          ${selectedCar?._id === car._id && tripType === "RETURN"
                        ? "ring-2 ring-yellow-500"
                        : ""
                      }`}
                  >
                    {originalRoundTripFare && (
                      <span className="text-[8px] line-through opacity-70">
                        £{originalRoundTripFare}
                      </span>
                    )}
                    <span className="text-xs md:text-lg font-bold">
                      {car.supportsReturnTrip ? `£${roundTripFare}` : "--"}
                    </span>
                    <span className="text-[8px] uppercase">Return</span>
                  </button>
                </div>
              </div>
            );
          })}

        </div>

        {/* Continue */}
        {selectedCar && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-3 z-50">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-600">Selected</p>
                <p className="text-sm md:text-lg font-bold">
                  {selectedCar.name} – £
                  {tripType === "RETURN"
                    ? selectedCar.pricing.roundTripFare
                    : selectedCar.pricing.oneWayFare}
                </p>
              </div>
              <button onClick={handleContinue} className="btn-primary text-sm">
                Next
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default CarSelection;
