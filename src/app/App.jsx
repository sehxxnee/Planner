import React from 'react';
import { MainLayout } from '../widgets/MainLayout';
import { CalendarPage } from '../pages/CalendarPage';
import { EventPage } from '../pages/EventPage/EventPage';
import { NotePage } from '../pages/NotePage/NotePage';
import { GraphPage } from '../pages/GraphPage/GraphPage';
import { withRouter } from './providers/withRouter';
import { EventProvider } from '../shared/context/EventContext';
import { NoteProvider } from '../shared/context/NoteContext';

function App({ currentPath }) {
  const renderContent = () => {
    switch (currentPath) {
      case '/calendar':
      case '/':
        return <CalendarPage />;
      case '/event':
        return <EventPage />;
      case '/note':
        return <NotePage />;
      case '/graph':
        return <GraphPage />;
      default:
        return <CalendarPage />;
    }
  };

  return (
    <EventProvider>
      <NoteProvider>
        <MainLayout>
          {renderContent()}
        </MainLayout>
      </NoteProvider>
    </EventProvider>
  );
}

export default withRouter(App); 