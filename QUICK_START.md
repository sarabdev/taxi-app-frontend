# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

The application will open at `http://localhost:5173`

## 📋 Quick Tour

### Navigation

- **Home** (`/`) - Main booking form
- **About** (`/about`) - Company information
- **Contact** (`/contact`) - Contact form and details
- **Book Now** - Starts booking flow

### Booking Flow

1. **Home Page**: Fill out booking form (locations, passengers, luggage, round trip option, dates/times)
2. **Car Selection** (`/booking/cars`): Choose your vehicle (prices include round trip discount if applicable)
3. **Payment** (`/booking/payment`): Complete booking with detailed price breakdown

## 🎨 Customization

### Change Colors

Edit `tailwind.config.js` - modify the `primary` color palette

### Add More Airports

Edit `src/data/airports.js` - add new airport objects

### Add More Vehicles

Edit `src/data/cars.js` - add new car objects

### Modify Pricing

Edit the `calculatePrice` function in `src/pages/CarSelection.jsx`

## 🔑 Key Files

- `src/App.jsx` - Main routing
- `src/components/Navbar.jsx` - Navigation bar
- `src/components/Footer.jsx` - Footer
- `src/pages/Home.jsx` - Booking form
- `src/data/airports.js` - Airport data
- `src/data/cars.js` - Vehicle data

## 📦 Dependencies Used

```json
{
  "react": "^19.1.1",
  "react-dom": "^19.1.1",
  "react-router-dom": "^7.x",
  "lucide-react": "^latest",
  "@stripe/stripe-js": "^latest",
  "@stripe/react-stripe-js": "^latest",
  "tailwindcss": "^3.x"
}
```

## 🐛 Troubleshooting

### Port Already in Use

If port 5173 is busy, Vite will automatically use the next available port.

### Tailwind Styles Not Working

Run `npm run dev` again. Tailwind needs to rebuild.

### Routing Issues

Make sure you're using the correct paths. All routes are defined in `src/App.jsx`.

## 💡 Tips

1. **Development**: Hot Module Replacement (HMR) is enabled - changes appear instantly
2. **Production Build**: Run `npm run build` before deploying
3. **Testing**: Use `npm run preview` to test production build locally

## 🎯 Next Steps

1. Integrate Google Maps API for address autocomplete
2. Set up real Stripe payment processing
3. Add backend API for data persistence
4. Implement user authentication
5. Create admin panel for managing data

Enjoy building! 🚀
