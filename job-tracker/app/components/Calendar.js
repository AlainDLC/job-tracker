// components/Calendar.js
import React, { useState } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

const MyCalendar = ({ selectedDate, setSelectedDate }) => {
  // Hantera datumval
  const handleDateChange = (date) => {
    setSelectedDate(date); // Uppdatera den valda datumet
  };

  return (
    <div className="calendar-container mb-8">
      <h2 className="text-2xl font-semibold mb-4">Select Application Date</h2>
      <Calendar
        onChange={handleDateChange}
        value={selectedDate}
        className="react-calendar"
      />
    </div>
  );
};

export default MyCalendar;
