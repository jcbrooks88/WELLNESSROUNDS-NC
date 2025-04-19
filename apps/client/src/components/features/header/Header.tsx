import NavBar from '../navbar/NavBar';

const Header = () => {
  return (
    <header className="w-full bg-white shadow-md p-4">
      <div className="flex items-center">
        {/* Logo Thumbnail */}
        <div className="flex-shrink-0">
          <img
            src="/path-to-your-logo.png" // Replace with your actual logo path
            alt="Site Logo"
            className="h-16 w-16 object-contain"
          />
        </div>

        {/* Title and Nav */}
        <div className="flex flex-col justify-center flex-grow pl-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">WellnessRounds NC</h1>
          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
