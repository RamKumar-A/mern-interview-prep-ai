import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/UserContext';
import { useDialog } from '../Dialog';

function LogoutDialog({ onCloseDialog }) {
  const navigate = useNavigate();
  const { clearUser } = useContext(UserContext);
  const { clearStack } = useDialog();

  function handleLogout() {
    localStorage.clear();
    clearUser();
    navigate('/');
    clearStack();
  }

  return (
    <div className="p-2 space-y-5">
      <p className="sm:text-lg opacity-80">Are your sure want to logout?</p>
      <div className="flex items-center justify-end gap-3 text-sm">
        <button
          className="py-1.5 px-4 border border-black/20 rounded-lg cursor-pointer"
          onClick={onCloseDialog}
        >
          Cancel
        </button>
        <button
          className="py-1.5 px-4 border border-transparent bg-red-500 text-white rounded-lg cursor-pointer"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default LogoutDialog;
