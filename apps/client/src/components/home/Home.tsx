import React from 'react';

const Home: React.FC = () => {
  return (
    <main className="flex items-center justify-center min-h-screen bg-gradient-to-br from-white to-gray-100 px-4">
      <div className="text-center">
        <img
          src="/images/WellnessRNC.png"
          alt="WellnessRounds Logo"
          className="mx-auto w-48 h-auto md:w-64 mb-6 drop-shadow-xl"
        />
        <h1 className="text-3xl md:text-5xl font-semibold text-gray-800 mb-4">
          Welcome to WellnessRounds
        </h1>
        <p className="text-gray-600 text-lg md:text-xl">
          Empowering healthcare professionals through collaborative discussions.
        </p>
      </div>
    </main>
  );
};

export default Home;
