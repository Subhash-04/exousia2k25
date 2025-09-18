import { useState } from 'react';
import HomeScreen from './components/HomeScreen';
import EventsPage from './components/EventsPage';
import './App.css';

type Screen = 'home' | 'events';

function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  const handleNavigateToEvents = () => {
    setCurrentScreen('events');
  };

  const handleNavigateToHome = () => {
    setCurrentScreen('home');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigateToEvents={handleNavigateToEvents} />;
      case 'events':
        return <EventsPage onBack={handleNavigateToHome} />;
      default:
        return <HomeScreen onNavigateToEvents={handleNavigateToEvents} />;
    }
  };

  return (
    <div className="App">
      {renderScreen()}
    </div>
  );
}

export default App;
