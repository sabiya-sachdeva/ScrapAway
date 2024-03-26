import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const DatePickerComponent = ({ handleDateChange, selectedDate }) => {
  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleDateChange}
      placeholderText="Pick Up date"
      style={{width:"100%"}}
    
    />
  );
};

export default DatePickerComponent;
