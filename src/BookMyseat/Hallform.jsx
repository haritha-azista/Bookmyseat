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
    const [seatCountAvailable, setSeatCountAvailable] = useState(100);
    const [seatCountOccupied, setSeatCountOccupied] = useState(0);
    const [confirmedSeats, setConfirmedSeats] = useState([]);
    const [confirmedNumberOfSeats, setConfirmedNumberOfSeats] = useState(1);
    const [confirmedPrice, setConfirmedPrice] = useState(0);
    // const [showConfirmation, setShowConfirmation] = useState(false);

      useEffect(() => {
      const ticketSelect = document.getElementById('ticket');
      setTicketPrice(parseFloat(ticketSelect.value));
      }, []);

      useEffect(() => {
        setTotal(selectedSeats.length * ticketPrice);
      }, [selectedSeats, ticketPrice]);
      console.log(total);
  
      useEffect(() => {
        const availableSeatsCount = seatStatus.filter(status => status === 'available').length;
        setSeatCountAvailable(availableSeatsCount);
        const occupiedSeatsCount = seatStatus.filter(status => status === 'occupied').length;
        setSeatCountOccupied(occupiedSeatsCount);
      }, [seatStatus]);
      
      const updateSelectedCount = () => {
        const seatsCount = selectedSeats.length;
        setTotal(seatsCount * ticketPrice);
      };
      const handleTicketTypeChange = (e) => {
        const newTicketPrice = parseFloat(e.target.value);
        setTicketPrice(newTicketPrice);
        const selectedSeatsCount = selectedSeats.length;
        const newTotal = selectedSeatsCount * newTicketPrice;
        setTotal(newTotal);
        setSelectedSeats([]);
        updateSelectedCount();
      };
     
      const handleSeatClick = (seatIndex) => {
        
        if (seatStatus[seatIndex] === 'available') {
          const rowIndex = Math.floor(seatIndex / 10);
          const maxPremiumRows = 3;
          const isPremiumSeat = rowIndex < maxPremiumRows;
          if ((ticketPrice === 120 && isPremiumSeat) || (ticketPrice === 80 && !isPremiumSeat)) 
          {
            if (selectedSeats.length < numberOfSeats) 
            {
              const updatedSeatStatus = [...seatStatus];
              updatedSeatStatus[seatIndex] = 'selected';
              setSeatStatus(updatedSeatStatus);
              setSelectedSeats(prevSelectedSeats => [...prevSelectedSeats, seatIndex]);
            } 
            else 
            {
              alert(`You can only select ${numberOfSeats} seats.`);
            }
          } 
          else {
            alert('Invalid seat selection for the selected ticket type. Only first 3 rows are for premium seats.');
          }
        } 
        else if (seatStatus[seatIndex] === 'selected') {
          const updatedSeatStatus = [...seatStatus];
          updatedSeatStatus[seatIndex] = 'available';
          setSeatStatus(updatedSeatStatus);
          setSelectedSeats(prevSelectedSeats => prevSelectedSeats.filter(seat => seat !== seatIndex));
        }
      };

      const handleProceedClick = () => {
        const selectedCount = selectedSeats.length;
        if (selectedCount === numberOfSeats) {
          const updatedSeatStatus = [...seatStatus];
          selectedSeats.forEach(seatIndex => {
            updatedSeatStatus[seatIndex] = 'occupied';
          });
          setSeatStatus(updatedSeatStatus);
          setConfirmedSeats([...selectedSeats]);
          setConfirmedNumberOfSeats(numberOfSeats);
          setConfirmedPrice(total);
          setProceeded(true);
          setSelectedSeats([]);
          setNumberOfSeats(1);
        } else {
          alert(`Please select exactly ${numberOfSeats} seats.`);
        }
      };
      
    
  return (
    <div>
      <h1 id='heading'>BookMySeat</h1>
    <div className='ticketAndquantity-Container'> 
    <div className='ticketTypeContainer'> 
            <select name="ticket" id="ticket" onChange={handleTicketTypeChange} style={{backgroundColor:'cadetblue', color:'white', borderColor:'white'}}>  
                <option>Ticket Type</option>
                <option value="120">Premium(₹120)</option>
                <option value="80">Standard(₹80)</option>
            </select>
             &nbsp;
          <label htmlFor="quantity">Qty:</label>   
          <select
          className="quantity"
          value={numberOfSeats}
          onChange={(e) => setNumberOfSeats(parseInt(e.target.value, 10))} 
          style={{backgroundColor:'cadetblue', color:'white', borderColor:'white'}}
          >
          {[...Array(6).keys()].map((num) => (
            <option key={num} value={num + 1}>
              {num + 1}
            </option>
          ))}
        </select>
      </div>   
        {/* list that shows availability of seats */}
        <ul className='showAvailability'>
            <li>
                <div className="seat occupied"></div>
                <span>Occupied({seatCountOccupied})</span>
            </li>
            <li>
                <div className="seat"></div>
                <span>Available({seatCountAvailable})</span>
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
      
      <div>
        <button className='proceed' onClick={handleProceedClick}>
            proceed
        </button>
      </div>
      {proceeded ? 
     (<BookingConfirm
      selectedSeats={confirmedSeats}
      ticketType={ticketPrice === 120 ? 'Premium' : 'Standard'}
      price={confirmedPrice}
      numberOfSeats={confirmedNumberOfSeats} // Pass the number of seats as a prop
     />) : <></>}
    

    </div>
    </div>
    
  )
}

export default Hallform;