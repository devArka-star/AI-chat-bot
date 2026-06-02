import React, { useState, useEffect } from 'react';
import './App.css';
import Header from './MyComponents/Header';
import Hero from './MyComponents/Hero';
import Features from './MyComponents/Features';
import Footer from './MyComponents/Footer';
import ChatWidgetDashboard from './MyComponents/ChatWidgetDashboard'; 
import Login from './MyComponents/Login'; 
import Register from './MyComponents/Register'; 
import backgroundImage from './img/wp12314608.jpg';

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  if (currentView === 'dashboard') {
    return (
      <ChatWidgetDashboard 
        user={user} 
        onBackToHome={() => setCurrentView('landing')} 
      />
    );
  }

  if (currentView === 'login') {
    return (
      <Login 
        onBackToLanding={() => setCurrentView('landing')}
        onCreateAccount={() => setCurrentView('register')}
        onLoginSuccess={(userData) => {
          setUser(userData); 
          setCurrentView('dashboard'); 
        }}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <Register 
        onBackToLogin={() => setCurrentView('login')}    
      />
    );
  }

  return (
    <>
      <div 
        className="main-landing-wrapper" 
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          minHeight: '100vh',
          width: '100%'
        }}
      >
        <Header onLoginClick={() => setCurrentView('login')} />
        <Hero onStartChat={() => setCurrentView('login')} />
      </div>
      <Features />
      <Footer />
    </>
  );
}

export default App;