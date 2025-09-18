import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import EventsPage from './components/EventsPage';
import Contact from './components/Contact';
import './App.css';

type Screen = 'home' | 'events' | 'contact';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleNavigateToEvents = () => {
    setCurrentScreen('events');
  };

  const handleNavigateToHome = () => {
    setCurrentScreen('home');
  };

  const handleNavigateToContact = () => {
    setCurrentScreen('contact');
  };

  const handleBackFromContact = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigateToEvents={handleNavigateToEvents} onNavigateToContact={handleNavigateToContact} />;
      case 'events':
        return <EventsPage onBack={handleNavigateToHome} />;
      case 'contact':
        return <Contact onBack={handleBackFromContact} />;
      default:
        return <HomeScreen onNavigateToEvents={handleNavigateToEvents} onNavigateToContact={handleNavigateToContact} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;
