import React from "react";
import { Tooltip } from "antd";
import dayjs from "dayjs";

export default function CalendarGrid({
  currentMonth,
  currentYear,
  firstDayOfMonth,
  daysInMonth,
  filteredEvents,
  handleDateClick,
}) {
  // Get today's date
  const today = dayjs().date();

  return (
    <div className="grid grid-cols-7 rounded-b-xl border-indigo-200">
      {/* Empty grid items before the first day of the month */}
      {[...Array(firstDayOfMonth).keys()].map((_, index) => (
        <div
          key={`empty-${index}`}
          className="flex xl:aspect-square max-xl:min-h-[60px] p-3.5 bg-white border-indigo-200 transition-all duration-300"
        >
          <span className="text-xs font-semibold text-gray-900"></span>
        </div>
      ))}

      {/* Render days in the month */}
      {[...Array(daysInMonth).keys()].map((day) => {
        const date = day + 1;
        // Filter events for the current day
        const dayWithEvents = filteredEvents.find((event) => {
          const eventDate = new Date(event.date);
          return (
            eventDate.getDate() === date &&
            eventDate.getMonth() === currentMonth &&
            eventDate.getFullYear() === currentYear
          );
        });

        // Determine circle color
        const circleColor = dayWithEvents ? dayWithEvents.color : "red-500";

        return (
          <div
            key={date}
            onClick={() => handleDateClick(date)}
            className={`flex xl:aspect-square hover:bg-indigo-200 max-xl:min-h-[60px] border-x border-b rounded-lg border-y p-3.5 bg-white border-indigo-200 transition-all duration-300 relative`}
          >
            <span
              className={`text-xs font-semibold ${
                date === today
                  ? "bg-indigo-400 text-white border-indigo-200"
                  : "hover:bg-indigo-50 cursor-pointer"
              } w-8 text-center h-fit p-2 rounded-xl text-gray-900`}
            >
              {date}
            </span>
            <Tooltip
              title={
                dayWithEvents ? (
                  <div className="flex flex-col">
                    <span>{dayWithEvents.title}</span>
                    <span>{dayWithEvents.description}</span>
                  </div>
                ) : (
                  "No Event"
                )
              }
              placement="top"
            >
              <div
                className={`w-3 h-3 rounded-full absolute bottom-2 right-2`}
                style={{ backgroundColor: circleColor }}
              />
            </Tooltip>
          </div>
        );
      })}
    </div>
  );
}
