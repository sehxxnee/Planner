import React, { createContext, useContext, useState } from 'react';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  const addEvent = (event) => setEvents(prev => [...prev, { ...event, id: Date.now() }]);
  const deleteEvent = (id) => setEvents(prev => prev.filter(e => e.id !== id));
  const editEvent = (event) => setEvents(prev => prev.map(e => (e.id === event.id ? event : e)));

  return (
    <EventContext.Provider value={{ events, addEvent, deleteEvent, editEvent }}>
      {children}
    </EventContext.Provider>
  );
}; 