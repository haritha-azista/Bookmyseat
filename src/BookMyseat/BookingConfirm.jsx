import React from 'react'
import { useEffect } from 'react';
const BookingConfirm = ({ selectedSeats, ticketType }) => {
    
    useEffect(() => {
      console.log('Selected Seats:', selectedSeats);
      console.log('Ticket Type:', ticketType);
    }, [selectedSeats, ticketType]);
  return (
    <div>
      <div className="confirmation-container">
      <h2>Booking Confirmation</h2>
      <p>Ticket Type: {ticketType}</p>
      <p>Number of Seats Selected: {selectedSeats.length}</p>
      <p>Selected Seats: {selectedSeats.join(', ')}</p>
      <p>Thank you for your booking!</p>
    </div>

    </div>
  )
}

export default BookingConfirm