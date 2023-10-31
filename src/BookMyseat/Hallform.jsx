import React from 'react';
import BookingConfirm from './BookingConfirm';
import './hallform.css';
import { useState,useEffect } from 'react';

const Hallform = () => {

    const [seatStatus, setSeatStatus] = useState(Array(100).fill('available'));
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [numberOfSeats, setNumberOfSeats] = useState(1);
    const [ticketPrice, setTicketPrice] = useState(0);
    const [total, setTotal] = useState(0);
    const [proceeded, setProceeded] = useState(false);
  
      useEffect(() => {
      const ticketSelect = document.getElementById('ticket');
      setTicketPrice(parseFloat(ticketSelect.value));
      }, []);

      useEffect(() => {
        setTotal(selectedSeats.length * ticketPrice);
      }, [selectedSeats, ticketPrice]);
  
      useEffect(() => {
        const availableSeatsCount = seatStatus.filter(status => status === 'available').length;
        const occupiedSeatsCount = seatStatus.filter(status => status === 'occupied').length;
        console.log(`Available Seats: ${availableSeatsCount}`);
        console.log(`Occupied Seats: ${occupiedSeatsCount}`);
      }, [seatStatus]);
      
      const updateSelectedCount = () => {
        selectedSeats = document.querySelectorAll('.row .seat.selected');
        const seatsCount = selectedSeats.length;
        setTotal(seatsCount * ticketPrice);
      };

      const handleTicketTypeChange = (e) => {
        setTicketPrice(parseFloat(e.target.value));
        updateSelectedCount();
      };

      const handleSeatClick = (seatIndex) => 
      {
        if ( seatStatus[seatIndex] === 'available') 
        {
          const updatedSeatStatus = [...seatStatus];
          updatedSeatStatus[seatIndex] = 'selected';
          setSeatStatus(updatedSeatStatus);
          setSelectedSeats([...selectedSeats, seatIndex]);
        } 
        else if (seatStatus[seatIndex] === 'selected') 
        {
          const updatedSeatStatus = [...seatStatus];
          updatedSeatStatus[seatIndex] = 'available';
          setSeatStatus(updatedSeatStatus);
          setSelectedSeats(selectedSeats.filter(seat => seat !== seatIndex));
        }
      };
    //   const handleSeatClick = (seatIndex) => {
    //     if (seatStatus[seatIndex] === 'available') {
    //       const rowIndex = Math.floor(seatIndex / 10); // Calculate the row index
    //       const maxPremiumRows = 3; // Maximum premium rows
    //       const isPremiumSeat = rowIndex < maxPremiumRows; // Check if the seat is in a premium row
    
    //       if ((ticketPrice === 120 && isPremiumSeat) || (ticketPrice === 80 && !isPremiumSeat)) {
    //         const updatedSeatStatus = [...seatStatus];
    //         updatedSeatStatus[seatIndex] = 'selected';
    //         setSeatStatus(updatedSeatStatus);
    //         setSelectedSeats([...selectedSeats, seatIndex]);
    //       } else {
    //         // Show an alert or handle the case where the seat cannot be selected
    //         alert('Invalid seat selection for the selected ticket type.');
    //       }
    //     } else if (seatStatus[seatIndex] === 'selected') {
    //       const updatedSeatStatus = [...seatStatus];
    //       updatedSeatStatus[seatIndex] = 'available';
    //       setSeatStatus(updatedSeatStatus);
    //       setSelectedSeats(selectedSeats.filter(seat => seat !== seatIndex));
    //     }
    //   };

      const handleProceedClick = () => {
        const updatedSeatStatus = [...seatStatus];
        selectedSeats.forEach(seatIndex => {
        updatedSeatStatus[seatIndex] = 'occupied';
        });
        setSeatStatus(updatedSeatStatus);
        setProceeded(true);
      };
    
  return (
    <div className='ticketTypeContainer'>
            <label htmlFor="ticket">
            <select name="ticket" id="ticket" onChange={handleTicketTypeChange}>  
                <option value="120">Premium(₹120)</option>
                <option value="80">Standard(₹80)</option>
            </select>
            </label>

            <select
          className="quantity"
          value={numberOfSeats}
          onChange={(e) => setNumberOfSeats(parseInt(e.target.value, 10))}
        >
          {[...Array(6).keys()].map((num) => (
            <option key={num} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
        {/* list that shows availability of seats */}
        <ul className='showAvailability'>
            <li>
                <div className="seat occupied"></div>
                <span>Occupied</span>
            </li>
            <li>
                <div className="seat"></div>
                <span>N/A</span>
            </li>
            <li>
                <div className="seat selected"></div>
                <span>Your selection</span>
            </li>    
        </ul>
       {/* seating arrangement section */}
        <div className="seat-container" >
        {[...Array(10)].map((_, rowIndex) => (
          <div className="row" key={rowIndex}>
            {[...Array(10)].map((_, colIndex) => {
              const seatIndex = rowIndex * 10 + colIndex;
              const status = seatStatus[seatIndex];
              return (
                <div
                  key={seatIndex}
                  className={`seat ${status}`}
                  onClick={() => handleSeatClick(seatIndex)}
                ></div>
              );
            })}
          </div>
        ))}
        </div>
      <p className="text">
        You have selected <span id="count">{selectedSeats.length}</span> seats for a price of ₹<span id="total">{total}</span>
      </p>
      <div>
        <button className='proceed' onClick={handleProceedClick}>
            proceed
        </button>
      </div>
      {proceeded && <BookingConfirm selectedSeats={selectedSeats} ticketType={ticketPrice === 120 ? 'Premium' : 'Standard'} />}

    </div>
    
  )
}

export default Hallform;