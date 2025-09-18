import React, { useState, useEffect } from 'react';
import AnimatedBackground from './AnimatedBackground';
import './HomeScreen.css';

interface HomeScreenProps {
  onNavigateToEvents: () => void;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToEvents }) => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 5000); // 5 seconds

    return () => clearTimeout(timer);
  }, []);

  if (showSplash) {
    return (
      <div className="splash-screen">
        <AnimatedBackground theme="squid-game" />
        <div className="splash-content">
          <img src="/assets/images/event_logo.png" alt="Event Logo" className="splash-logo" />
        </div>
      </div>
    );
  }

  return (
    <div className="home-screen">
      <AnimatedBackground theme="squid-game" />
      
      {/* Header */}
      <header className="home-header">
        <div className="header-content">
          <img src="/assets/images/college_logo.png" alt="College Logo" className="header-logo" />
          <div className="header-title">
            <h1 className="main-title">EXOUSIA 2K25</h1>
          </div>
          <img src="/assets/images/event_logo.png" alt="Event Logo" className="header-logo" />
          <img src="/assets/images/iei.png" alt="IEI Logo" className="header-iei-logo" />
        </div>
      </header>

      {/* Main Content */}
      <main className="home-main">
        <div className="home-content">
          {/* Top Logos */}
          <div className="top-logos">
            <img src="/assets/images/college_logo.png" alt="College Logo" className="top-logo" />
            <img src="/assets/images/iei.png" alt="IEI Logo" className="top-logo" />
          </div>

          {/* Welcome Text */}
          <div className="welcome-section">
            <h1 className="welcome-title">Welcome to EXOUSIA 2K25!</h1>
            <p className="welcome-subtitle">
              The Ultimate Tech Fest<br />
              Browse, discover, and register for exciting events!
            </p>
          </div>

          {/* Register Button */}
          <div className="register-section">
            <button className="register-btn" onClick={onNavigateToEvents}>
              <img src="/assets/images/register_btn.png" alt="Register" className="register-btn-img" />
            </button>
          </div>

          {/* Phoenix Logo */}
          <div className="phoenix-section">
            <img src="/assets/images/pheonix.png" alt="Phoenix" className="phoenix-logo" />
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeScreen;