import { Link } from 'react-router-dom';
import NavBar from '../navbar/NavBar';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md p-4">
      <div className="flex items-center">
        {/* Clickable Logo Thumbnail */}
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="/images/WellnessRNC.png"
              alt="Site Logo"
              className="h-16 w-16 object-contain cursor-pointer"
            />
          </Link>
        </div>

        {/* Title and Nav */}
        <div className="flex flex-col justify-center flex-grow pl-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Wellness Rounds NC</h1>
          <NavBar />
        </div>
      </div>
    </header>
  );
};

export default Header;
