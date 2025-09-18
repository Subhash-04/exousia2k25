import React, { useState, useEffect } from 'react';
import EventCard from './EventCard';
import EventDetail from './EventDetail';
import { events } from '../data/events';
import { Event } from '../types/Event';
import { imagePreloader } from '../utils/imagePreloader';
import './EventsPage.css';

interface EventsPageProps {
  onBack: () => void;
}

const EventsPage: React.FC<EventsPageProps> = ({ onBack }) => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [backgroundImage, setBackgroundImage] = useState<string>('/assets/images/events_bg.png');

  useEffect(() => {
    // Get preloaded background image
    const preloadedBg = imagePreloader.getPreloadedImage('events_bg', '/assets/images/events_bg.png');
    setBackgroundImage(preloadedBg);
  }, []);

  const handleMoreDetails = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleBackToEvents = () => {
    setSelectedEvent(null);
  };

  if (selectedEvent) {
    return <EventDetail event={selectedEvent} onBack={handleBackToEvents} />;
  }

  return (
    <div 
      className="events-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      {/* Floating Back Button */}
      <button className="floating-back-btn" onClick={onBack}>
        ← Back
      </button>

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
                onMoreDetails={handleMoreDetails}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsPage;