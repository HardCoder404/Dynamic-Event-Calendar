import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export default function MonthYearSelector({
  currentDate,
  months,
  years,
  showMonthDropdown,
  showYearDropdown,
  handleMonthClick,
  handleYearClick,
  goToPreviousMonth,
  goToNextMonth,
  handleMonthSelect,
  handleYearSelect,
}) {
  const monthDropdownRef = useRef(null);
  const yearDropdownRef = useRef(null);

  return (
    <div className="flex items-center gap-4 relative">
      <h5 className="text-xl leading-8 font-semibold text-gray-900">
        <span onClick={handleMonthClick} className="cursor-pointer">
          {format(currentDate, "MMMM")}
        </span>{" "}
        <span onClick={handleYearClick} className="cursor-pointer">
          {format(currentDate, "yyyy")}
        </span>
      </h5>

      <div className="flex items-center">
        <button
          onClick={goToPreviousMonth}
          className="text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600"
        >
          <ChevronLeft size={20} />
        </button>
        <button
          onClick={goToNextMonth}
          className="text-indigo-600 p-1 rounded transition-all duration-300 hover:text-white hover:bg-indigo-600"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {showMonthDropdown && (
        <div
          ref={monthDropdownRef}
          className="absolute top-8 bg-white shadow-lg p-2 z-20 rounded"
        >
          {months.map((month, index) => (
            <div
              key={month}
              onClick={() => handleMonthSelect(index)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {month}
            </div>
          ))}
        </div>
      )}

      {showYearDropdown && (
        <div
          ref={yearDropdownRef}
          className="absolute top-8 right-1/4 max-h-96 overflow-y-scroll hide-scrollbar bg-white shadow-lg p-2 rounded z-20"
        >
          {years.map((year) => (
            <div
              key={year}
              onClick={() => handleYearSelect(year)}
              className="p-2 hover:bg-gray-200 cursor-pointer"
            >
              {year}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
