import React from 'react';
import { Event } from '../types/Event';
import './EventDetail.css';

interface EventDetailProps {
  event: Event;
  onBack: () => void;
}

const EventDetail: React.FC<EventDetailProps> = ({ event, onBack }) => {
  const handleRegister = () => {
    window.open('https://forms.gle/3cxHh6MkqKRZm9V96', '_blank');
  };

  return (
    <div 
      className="event-detail-page"
      style={{ backgroundImage: `url(${event.imagePath})` }}
    >
      {/* Floating Back Button */}
      <button className="floating-back-btn" onClick={onBack}>
        ← Back to Events
      </button>

      {/* Main Content */}
      <main className="event-detail-main">
        <div className="event-detail-content">
          {/* Event Image */}
          <div className="event-detail-image-section">
            <img 
              src={event.imagePath} 
              alt={event.title}
              className="event-detail-image"
            />
          </div>

          {/* Event Information */}
          <div className="event-detail-info">
            <h1 className="event-detail-title">{event.title}</h1>
            
            <div className="event-detail-description">
              {event.description.split('\n').map((paragraph, index) => (
                <p key={index} className="event-detail-paragraph">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="event-detail-actions">
              <button className="event-detail-register-btn" onClick={handleRegister}>
                Register Now
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventDetail;