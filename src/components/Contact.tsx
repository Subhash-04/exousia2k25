import React from 'react';
import AnimatedBackground from './AnimatedBackground';
import './Contact.css';

interface ContactProps {
  onBack: () => void;
}

const Contact: React.FC<ContactProps> = ({ onBack }) => {
  return (
    <div className="contact-page">
      <div 
        className="contact-background"
        style={{ backgroundImage: 'url(/assets/images/squid_game_bg.png)' }}
      >
        <div className="contact-overlay"></div>
      </div>
      
      {/* Floating Back Button */}
      <button className="floating-back-btn" onClick={onBack}>
        ← Back
      </button>

      {/* Main Content */}
      <main className="contact-main">
        <div className="contact-content">
          <div className="contact-title-section">
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">Get in touch with our event coordinators</p>
          </div>

          <div className="contact-cards">
            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3 className="contact-name">V. Naveen Kumar</h3>
              <p className="contact-phone">9912818671</p>
              <div className="contact-actions">
                <a href="tel:9912818671" className="contact-btn call-btn">
                  Call Now
                </a>
                <a href="https://wa.me/919912818671" className="contact-btn whatsapp-btn" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>

            <div className="contact-card">
              <div className="contact-icon">📞</div>
              <h3 className="contact-name">Sk. Arshad Amil</h3>
              <p className="contact-phone">7981370360</p>
              <div className="contact-actions">
                <a href="tel:7981370360" className="contact-btn call-btn">
                  Call Now
                </a>
                <a href="https://wa.me/917981370360" className="contact-btn whatsapp-btn" target="_blank" rel="noopener noreferrer">
                  WhatsApp
                </a>
              </div>
            </div>
          </div>

          <div className="contact-info">
            <div className="contact-info-card">
              <h3>Event Information</h3>
              <p>For any queries regarding EXOUSIA 2K25 events, registration, or technical support, feel free to reach out to our coordinators.</p>
              <p>We're here to help make your tech fest experience amazing!</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;