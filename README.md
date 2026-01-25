# AirportRide - Premium Taxi Booking Service

A modern, professional taxi booking website built with React, Vite, and Tailwind CSS. This application allows users to book airport transportation services with an intuitive and beautiful user interface.

## 🚀 Features

### Core Functionality

- **Smart Booking System**: Book rides from/to airports or custom locations
- **Round Trip Booking**: Book both outbound and return journeys with automatic 10% discount on return
- **Date & Time Selection**: Schedule your pickup and return with convenient date/time pickers
- **Vehicle Selection**: Choose from a variety of vehicles based on passenger count and luggage requirements
- **Dynamic Pricing**: Real-time price calculation based on distance, vehicle type, and trip type
- **Secure Payment**: Integrated payment processing (simulated for demo)
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices

### Pages

- **Home**: Hero section with booking form and feature highlights
- **About**: Company information, values, and why choose us
- **Contact**: Contact form, FAQ, and company details
- **Car Selection**: Browse and select from available vehicles
- **Payment**: Secure payment processing with order summary

### Vehicle Types

- Economy Sedan (3 passengers, 2 luggage)
- Comfort Sedan (4 passengers, 3 luggage)
- Executive Sedan (4 passengers, 3 luggage)
- SUV (6 passengers, 5 luggage)
- Luxury SUV (6 passengers, 5 luggage)
- Van (8 passengers, 8 luggage)
- Luxury Van (10 passengers, 10 luggage)

### Pre-configured Airports

- JFK - John F. Kennedy International Airport (New York)
- LAX - Los Angeles International Airport
- LHR - Heathrow Airport (London)
- DXB - Dubai International Airport
- SIN - Singapore Changi Airport
- ORD - O'Hare International Airport (Chicago)
- CDG - Charles de Gaulle Airport (Paris)
- SFO - San Francisco International Airport

## 🛠️ Tech Stack

- **Frontend Framework**: React 19.1.1
- **Build Tool**: Vite 7.1.7
- **Styling**: Tailwind CSS 3.x
- **Routing**: React Router DOM 7.x
- **Icons**: Lucide React
- **Payment**: Stripe (ready for integration)
- **Code Quality**: ESLint

## 📦 Installation

1. **Clone the repository** (or you already have the files)

2. **Install dependencies**:

```bash
npm install
```

3. **Start the development server**:

```bash
npm run dev
```

4. **Build for production**:

```bash
npm run build
```

5. **Preview production build**:

```bash
npm run preview
```

## 🎨 Project Structure

```
taxi-to-airport/
├── public/
│   └── vite.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation bar component
│   │   └── Footer.jsx          # Footer component
│   ├── data/
│   │   ├── airports.js         # Airport dummy data
│   │   └── cars.js            # Vehicle dummy data
│   ├── pages/
│   │   ├── Home.jsx           # Home page with booking form
│   │   ├── About.jsx          # About page
│   │   ├── Contact.jsx        # Contact page
│   │   ├── CarSelection.jsx   # Vehicle selection page
│   │   └── Payment.jsx        # Payment processing page
│   ├── App.jsx                # Main app component with routing
│   ├── main.jsx              # App entry point
│   └── index.css             # Global styles & Tailwind directives
├── index.html
├── package.json
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── eslint.config.js
```

## 🔧 Configuration

### Tailwind CSS

The project uses custom Tailwind configuration with a primary color palette. Modify `tailwind.config.js` to customize colors and theme.

### Environment Variables (for future Stripe integration)

Create a `.env` file in the root directory:

```env
VITE_STRIPE_PUBLIC_KEY=your_stripe_public_key_here
```

## 🎯 How It Works

### Booking Flow

1. **Home Page**: User fills out booking form

   - Select from/to locations (airport or custom)
   - Specify number of passengers
   - Specify luggage count
   - Choose round trip option (optional with 10% discount)
   - Select pickup date and time
   - Select return date and time (if round trip)

2. **Car Selection**: System shows available vehicles

   - Filters cars based on capacity requirements
   - Displays pricing (with round trip discount if applicable)
   - Shows complete trip details including dates/times
   - User selects preferred vehicle

3. **Payment**: Secure checkout

   - Enter payment details
   - Review complete booking summary
   - See price breakdown (outbound/return if round trip)
   - Complete payment

4. **Confirmation**: Success message
   - Complete booking details displayed
   - Shows both trip dates if round trip
   - Automatic redirect to home

### Data Flow

- Booking data is stored in `localStorage` during the flow
- Data includes: locations, passenger count, luggage, round trip flag, pickup/return dates and times, selected car, and total price
- Upon successful payment, data is cleared

## 🎨 Design Features

- **Modern UI**: Clean, professional design with gradient accents
- **Smooth Animations**: Hover effects and transitions
- **Mobile-First**: Responsive design that works on all devices
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Performance**: Optimized images and code splitting

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🚀 Future Enhancements

### Planned Features

1. **Google Maps Integration**:

   - Autocomplete for address selection
   - Real-time distance calculation
   - Map visualization of route

2. **Stripe Payment Integration**:

   - Real payment processing
   - Payment method storage
   - Receipts and invoices

3. **User Authentication**:

   - User accounts
   - Booking history
   - Saved addresses

4. **Admin Panel**:

   - Manage airports
   - Manage vehicles
   - View bookings
   - Analytics dashboard

5. **Real-time Features**:

   - Live driver tracking
   - SMS/Email notifications
   - Chat support

6. **Advanced Booking**:
   - Schedule future rides
   - Round-trip bookings
   - Multi-stop trips

## 🐛 Known Issues

- Google Maps integration is pending (currently uses text input for custom locations)
- Stripe payment is simulated (ready for real integration)
- Distance calculation uses estimated values (needs Google Maps Distance Matrix API)

## 📄 License

This project is created for demonstration purposes.

## 👨‍💻 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style

- Use functional components with hooks
- Follow React best practices
- Tailwind utility classes for styling
- Component-based architecture

## 🤝 Contributing

Feel free to fork this project and make your own modifications!

## 📞 Support

For questions or support, please use the contact form on the website or reach out via email.

---

Built with ❤️ using React + Vite + Tailwind CSS
