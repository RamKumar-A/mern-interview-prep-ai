import { useContext } from 'react';

import { UserContext } from '../../context/UserContext';
import { useDialog } from '../Dialog';

import EditProfileDialog from './EditProfileDialog';
import EditPasswordDialog from './EditPasswordDialog';

import Window from '../Window';

function ProfileDialog() {
  const { user } = useContext(UserContext);
  const { open } = useDialog();

  return (
    <>
      <div className="p-2 space-y-3">
        <div className="space-y-4 flex items-center justify-center flex-col">
          <img
            src={user?.profileImageUrl || ''}
            alt="profile pic"
            className="w-9 h-9 sm:w-14 sm:h-14 md:w-11 md:h-11 bg-gray-300 rounded-full object-cover"
          />
          <div className="space-y-1 text-slate-800">
            <p className="font-medium ">
              Name :{' '}
              <span className="font-normal text-slate-600 capitalize">
                {user?.name}
              </span>
            </p>
            <p className="font-medium">
              Email :{' '}
              <span className="font-normal text-slate-600">{user?.email}</span>
            </p>
          </div>
        </div>
        <hr className="text-gray-300" />
        <div className="flex items-center justify-end gap-5 text-white text-sm">
          <button className="btn-small" onClick={() => open('edit_profile')}>
            Edit Profile
          </button>

          <button className="btn-small" onClick={() => open('edit_password')}>
            Edit Password
          </button>
        </div>
      </div>
      <Window id="edit_profile" open title="Edit Profile">
        <EditProfileDialog />
      </Window>
      <Window id="edit_password" open title="Edit Password">
        <EditPasswordDialog />
      </Window>
    </>
  );
}

export default ProfileDialog;
