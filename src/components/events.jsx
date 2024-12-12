import { SquarePen, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import RemoveEventDialog from "./dialoge/RemoveEventDialog";
import UpdateEventDialog from "./dialoge/UpdateEventDialog";

const Events = () => {
  const [events, setEvents] = useState([]);
  const [currentEvent, setCurrentEvent] = useState(null); // Holds the event being edited
  const [loading, setloading] = useState(false); // Holds the event being edited

  const [isRemove, setIsRemove] = useState(false);
  const [isModal, setIsModal] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);

  useEffect(() => {
    const storedEvents =
      JSON.parse(localStorage.getItem("calendarEvents")) || [];
    setEvents(storedEvents);
  }, []);

  const handleEdit = (eventId) => {
    const eventToEdit = events.find((event) => event.id === eventId);
    if (eventToEdit) {
      setCurrentEvent(eventToEdit);
      setIsModal(true); // Open the modal
    }
  };

  const handleRemoveEvent = (id) => {
    setIsRemove(true); // Show the dialog
    setSelectedEventId(id); // Save the selected event ID
  };

  const confirmRemoveEvent = () => {
    const updatedEvents = events.filter(
      (event) => event.id !== selectedEventId
    );
    setEvents(updatedEvents); // Update the events state
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents)); // Update localStorage
    setIsRemove(false); // Close the dialog
    setSelectedEventId(null); // Clear the selected event ID
  };
  const cancelRemoveEvent = () => {
    setIsRemove(false); // Close the dialog without deleting
    setSelectedEventId(null); // Clear the selected event ID
  };

  const handleUpdateEvent = (eventId) => {
    setloading(true);
    const updatedEvents = events.map((event) => {
      if (event.id === eventId) {
        // Update only the fields that were edited
        return {
          ...event,
          title: currentEvent.title || event.title,
          startTime: currentEvent.startTime || event.startTime,
          endTime: currentEvent.endTime || event.endTime,
          description:
            currentEvent.description !== undefined
              ? currentEvent.description
              : event.description, // Allow clearing description
        };
      }
      return event; // Keep other events unchanged
    });

    // Save updated events to state and localStorage
    setEvents(updatedEvents);
    localStorage.setItem("calendarEvents", JSON.stringify(updatedEvents));
    setTimeout(() => {
      setCurrentEvent(null);
      setIsModal(false);
      setloading(false);
      window.location.reload();
    }, 1000);
  };

  return (
    <aside className="col-span-12 xl:col-span-5">
      <h2 className="font-manrope text-3xl leading-tight text-gray-900 mb-1.5">
        Events
      </h2>
      <p className="text-lg font-normal text-gray-600 mb-8">
        Don't miss schedule
      </p>
      <div className="flex gap-5 flex-col h-[530px] overflow-y-scroll hide-scrollbar">
        {events.length === 0 ? (
          <p className="text-center text-gray-500">No events found</p>
        ) : (
          events.map((event) => (
            <div key={event.id} className="p-6 rounded-xl bg-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <span
                    className={`w-2.5 h-2.5 rounded-full`}
                    style={{ backgroundColor: event.color }}
                  ></span>
                  <p className="text-base font-medium text-gray-900">
                    {event.date} - {event.startTime} - {event.endTime}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <SquarePen onClick={() => handleEdit(event.id)} size={20} />
                  <div className="dropdown relative inline-flex">
                    <button
                      type="button"
                      onClick={() => handleRemoveEvent(event.id)}
                      data-target="dropdown-default"
                      className="dropdown-toggle inline-flex justify-center py-2.5 px-1 items-center gap-2 text-sm text-black rounded-full cursor-pointer font-semibold text-center shadow-xs transition-all duration-500 hover:text-purple-600"
                    >
                      <Trash2 color="red" size={20} />
                    </button>
                  </div>
                </div>
              </div>
              <h6 className="text-xl leading-8 font-semibold text-black mb-1">
                {event.title}
              </h6>
              <p className="text-base font-normal text-gray-600">
                {event.description}
              </p>
            </div>
          ))
        )}

        <RemoveEventDialog
          isOpen={isRemove}
          onClose={cancelRemoveEvent}
          onConfirm={confirmRemoveEvent}
        />

        <UpdateEventDialog
          isOpen={isModal}
          onClose={() => setIsModal(false)}
          currentEvent={currentEvent}
          setCurrentEvent={setCurrentEvent}
          handleUpdateEvent={handleUpdateEvent}
          loading={loading}
        />
      </div>
    </aside>
  );
};

export default Events;
