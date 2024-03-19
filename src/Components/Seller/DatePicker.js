import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ handleDateChange, selectedDate }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      placeholderText="Pick Up date"
      style={{width:'90%'}}
    />
  );
};

export default DatePickerComponent;
