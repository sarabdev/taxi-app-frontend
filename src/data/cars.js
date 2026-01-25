export const cars = [
  {
    id: 1,
    name: "Economy Sedan",
    type: "sedan",
    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop",
    capacity: {
      passengers: 3,
      luggage: 2,
    },
    pricePerMile: 2.5,
    basePrice: 15,
    features: ["Air Conditioning", "GPS Navigation", "Bluetooth"],
    description:
      "Perfect for solo travelers or small groups looking for an affordable ride.",
  },
  {
    id: 2,
    name: "Comfort Sedan",
    type: "sedan",
    image:
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&h=300&fit=crop",
    capacity: {
      passengers: 4,
      luggage: 3,
    },
    pricePerMile: 3.0,
    basePrice: 20,
    features: [
      "Air Conditioning",
      "GPS Navigation",
      "Bluetooth",
      "Premium Sound",
    ],
    description: "Enhanced comfort with extra space for a relaxing journey.",
  },
  {
    id: 3,
    name: "Executive Sedan",
    type: "executive",
    image:
      "https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=400&h=300&fit=crop",
    capacity: {
      passengers: 4,
      luggage: 3,
    },
    pricePerMile: 4.5,
    basePrice: 35,
    features: [
      "Leather Seats",
      "Wi-Fi",
      "Premium Sound",
      "Complimentary Water",
      "USB Charging",
    ],
    description:
      "Luxury travel experience with premium amenities and professional service.",
  },
  {
    id: 4,
    name: "SUV",
    type: "suv",
    image:
      "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?w=400&h=300&fit=crop",
    capacity: {
      passengers: 6,
      luggage: 5,
    },
    pricePerMile: 4.0,
    basePrice: 30,
    features: [
      "Air Conditioning",
      "GPS Navigation",
      "Third Row Seating",
      "Spacious Cargo",
    ],
    description:
      "Spacious vehicle ideal for families or groups with extra luggage.",
  },
  {
    id: 5,
    name: "Luxury SUV",
    type: "luxury",
    image:
      "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=400&h=300&fit=crop",
    capacity: {
      passengers: 6,
      luggage: 5,
    },
    pricePerMile: 5.5,
    basePrice: 50,
    features: [
      "Leather Seats",
      "Wi-Fi",
      "Premium Sound",
      "Climate Control",
      "Complimentary Refreshments",
    ],
    description: "Ultimate luxury and comfort for discerning travelers.",
  },
  {
    id: 6,
    name: "Van",
    type: "van",
    image:
      "https://images.unsplash.com/photo-1464219789935-c2d9d9aba644?w=400&h=300&fit=crop",
    capacity: {
      passengers: 8,
      luggage: 8,
    },
    pricePerMile: 4.5,
    basePrice: 40,
    features: [
      "Air Conditioning",
      "GPS Navigation",
      "Extra Luggage Space",
      "USB Charging",
    ],
    description:
      "Perfect for large groups or families with extensive luggage requirements.",
  },
  {
    id: 7,
    name: "Luxury Van",
    type: "luxury",
    image:
      "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=400&h=300&fit=crop",
    capacity: {
      passengers: 10,
      luggage: 10,
    },
    pricePerMile: 6.0,
    basePrice: 60,
    features: [
      "Leather Seats",
      "Wi-Fi",
      "Premium Entertainment",
      "Climate Control",
      "VIP Service",
    ],
    description: "Premium group transportation with first-class amenities.",
  },
];

export const getAvailableCars = (passengers, luggage) => {
  return cars.filter(
    (car) =>
      car.capacity.passengers >= passengers && car.capacity.luggage >= luggage
  );
};
