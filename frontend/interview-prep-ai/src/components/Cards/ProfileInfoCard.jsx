import { useContext } from 'react';
import { UserContext } from '../../context/UserContext';
import { useDialog } from '../Dialog';
import LogoutDialog from '../Dialogs/LogoutDialog';
import ProfileDialog from '../Dialogs/ProfileDialog';
import Window from '../Window';

function ProfileInfoCard() {
  const { user } = useContext(UserContext);
  const { open } = useDialog();
  return (
    user && (
      <>
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={() => {
            open('profile_dialog');
          }}
        >
          <img
            src={user.profileImageUrl || ''}
            alt="profile pic"
            className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-gray-300 rounded-full object-cover"
          />
          <div>
            <div className="text-[15px] text-black font-bold leading-4.5">
              {user?.name || ''}
            </div>
            <button
              className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
              onClick={(e) => {
                e.stopPropagation();
                open('logout');
              }}
            >
              Logout
            </button>
          </div>
        </div>
        <Window id="logout" open={open} title="Logout">
          <LogoutDialog />
        </Window>
        <Window id="profile_dialog" open={open} title="Account Details">
          <ProfileDialog />
        </Window>
      </>
    )
  );
}

export default ProfileInfoCard;
