import { useContext, useState } from 'react';
import { UserContext } from '../../context/UserContext';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import Input from '../Inputs/Input';
import ProfilePhotoSelector from '../Inputs/ProfilePhotoSelector';
import SpinnerLoader from '../Loader/SpinnerLoader';
import toast from 'react-hot-toast';

function EditProfileDialog({ onCloseDialog }) {
  const { user } = useContext(UserContext);

  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [profilePic, setProfilePic] = useState(user.profileImageUrl);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name) {
      setError('Please enter your name');
      return;
    }
    if (!email) {
      setError('Please enter your email');
      return;
    }

    try {
      setIsLoading(true);

      const response = await axiosInstance.patch(
        API_PATHS.USER.UPDATE_ME,
        {
          name,
          email,
          profileImageUrl: profilePic,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      if (response.data) {
        toast.success('Profile updated successfully');
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
      <form
        className="p-5"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <div>
          <ProfilePhotoSelector
            preview={profilePic}
            image={profilePic}
            setImage={setProfilePic}
          />
        </div>
        <Input
          value={name}
          label="Name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          id="name"
        />
        <Input
          value={email}
          label="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          id="email"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />} Update Profile
        </button>
      </form>
    </div>
  );
}

export default EditProfileDialog;
