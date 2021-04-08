  
import React, { useState } from "react";
import { createReservation } from "../utils/api";
import { Link, useHistory } from "react-router-dom";

// create NewReservation component
function NewReservation() {
  const history = useHistory();
  // create a state for each field to be submitted
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [dateOfReservation, setDateOfReservation] = useState("");
  const [timeOfReservation, setTimeOfReservation] = useState("");
  const [people, setPeople] = useState(1); // if left blank, it will default to 1


  // ALTERNATIVELY THIS SHOULD BE CLEANER ... REVISIT LATER

  // const [reservation, setReservation] = useState({
  //   first_name: '',
  //   last_name: '',
  //   mobile_number: '',
  //   reservation_date: '',
  //   reservation_time: '',
  //   people: 1
  // })

  // click handler for Submit button
  const handleSubmit = async (e) => {
    e.preventDefault();
    // CONSOLE LOG BLOCK TO VERIFY SUBMIT IS WORKING
    console.log("Wow such submission");
    console.log("First name:", firstName);
    console.log("Last name:", lastName);
    console.log("Mobile number:", mobileNumber);
    console.log("Reservation date:", dateOfReservation);
    console.log("Reservation time:", timeOfReservation);
    console.log("Party size:", people);

    // a single new reservation should be pushed to /dashboard upon Submit
    const reservationObj = {
      firstName: firstName,
      lastName: lastName,
      mobileNumber: mobileNumber,
      dateOfReservation: dateOfReservation,
      timeOfReservation: timeOfReservation,
      people: people, // must be at least 1
    };

    const newReservation = await createReservation(reservationObj);
    newReservation.reservationObj = [];

    history.push(`/dashboard/${reservationObj}`);
  };

  //   const handleNewReservation = (e) => {
  //     setReservation(e.target.value);
  //   };

  // this block addresses Submit click functionality for each altered individual input

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  const handleMobileNumber = (e) => {
    setMobileNumber(e.target.value);
  };
  const handleDateOfReservation = (e) => {
    setDateOfReservation(e.target.value);
  };
  const handleTimeOfReservation = (e) => {
    setTimeOfReservation(e.target.value);
  };
  const handlePeople = (e) => {
    setPeople(e.target.value);
  };

  return (
    // breadcrumb nav links atop the page with routing to dashboard
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Create Reservation
          </li>
        </ol>
      </nav>

      <h2>Create Reservation</h2>
      {/* a form with a field for each key in reservationObj; each field is contained within an input with its own label */}
      <form>
        <div className="mb-3">
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            First name:
          </label>
          <input
            name="first_name"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Mandatory first name (cannot contain numbers or special characters)"
            onChange={handleFirstName} required
          ></input>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Last name:
          </label>
          <input
            name="last_name"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="Mandatory last name (cannot contain numbers or special characters)"
            onChange={handleLastName} required
          ></input>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Mobile number:
          </label>
          <input
            name="mobile_number"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="###-###-####"
            onChange={handleMobileNumber} required
          ></input>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Date:
          </label>
          <input
            name="reservation_date"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            type="date"
            placeholder="YYYY-MM-DD"
            pattern="\d{4}-\d{2}-\d{2}"
            onChange={handleDateOfReservation} required
          ></input>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Time:
          </label>
          <input
            name="reservation_time"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            type="time"
            placeholder="HH:MM"
            pattern="[0-9]{2}:[0-9]{2}"
            onChange={handleTimeOfReservation} required
          ></input>
          <label htmlFor="exampleFormControlTextarea1" className="form-label">
            Party size:
          </label>
          <input
            name="people"
            className="form-control"
            id="exampleFormControlTextarea1"
            rows="3"
            placeholder="# (default to 1 if left blank)"
            onChange={handlePeople} required
          ></input>
        </div>
        {/* Cancel and Submit buttons with appropriate routing */}
        {/* first cancel button syntax */}
        <Link to="/" className="btn btn-outline-danger">
          Cancel • Test Button • Go to dashboard
        </Link>
        {``} {``} {``} {``}
        
        {/* below is experimental dialog prompt to confirm cancel */}
        {/* <!-- Button trigger modal --> */}
        <button
          type="button"
          className="btn btn-outline-danger"
          data-toggle="modal"
          data-target="#exampleModal"
        >
          Cancel • Pop-up Test Button • Confirmation required
        </button>
        {/* <!-- Modal --> */}
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Cancel Reservation
                </h5>
                <button
                  type="button"
                  className="close"
                  data-dismiss="modal"
                  aria-label="Close"
                >
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                Cancel reservation and return to Dashboard? This cannot be
                undone.
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-outline-danger"
                  data-dismiss="modal"
                >
                  Close
                </button>
                <a
                  role="button"
                  href="/"
                  type="button"
                  className="btn btn-outline-success"
                >
                  Cancel reservation
                </a>
              </div>
            </div>
          </div>
        </div>
        {``} {``} {``} {``}
        {/* this submit button has two types, how to make this clearer? does it matter? */}
        <button
          type="submit"
          onClick={handleSubmit}
          className="btn btn-outline-success"
        >
          Submit
        </button>
        {``} {``} {``} {``}
      </form>
    </div>
  );
}

export default NewReservation;