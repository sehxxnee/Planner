import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NoteProvider } from './shared/context/NoteContext';
import { EventProvider } from './shared/context/EventContext';
import { CalendarPage } from './pages/CalendarPage/CalendarPage';
import { NotePage } from './pages/NotePage/NotePage';
import { Layout } from './shared/components/Layout';

function App() {
  return (
    <Router>
      <NoteProvider>
        <EventProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<CalendarPage />} />
              <Route path="/notes" element={<NotePage />} />
            </Routes>
          </Layout>
        </EventProvider>
      </NoteProvider>
    </Router>
  );
}

export default App; 