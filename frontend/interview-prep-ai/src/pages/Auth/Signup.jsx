import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import { API_PATHS } from '../../utils/apiPaths';
import axiosInstance from '../../utils/axiosInstance';
import { UserContext } from '../../context/UserContext';
import SpinnerLoader from '../../components/Loader/SpinnerLoader';
import toast from 'react-hot-toast';

function Signup({ setCurrentPage }) {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser } = useContext(UserContext);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();

    if (!fullName) {
      setError('Please enter full name.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Please enter a valid email id');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    if (passwordConfirm !== password) {
      setError('password and confirm password are not same');
      return;
    }

    setError('');

    // Sign up API Call
    try {
      setIsLoading(true);
      const response = await axiosInstance.post(
        API_PATHS.AUTH.REGISTER,
        {
          name: fullName,
          email: email,
          password: password,
          passwordConfirm: passwordConfirm,
          profileImageUrl: profilePic,
        },
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      const { token } = response.data;

      if (response.data && token) {
        localStorage.setItem('token', token);
        updateUser(response.data);
        navigate('/dashboard');
        toast.success('Account created successfully');
      }

      setIsLoading(false);
    } catch (error) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <div className="w-[90vw] md:w-[33vw] p-3 sm:p-7 grid ">
      <h3 className="text-lg font-semibold text-black">Create an Account</h3>
      <p className="text-xs text-slate-700 mt-[5px] mb-6">
        Join us today by entering your details below.
      </p>

      <form onSubmit={handleSignup} encType="multipart/form-data">
        <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
        <div className="grid grid-cols-1 md:grid-cols-1 gap-2">
          <Input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            label="Full Name"
            placeholder="John"
            type="text"
            id="fullName"
          />

          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="email"
            id="email"
          />

          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
            id="password"
          />

          <Input
            value={passwordConfirm}
            onChange={(e) => setPasswordConfirm(e.target.value)}
            label="Confirm Password"
            placeholder="Must be same as password"
            type="password_confirm"
            id="password_confirm"
          />
        </div>
        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button
          type="submit"
          className="btn-primary w-full mt-2"
          disabled={isLoading}
        >
          {isLoading && <SpinnerLoader />} SIGN UP
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Already have an account?{' '}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage('login')}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
}

export default Signup;
