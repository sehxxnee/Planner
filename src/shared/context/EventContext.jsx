import React, { createContext, useContext, useState, useEffect } from 'react';

const EventContext = createContext();

export const useEventContext = () => useContext(EventContext);

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
  });

  useEffect(() => {
    localStorage.setItem('events', JSON.stringify(events));
  }, [events]);

  const addEvent = (event) => {
    setEvents(prev => [...prev, {
      ...event,
      id: Date.now(),
      completed: false
    }]);
  };

  const deleteEvent = (id) => {
    setEvents(prev => prev.filter(event => event.id !== id));
  };

  const editEvent = (id, updatedEvent) => {
    setEvents(prev => prev.map(event => 
      event.id === id ? { ...event, ...updatedEvent } : event
    ));
  };

  const toggleEventComplete = (id) => {
    setEvents(prev => prev.map(event =>
      event.id === id ? { ...event, completed: !event.completed } : event
    ));
  };

  return (
    <EventContext.Provider value={{ 
      events, 
      addEvent, 
      deleteEvent, 
      editEvent,
      toggleEventComplete
    }}>
      {children}
    </EventContext.Provider>
  );
}; 