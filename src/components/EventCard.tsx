import React, { useState, useEffect, useRef } from 'react';
import { Event } from '../types/Event';
import './EventCard.css';

interface EventCardProps {
  event: Event;
  onRegister: () => void;
}

const EventCard: React.FC<EventCardProps> = ({ event, onRegister }) => {
  const [isHovered, setIsHovered] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | undefined>(undefined);
  const particlesRef = useRef<Array<{
    x: number;
    y: number;
    dx: number;
    dy: number;
    size: number;
    opacity: number;
  }>>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();

    // Initialize particles
    const initParticles = () => {
      const particles = [];
      for (let i = 0; i < 70; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          dx: (Math.random() - 0.5) * 2,
          dy: (Math.random() - 0.5) * 2,
          size: 2 + Math.random() * 8,
          opacity: 0.1 + Math.random() * 0.3,
        });
      }
      particlesRef.current = particles;
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.x += particle.dx;
        particle.y += particle.dy;
        
        if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;
        
        particle.x = Math.max(0, Math.min(canvas.width, particle.x));
        particle.y = Math.max(0, Math.min(canvas.height, particle.y));
        
        ctx.save();
        ctx.globalAlpha = particle.opacity;
        ctx.fillStyle = '#00bcd4';
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };

    initParticles();
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const formatDescription = (description: string) => {
    return description.split('\n').map((line, index) => (
      <React.Fragment key={index}>
        {line}
        {index < description.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

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
            <div className="event-image-container">
              <canvas ref={canvasRef} className="particles-canvas" />
              <img 
                src={event.imagePath} 
                alt={event.title}
                className="event-image"
                onError={(e) => {
                  // Fallback if image doesn't exist
                  e.currentTarget.style.display = 'none';
                }}
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="event-content-section">
            <h3 className="event-title">{event.title}</h3>
            <p className="event-description">
              {formatDescription(event.description)}
            </p>
            <button className="event-register-btn" onClick={onRegister}>
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;