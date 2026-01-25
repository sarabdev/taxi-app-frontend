# Round Trip Booking Feature

## Overview

The round trip feature allows users to book both their outbound and return journeys in a single booking, with an automatic 10% discount applied to the return trip.

## How It Works

### User Flow

1. **Home Page - Booking Form**

   - User checks the "Round Trip" checkbox
   - User selects pickup date and time
   - Return date and time fields appear automatically
   - User fills in return details

2. **Car Selection Page**

   - Badge shows "Round Trip - 10% Off Return"
   - Displays both pickup and return dates/times
   - Price automatically calculated with discount
   - Formula: `Total = Outbound Trip + (Outbound Trip × 0.9)`

3. **Payment Page**

   - Complete trip summary with both dates
   - Price breakdown shows:
     - Outbound trip cost
     - Return trip cost (with discount applied)
     - Discount amount highlighted in green
   - Total amount

4. **Confirmation**
   - Badge showing "Round Trip Booked"
   - Both pickup and return dates/times displayed
   - Total amount paid

## Technical Implementation

### Form Fields Added

```javascript
{
  isRoundTrip: false,        // Boolean toggle
  pickupDate: '',            // Date input (YYYY-MM-DD)
  pickupTime: '',            // Time input (HH:MM)
  returnDate: '',            // Date input (YYYY-MM-DD)
  returnTime: '',            // Time input (HH:MM)
}
```

### Pricing Calculation

```javascript
const calculatePrice = (car) => {
  const estimatedMiles = 25;
  const oneWayPrice = car.basePrice + car.pricePerMile * estimatedMiles;

  if (isRoundTrip) {
    const returnPrice = oneWayPrice * 0.9; // 10% discount
    return oneWayPrice + returnPrice;
  }

  return oneWayPrice;
};
```

### Discount Structure

- **One-way trip**: Standard pricing
- **Round trip**:
  - Outbound: Full price (100%)
  - Return: Discounted price (90%)
  - Total savings: 10% on return journey

## Modified Files

1. **src/pages/Home.jsx**

   - Added round trip checkbox with icon
   - Added date and time pickers
   - Return fields conditionally rendered
   - Validation for return date (must be after pickup date)

2. **src/pages/CarSelection.jsx**

   - Updated pricing calculation for round trips
   - Added round trip badge to booking summary
   - Display pickup and return dates/times
   - Shows discount information

3. **src/pages/Payment.jsx**

   - Enhanced booking summary with trip type
   - Price breakdown for round trips
   - Displays both travel dates
   - Shows discount calculation
   - Updated confirmation screen

4. **Documentation**
   - Updated README.md with round trip feature
   - Updated QUICK_START.md
   - Created this feature documentation

## User Benefits

✅ **Convenience**: Book both trips at once  
✅ **Savings**: Automatic 10% discount on return  
✅ **Transparency**: Clear price breakdown  
✅ **Flexibility**: Optional feature - can still book one-way  
✅ **Smart Validation**: Return date must be after pickup date

## Future Enhancements

Possible improvements for this feature:

1. **Variable Discounts**

   - Different discount rates based on distance
   - Loyalty program discounts
   - Seasonal promotions

2. **Multi-stop Trips**

   - Add intermediate stops
   - Complex itineraries

3. **Recurring Bookings**

   - Daily/weekly commutes
   - Airport transfers for frequent travelers

4. **Calendar Integration**

   - Sync with user's calendar
   - Reminders for upcoming trips

5. **Flexible Dates**
   - "Return within 3 days" option
   - Open return tickets

## Testing Checklist

- [ ] Round trip checkbox toggles return fields
- [ ] Return date must be on or after pickup date
- [ ] Pricing correctly calculated with 10% discount
- [ ] All pages show round trip information
- [ ] Confirmation email includes both trips
- [ ] One-way bookings still work normally
- [ ] Mobile responsive for all new fields

---

**Note**: This is a simulated implementation. In production, you would integrate with:

- Real distance calculation APIs (Google Maps Distance Matrix)
- Backend database for booking storage
- Email service for confirmations
- Calendar APIs for syncing
