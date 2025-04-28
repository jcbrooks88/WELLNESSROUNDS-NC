import React from 'react';
import './styles.css';

const Home: React.FC = () => {
  return (
  <div className='home'>
   <main className="home-container">
      <div className="home-text">
        <h1 className="home-title">
          Welcome to<br />
          <img 
            src="/images/WRNC-NEW-transparent.png" 
            alt="Wellness Rounds Logo" 
            className="home-logo" 
          /><br />
        </h1>
        <p className='home-subheading'>
          Empowering healthcare professionals through collaborative discussions.
        </p>
      </div>
    </main>
  </div>
  );
};

export default Home;
