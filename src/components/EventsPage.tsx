import React from 'react';
import AnimatedBackground from './AnimatedBackground';
import EventCard from './EventCard';
import { events } from '../data/events';
import './EventsPage.css';

interface EventsPageProps {
  onBack: () => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onBack }) => {
  const handleRegister = () => {
    window.open('https://forms.gle/3cxHh6MkqKRZm9V96', '_blank');
  };

  return (
    <div className="events-page">
      <AnimatedBackground theme="blue" />
      
      {/* Header */}
      <header className="events-header">
        <button className="back-btn" onClick={onBack}>
          ← Back
        </button>
      </header>

      {/* Main Content */}
      <main className="events-main">
        <div className="events-content">
          {/* Title Section */}
          <div className="events-title-section">
            <img src="/assets/images/college_logo.png" alt="College Logo" className="title-logo" />
            <h1 className="events-title">Events</h1>
            <img src="/assets/images/iei.png" alt="IEI Logo" className="title-logo" />
          </div>

          {/* Events List */}
          <div className="events-list">
            {events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onRegister={handleRegister}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;