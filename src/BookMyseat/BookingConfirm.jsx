import React from 'react'
const BookingConfirm = ({ selectedSeats, ticketType, price }) => {

  return (
    <div>
      <div className="confirmation-container">
      <h2>Booking Confirmation</h2>
      <p>Ticket Type: {ticketType}</p>
      <p>Number of Seats Selected: {selectedSeats.length}</p>
      <p>Selected Seat No's: {selectedSeats.join(', ')}</p>
      <p>Price :{price}</p>
      <p>Thank you for your booking!</p>
    </div>

    </div>
  )
}

export default BookingConfirm