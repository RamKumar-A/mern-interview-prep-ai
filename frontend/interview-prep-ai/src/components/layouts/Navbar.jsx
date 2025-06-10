import { Link } from 'react-router-dom';
import ProfileInfoCard from '../Cards/ProfileInfoCard';

function Navbar() {
  return (
    <div className="h-16 bg-white border border-b border-b-gray-200 border-gray-200/50 backdrop-blur-[2px] py-2.5 px-4 md:px-2 sticky top-0 z-30">
      <div className="container mx-auto flex items-center justify-between gap-5 xl:max-w-[80rem]">
        <Link to="/dashboard">
          <h2 className="text-lg md:text-xl text-black leading-5 font-bold">
            Interview Prep AI
          </h2>
        </Link>
        <ProfileInfoCard />
      </div>
    </div>
  );
}

export default Navbar;
