import React from 'react';
import './styles.css';

const Home: React.FC = () => {
  return (
    <main className="home-container">
      <div className="home-text">
        <h1 className="home-title">
        Welcome to<br />Wellness Rounds<br />North Carolina
        </h1>
        <p>
          Empowering healthcare professionals through collaborative discussions.
        </p>
      </div>
      </main>
  );
};

export default Home;
