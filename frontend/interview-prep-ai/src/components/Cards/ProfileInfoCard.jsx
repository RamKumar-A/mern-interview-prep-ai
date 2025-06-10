import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useNavigate } from 'react-router-dom';

function ProfileInfoCard() {
  const navigate = useNavigate();
  const { user, clearUser } = useContext(UserContext);
  function handleLogout() {
    localStorage.clear();
    clearUser();
    navigate('/');
  }
  return (
    user && (
      <div className="flex items-center gap-3">
        <img
          src={user.profileImageUrl || ''}
          alt="profile pic"
          className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gray-300 rounded-full"
        />
        <div>
          <div className="text-[15px] text-black font-bold leading-4.5">
            {user?.name || ''}
          </div>
          <button
            className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
}

export default ProfileInfoCard;
