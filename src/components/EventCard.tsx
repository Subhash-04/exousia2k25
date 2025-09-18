import React, { useState } from 'react';
import { Event } from '../types/Event';
import './EventCard.css';

interface EventCardProps {
  event: Event;
  onMoreDetails: (event: Event) => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onMoreDetails }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="event-card-container">
      <div 
        className={`event-card ${isHovered ? 'hovered' : ''}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="event-card-content">
          {/* Image Section */}
          <div className="event-image-section">
            <div className="event-image-container-fixed">
              <img 
                src={event.imagePath}
                alt={event.title}
                className="event-image-fixed"
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="event-content-section">
            <h3 className="event-title">{event.title}</h3>
            
            {/* Event Preview */}
            <div className="event-preview">
              <p className="event-preview-text">
                {event.description.split('\n')[0].substring(0, 80)}...
              </p>
            </div>
            
            {/* Event Day Badge */}
            <div className="event-day-badge">
              {event.description.includes('DAY-1') ? 'DAY 1' : 'DAY 2'}
            </div>
            
            <div className="event-actions">
              <button className="event-more-details-btn" onClick={() => onMoreDetails(event)}>
                More Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;