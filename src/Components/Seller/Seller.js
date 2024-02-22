import React, { useState } from "react";
import "./seller.css";
import axios from "axios";
import DatePickerComponent from "./DatePicker";



const MultiStepForm = () => {
  const initialUserState = {
    name: "",
    contactno: "",
    address: "",
    pincode: "",
    email: "",
    pickupdate: null,
    typeofwaste: [],
  };

  const [user, setUser] = useState(initialUserState);

  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  let name, value;
  const handleinput = (e) => {
    console.log(e);
    name = e.target.name;

    value = e.target.value;
    console.log(value);
    setUser({ ...user, [name]: value });
  };
  const handleWasteTypeChange = (e) => {
    // Get the selected options from the event object
    const selectedOptions = Array.from(e.target.selectedOptions);
    // Extract the values of the selected options
    const selectedWasteTypes = selectedOptions.map((option) => option.value);
    // Update the state with the selected waste types
    setUser({ ...user, typeofwaste: selectedWasteTypes });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    console.log(date);
    setUser({ ...user, pickupdate: date });
  };

  const postdata = async (e) => {
    e.preventDefault();

    axios
      .post("http://127.0.0.1:3005/submit", user)
      
      .then((res) => {
        console.log(res);
        setUser(initialUserState);
        // Redirect to homepage
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleNext = () => {
    setStep(step + 1);
  };

  const handlePrevious = () => {
    setStep(step - 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission
  };

  return (
    <div>
    
      <div>
        <form id="msform" onSubmit={handleSubmit}>
          {/* progressbar */}
          <ul id="progressbar">
            <li className={step === 1 ? "active" : ""}>Personal Details</li>
            <li className={step === 2 ? "active" : ""}>Personal Details</li>
            <li className={step === 3 ? "active" : ""}>Personal Details</li>
            <li className={step === 4 ? "active" : ""}>Submit</li>
          </ul>
          {/* fieldsets */}
          <fieldset style={{ display: step === 1 ? "block" : "none" }}>
            <h2 className="fs-title">Personal Details</h2>
            <h3 className="fs-subtitle">Tell us something more about you</h3>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={user.name}
              onChange={handleinput}
            />
            <br />
            {/* <input type="text" name="lname" placeholder="Last Name"/> */}
            <input
              type="text"
              name="contactno"
              placeholder="Contact number"
              value={user.contactno}
              onChange={handleinput}
            />
            <br />
            <input
              type="button"
              name="next"
              className="next action-button"
              value="Next"
              onClick={handleNext}
            />
          </fieldset>
          <fieldset style={{ display: step === 2 ? "block" : "none" }}>
            <h2 className="fs-title">Personal Details</h2>
            <h3 className="fs-subtitle">Tell us something more about you</h3>
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={user.address}
              onChange={handleinput}
              style={{ marginRight: "10px", width: "45%" }}
            />
            <input
              type="text"
              name="pincode"
              placeholder="PinCode"
              onChange={handleinput}
              value={user.pincode}
              style={{ width: "20%" }}
            />
            <input
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleinput}
              value={user.email}
            />
            <br />

            <input
              type="button"
              name="previous"
              className="previous action-button-previous"
              value="Previous"
              onClick={handlePrevious}
            />
            <input
              type="button"
              name="next"
              className="next action-button"
              value="Next"
              onClick={handleNext}
            />
          </fieldset>
          <fieldset style={{ display: step === 3 ? "block" : "none" }}>
            <h2 className="fs-title">Personal Details</h2>
            <h3 className="fs-subtitle">Tell us something more about you</h3>
            <label>Pick Up date</label>
            <br />
            <br />
            <DatePickerComponent
              handleDateChange={handleDateChange}
              selectedDate={selectedDate}
            />

            <br />
            <input
              type="button"
              name="previous"
              className="previous action-button-previous"
              value="Previous"
              onClick={handlePrevious}
            />
            <input
              type="button"
              name="next"
              className="next action-button"
              value="Next"
              onClick={handleNext}
            />
            {/* <input
              type="submit"
              name="submit"
              className="submit action-button"
              onClick={handleNext}
            /> */}
          </fieldset>
          <fieldset style={{ display: step === 4 ? "block" : "none" }}>
            <h2 className="fs-title">Waste Information</h2>
            <h3 className="fs-subtitle">Waste Categories</h3>
            <label>Type of waste</label>
            <br />
            {/* <input type="text" name="twitter" placeholder="Type of waste" /> */}
            <select
              name="waste"
              multiple
              style={{ width: "20%" }}
              onChange={handleWasteTypeChange}
            >
              <option value="Plastic">Plastic</option>
              <option value="Paper">Paper</option>
              <option value="Glass">Glass</option>
              <option value="Metal">Metal</option>
              <option value="Metal">Organic</option>
              <option value="Steel">Steel</option>
              <option value="Iron">Iron</option>
              {/* Add more options as needed */}
            </select>
            <br />
            <input
              type="button"
              name="previous"
              className="previous action-button-previous"
              value="Previous"
              onClick={handlePrevious}
            />
            <input
              type="submit"
              name="submit"
              className="submit action-button"
              // onClick={handleNext}
              onClick={postdata}
            />
          </fieldset>
        </form>
        {/* link to designify.me code snippets */}
      </div>
      
    </div>
  );
};

export default MultiStepForm;
