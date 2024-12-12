import React, { useEffect, useRef, useState } from "react";
import { addMonths, subMonths } from "date-fns";
import CreateEventDialog from "./dialoge/CreateEventDialog";
import { days, months } from "@/lib/utils";
import CalendarGrid from "./calendar/CalendarGrid";
import MonthYearSelector from "./calendar/MonthYearSelector";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [showMonthDropdown, setShowMonthDropdown] = useState(false);
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null); // To track the clicked day
  const [title, setTitle] = useState(""); // Track the title input
  const [description, setDescription] = useState("");
  const [timeRange, setTimeRange] = useState([null, null]); // Track the selected time range
  const [loading, setLoading] = useState(false);

  const isButtonDisabled = !title.trim() || !timeRange;
  const today = new Date().getDate(); // Extract just the day part

  const [isDialogOpen, setIsDialogOpen] = useState(false); // Modal visibility

  const handleDateClick = (day) => {
    setSelectedDay(day); // Save the clicked day
    setIsDialogOpen(true); // Open the dialog
  };

  const handleCreateEvent = () => {
    if (!title.trim() || !timeRange) {
      return; // Prevent creation if inputs are incomplete
    }
    setLoading(true);

    // Generate a random RGB color and convert it to HEX
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`; // Convert to hex
    document.body.style.backgroundColor = randomColor;

    const selectedDate = new Date(currentYear, currentMonth, selectedDay);
    const formattedDate = `${selectedDate.toLocaleString("en-US", {
      month: "short",
    })} ${selectedDate.getDate()}, ${selectedDate.getFullYear()}`;
    const formattedDay = selectedDate.toLocaleString("en-US", {
      weekday: "long",
    });

    // Format time range with AM/PM
    const startTime = timeRange[0].format("h:mm A"); // Format start time
    const endTime = timeRange[1].format("h:mm A"); // Format end time

    // Create a unique ID
    const id = new Date().getTime(); // Use timestamp for uniqueness

    const newEvent = {
      id,
      date: formattedDate,
      day: formattedDay,
      startTime,
      endTime,
      title,
      description,
      color: randomColor,
    };

    // Save event details to localStorage
    const events = JSON.parse(localStorage.getItem("calendarEvents")) || [];
    events.push(newEvent);
    localStorage.setItem("calendarEvents", JSON.stringify(events));

    setTimeout(() => {
      setIsDialogOpen(false); // Close the dialog
      setLoading(false); // Reset loading to false
      window.location.reload(); // Reload the page after 3 seconds
    }, 1000); // 3-second delay
  };

  const years = Array.from(
    { length: new Date().getFullYear() - 1899 }, // Length from 1900 to the current year
    (_, i) => 1900 + i // Start from 1900
  );

  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  const handleMonthClick = () => {
    setShowMonthDropdown(!showMonthDropdown);
    setShowYearDropdown(false); // Close the year dropdown
  };

  const handleYearClick = () => {
    setShowYearDropdown(!showYearDropdown);
    setShowMonthDropdown(false); // Close the month dropdown
  };

  const handleMonthSelect = (monthIndex) => {
    const newDate = new Date(
      currentDate.getFullYear(),
      monthIndex,
      currentDate.getDate()
    );
    setCurrentDate(newDate);
    setShowMonthDropdown(false);
  };

  const handleYearSelect = (year) => {
    const newDate = new Date(
      year,
      currentDate.getMonth(),
      currentDate.getDate()
    );
    setCurrentDate(newDate);
    setShowYearDropdown(false);
  };
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const storedEvents =
      JSON.parse(localStorage.getItem("calendarEvents")) || [];
    setEvents(storedEvents); // Set the events in state
  }, []);

  const goToNextMonth = () => setCurrentDate(addMonths(currentDate, 1));
  const goToPreviousMonth = () => setCurrentDate(subMonths(currentDate, 1));

  // Current date and month setup
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  // Helper function to get the number of days in a month
  function getDaysInMonth(month, year) {
    return new Date(year, month + 1, 0).getDate();
  }

  // Generate the dates for the current month
  const daysInMonth = getDaysInMonth(currentMonth, currentYear);
  // Calculate the starting day of the month
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay(); // 0 = Sunday, 6 = Saturday

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        monthDropdownRef.current &&
        !monthDropdownRef.current.contains(event.target) &&
        yearDropdownRef.current &&
        !yearDropdownRef.current.contains(event.target)
      ) {
        setShowMonthDropdown(false);
        setShowYearDropdown(false);
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate >= new Date("2024-01-01") && eventDate <= new Date("2024-12-31")
    );
  });
  
  return (
    <div class="col-span-12 xl:col-span-7 px-2.5 py-5 sm:p-8 bg-gradient-to-b from-white/25 to-white xl:bg-white rounded-2xl max-xl:row-start-1">
      <div class="flex  flex-col md:flex-row gap-4 items-center justify-between mb-5">
        {/* row 1 */}
        <MonthYearSelector
          currentDate={currentDate}
          months={months}
          years={years}
          showMonthDropdown={showMonthDropdown}
          showYearDropdown={showYearDropdown}
          handleMonthClick={handleMonthClick}
          handleYearClick={handleYearClick}
          goToPreviousMonth={goToPreviousMonth}
          goToNextMonth={goToNextMonth}
          handleMonthSelect={handleMonthSelect}
          handleYearSelect={handleYearSelect}
        />

        <div class="flex items-center rounded-md p-1 bg-indigo-50 gap-px">
          <button class="py-2.5 px-5 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white">
            Day
          </button>
          <button class="py-2.5 px-5 rounded-lg bg-indigo-600 text-white text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white">
            Week
          </button>
          <button class="py-2.5 px-5 rounded-lg bg-indigo-50 text-indigo-600 text-sm font-medium transition-all duration-300 hover:bg-indigo-600 hover:text-white">
            Month
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 rounded-t-3xl border-indigo-200">
        {days.map((day, index) => (
          <div
            key={index}
            className={`py-3.5 ${index % 7 === 0 ? "rounded-tl-xl" : ""} 
            ${index % 7 === 6 ? "rounded-tr-xl" : ""} 
            ${index < 6 ? "border-r" : ""} 
            border-indigo-200 bg-indigo-50 flex items-center justify-center text-sm font-medium text-indigo-600`}
          >
            {day}
          </div>
        ))}
      </div>

      <CalendarGrid
        currentMonth={currentMonth}
        currentYear={currentYear}
        firstDayOfMonth={firstDayOfMonth}
        daysInMonth={daysInMonth}
        filteredEvents={filteredEvents}
        handleDateClick={handleDateClick}
      />

      <CreateEventDialog
        isDialogOpen={isDialogOpen}
        setIsDialogOpen={setIsDialogOpen}
        title={title}
        setTitle={setTitle}
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        description={description}
        setDescription={setDescription}
        handleCreateEvent={handleCreateEvent}
        isButtonDisabled={!title || !timeRange[0] || !timeRange[1]}
        loading={loading}
      />
    </div>
  );
};

export default Calendar;
