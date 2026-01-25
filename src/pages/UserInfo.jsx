import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Phone, Smartphone, MapPin, Building2, Info, User } from "lucide-react";

const initialForm = {
  firstName: "",
  lastName: "",
  email: "",
  telephone: "",
  mobile: "",
  emergency: "",
  address1: "",
  address2: "",
  city: "",
  postcode: "",
  country: "United Kingdom",
  state: "",
};

const requiredFields = {
  firstName: "First Name",
  lastName: "Last Name",
  email: "E-Mail Address",
  address1: "Billing Address, Line 1",
  city: "City",
  postcode: "Postcode",
};

const countries = ["United Kingdom", "United States", "France", "Germany", "India", "United Arab Emirates"];

const UserInfo = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

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
      setForm((prev) => ({ ...prev, ...bookingData.user }));
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const err = {};
    Object.keys(requiredFields).forEach((field) => {
      if (!form[field]?.trim()) {
        err[field] = "Required";
      }
    });
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      err.email = "Enter a valid email";
    }
    return err;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    setErrors(err);
    if (Object.keys(err).length) return;

    const bookingData = JSON.parse(localStorage.getItem("bookingData") || "{}");
    localStorage.setItem("bookingData", JSON.stringify({ ...bookingData, user: form }));
    navigate("/booking/payment");
  };

  const renderError = (field) =>
    errors[field] ? <p className="text-xs text-red-600 mt-1">{errors[field]}</p> : null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <div className="flex items-center gap-2 text-primary-600 font-semibold uppercase tracking-wide text-sm">
            <Info className="h-4 w-4" /> Step 3 of 4
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2">Passenger Information</h1>
          <p className="text-gray-600 mt-3 max-w-2xl">
            We use these details to confirm your booking and keep you updated about your ride. Please double-check that everything is accurate.
          </p>
        </div>

        <form className="card space-y-8" onSubmit={handleSubmit}>
          {/* Personal Details */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Personal Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`input-field pl-11 ${errors.firstName ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                  />
                </div>
                {renderError('firstName')}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={`input-field pl-11 ${errors.lastName ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                  />
                </div>
                {renderError('lastName')}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                E-mail Address <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className={`input-field pl-11 ${errors.email ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                />
              </div>
              {renderError('email')}
            </div>
          </section>

          {/* Contact Details */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Contact Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Telephone Number</label>
                <div className="relative mt-1">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="telephone"
                    value={form.telephone}
                    onChange={handleChange}
                    placeholder="01234 567 890"
                    className="input-field pl-11"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Mobile Number</label>
                <div className="relative mt-1">
                  <Smartphone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="mobile"
                    value={form.mobile}
                    onChange={handleChange}
                    placeholder="+44 7000 000000"
                    className="input-field pl-11"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Emergency Number <span className="text-xs text-gray-400">(Optional)</span>
              </label>
              <div className="relative mt-1">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="emergency"
                  value={form.emergency}
                  onChange={handleChange}
                  placeholder="Backup contact"
                  className="input-field pl-11"
                />
              </div>
            </div>
          </section>

          {/* Billing Address */}
          <section className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Billing Address</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Address Line 1 <span className="text-red-500">*</span>
              </label>
              <div className="relative mt-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="address1"
                  value={form.address1}
                  onChange={handleChange}
                  placeholder="Apartment, suite, etc."
                  className={`input-field pl-11 ${errors.address1 ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                />
              </div>
              {renderError('address1')}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-500">
                Address Line 2 <span className="text-xs text-gray-400">(Optional)</span>
              </label>
              <div className="relative mt-1">
                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  name="address2"
                  value={form.address2}
                  onChange={handleChange}
                  placeholder="Floor, building"
                  className="input-field pl-11"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  City <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="London"
                    className={`input-field pl-11 ${errors.city ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                  />
                </div>
                {renderError('city')}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Postcode <span className="text-red-500">*</span>
                </label>
                <div className="relative mt-1">
                  <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="text"
                    name="postcode"
                    value={form.postcode}
                    onChange={handleChange}
                    placeholder="SW1A 1AA"
                    className={`input-field pl-11 ${errors.postcode ? 'border-red-400 ring-2 ring-red-100' : ''}`}
                  />
                </div>
                {renderError('postcode')}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">Country</label>
                <select
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="input-field"
                >
                  {countries.map((c) => (
                    <option key={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">State (US Only)</label>
                <input
                  type="text"
                  name="state"
                  value={form.state}
                  onChange={handleChange}
                  placeholder="Optional"
                  className="input-field"
                />
              </div>
            </div>
          </section>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <p className="text-sm text-gray-500">
              By continuing you agree to receive booking confirmations and ride updates for this journey.
            </p>
            <button type="submit" className="btn-primary px-8 py-3 text-base font-semibold">
              Continue to Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserInfo;
