import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Info,
  User,
  Mail,
  Smartphone,
  Briefcase,
  Plane,
  Calendar,
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

  /* ───────────────────── Guards & Restore ───────────────────── */
  useEffect(() => {
    const bookingDataRaw = localStorage.getItem("bookingData");
    if (!bookingDataRaw) {
      navigate("/booking");
      return;
    }

    const bookingData = JSON.parse(bookingDataRaw);
    if (!bookingData?.selectedCar) {
      navigate("/booking/cars");
      return;
    }

    if (bookingData.user) {
      setForm(bookingData.user);
    }
  }, [navigate]);

  /* ───────────────────── Helpers ───────────────────── */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
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
    if (!form.flight.flightNumber.trim()) err.flightNumber = "Required";
    if (!form.flight.arrivingFrom.trim()) err.arrivingFrom = "Required";
    if (!form.flight.arrivalDateTime) err.arrivalDateTime = "Required";

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

    const bookingData = JSON.parse(
      localStorage.getItem("bookingData") || "{}"
    );

    localStorage.setItem(
      "bookingData",
      JSON.stringify({ ...bookingData, user: form })
    );

    navigate("/booking/payment");
  };

  const renderError = (field) =>
    errors[field] ? (
      <p className="text-xs text-red-600 mt-1">{errors[field]}</p>
    ) : null;

  const numberOptions = [0, 1, 2, 3, 4];

  /* ───────────────────── UI ───────────────────── */
  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <div className="flex items-center gap-2 text-primary-600 font-semibold uppercase text-sm">
            <Info className="h-4 w-4" /> Step 3 of 4
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold mt-2">
            Passenger Information
          </h1>
        </div>

        <form className="card space-y-10" onSubmit={handleSubmit}>
          {/* ───────────────── Passenger Details ───────────────── */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Passenger Details</h2>

            {/* Full name */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Full Name *
              </label>
              <div className="relative">
                <User className="icon-left" />
                <input
                  name="fullName"
                  value={form.fullName}
                  onChange={handleChange}
                  className="input-field pl-11"
                  placeholder="John Doe"
                />
              </div>
              {renderError("fullName")}
            </div>

            {/* Mobile + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Mobile *
                </label>
                <div className="relative">
                  <Smartphone className="icon-left" />
                  <input
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    className="input-field pl-11"
                    placeholder="+44 7000 000000"
                  />
                </div>
                {renderError("mobile")}
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="icon-left" />
                  <input
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    className="input-field pl-11"
                    placeholder="you@example.com"
                  />
                </div>
                {renderError("email")}
              </div>
            </div>

            {/* Passengers */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Passengers
              </label>
              <div className="select-wrapper">
                <select
                  className="select-field"
                  value={form.passengers}
                  onChange={(e) =>
                    handleNestedChange(["passengers"], Number(e.target.value))
                  }
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
                <span className="select-icon">⌄</span>
              </div>
            </div>
          </section>

          {/* ───────────────── Luggage ───────────────── */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Luggage</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Large bag */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Large bag (up to 23kg)
                </label>
                <div className="select-wrapper">
                  <select
                    className="select-field"
                    value={form.luggage.largeBags23kg}
                    onChange={(e) =>
                      handleNestedChange(
                        ["luggage", "largeBags23kg"],
                        Number(e.target.value)
                      )
                    }
                  >
                    {numberOptions.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <span className="select-icon">⌄</span>
                </div>
              </div>

              {/* Small bag */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Shoulder bag / trolley (up to 15kg)
                </label>
                <div className="select-wrapper">
                  <select
                    className="select-field"
                    value={form.luggage.smallBags15kg}
                    onChange={(e) =>
                      handleNestedChange(
                        ["luggage", "smallBags15kg"],
                        Number(e.target.value)
                      )
                    }
                  >
                    {numberOptions.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <span className="select-icon">⌄</span>
                </div>
              </div>
            </div>

            {/* Extra large item */}
            <div>
              <label className="block text-sm font-medium mb-1">
                Extra large item
              </label>
              <div className="select-wrapper">
                <select
                  className="select-field"
                  value={form.luggage.extraLargeItemType}
                  onChange={(e) =>
                    handleNestedChange(
                      ["luggage", "extraLargeItemType"],
                      e.target.value
                    )
                  }
                >
                  <option value="none">None</option>
                  <option value="extra_large_bag_35kg">Extra large bag (35kg)</option>
                  <option value="wheelchair">Wheelchair</option>
                  <option value="pram">Pram</option>
                  <option value="golf_bag">Golf bag</option>
                  <option value="other">Other</option>
                </select>
                <span className="select-icon">⌄</span>
              </div>

              {form.luggage.extraLargeItemType === "other" && (
                <div className="mt-3">
                  <input
                    className="input-field"
                    placeholder="Please specify"
                    value={form.luggage.extraLargeItemNote}
                    onChange={(e) =>
                      handleNestedChange(
                        ["luggage", "extraLargeItemNote"],
                        e.target.value
                      )
                    }
                  />
                  {renderError("extraLargeItemNote")}
                </div>
              )}
            </div>
          </section>

          {/* ───────────────── Flight Info ───────────────── */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold">Flight Information</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Flight Number *
                </label>
                <input
                  className="input-field"
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

              <div>
                <label className="block text-sm font-medium mb-1">
                  Arriving From *
                </label>
                <input
                  className="input-field"
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

            <div>
              <label className="block text-sm font-medium mb-1">
                Arrival Date & Time *
              </label>
              <input
                type="datetime-local"
                className="input-field"
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

            <label className="flex items-center gap-2 text-sm font-medium">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={form.flight.meetAndGreet}
                onChange={(e) =>
                  handleNestedChange(
                    ["flight", "meetAndGreet"],
                    e.target.checked
                  )
                }
              />
              Meet & Greet Services
            </label>
          </section>

          {/* Submit */}
          <button className="btn-primary w-full sm:w-auto px-8 py-3 text-base font-semibold">
            Continue to Payment
          </button>
        </form>
      </div>
    </div>
  );

};

export default UserInfo;
