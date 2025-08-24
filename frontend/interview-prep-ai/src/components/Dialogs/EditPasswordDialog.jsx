import { useState } from 'react';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Input from '../Inputs/Input';
import SpinnerLoader from '../Loader/SpinnerLoader';
import toast from 'react-hot-toast';

function EditPasswordDialog({ onCloseDialog }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!currentPassword) {
      setError('Please enter current password');
      return;
    }

    if (!password) {
      setError('Please enter password');
      return;
    }

    if (!confirmPassword) {
      setError('Please enter confirm password');
      return;
    }

    if (password !== confirmPassword) {
      setError('Confirm password must be same as password');
      return;
    }

    try {
      setIsLoading(true);
      const response = await axiosInstance.patch(
        API_PATHS.USER.UPDATE_MY_PASSWORD,
        {
          passwordCurrent: currentPassword,
          password: password,
          passwordConfirm: confirmPassword,
        }
      );
      if (response.data) {
        toast.success('Password updated successfully');
        onCloseDialog();
      }
    } catch (err) {
      if (err.response && err.response.data.message) {
        setError(err.response.data?.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <form className="p-5" onSubmit={handleSubmit}>
        <Input
          value={currentPassword}
          label="Current Password"
          onChange={(e) => {
            setCurrentPassword(e.target.value);
          }}
          type="password"
          id="current_password"
        />

        <Input
          value={password}
          label="Password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          type="password"
          id="password"
        />

        <Input
          value={confirmPassword}
          label="Confirm Password"
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          type="password"
          id="confirm_password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />} Update Password
        </button>
      </form>
    </div>
  );
}

export default EditPasswordDialog;
