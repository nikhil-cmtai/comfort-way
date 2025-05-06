import React, { useState } from 'react';
import { FiUserPlus, FiMail, FiLock, FiUser, FiLoader } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import { register, loginWithGoogle } from '../../features/slices/authSlice';

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector(state => state.auth);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    displayName: ''
  });
  const [validationError, setValidationError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setValidationError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setValidationError("Passwords don't match");
      return;
    }

    if (formData.password.length < 6) {
      setValidationError("Password must be at least 6 characters");
      return;
    }

    try {
      const userData = {
        email: formData.email,
        password: formData.password,
        name: formData.displayName
      };

      const res = await dispatch(register(userData));

      if (res?.payload?.token) {
        const userRole = res?.payload?.user?.role || 'user';
        navigate(userRole === 'user' ? '/profile' : '/dashboard');
      } else {
        setValidationError('Registration failed.');
      }
    } catch (err) {
      setValidationError(err.message || 'Registration error');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      setIsGoogleLoading(true);
      setValidationError('');
      try {
        const idToken = response.access_token;
        const res = await dispatch(loginWithGoogle(idToken));

        if (res?.payload?.token) {
          const userRole = res?.payload?.user?.role || 'user';
          navigate(userRole === 'user' ? '/profile' : '/dashboard');
        } else {
          setValidationError('Google sign-up failed. Please try again.');
        }
      } catch (err) {
        setValidationError(err.message || 'Google sign-up failed.');
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: (error) => {
      setValidationError('Google sign-up failed: ' + error);
    },
    flow: 'implicit',
    popup: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-200 via-indigo-200 to-blue-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4 bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100">
        <div className="text-center">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-2">
            <FiUserPlus className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Create Account</h2>
          <p className="mt-1 text-sm text-gray-600">
            Join our community or{' '}
            <Link to="/sign-in" className="font-medium text-blue-600 hover:text-blue-500">
              sign in to your account
            </Link>
          </p>
        </div>

        {(error || validationError) && (
          <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">
            {validationError || error}
          </div>
        )}

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div className="relative">
              <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                name="displayName"
                placeholder="Full name"
                value={formData.displayName}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="pl-10 pr-3 py-2 w-full border rounded-lg"
              />
            </div>

            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="pl-10 pr-3 py-2 w-full border rounded-lg"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="password"
                placeholder="Password (min 6 characters)"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="pl-10 pr-3 py-2 w-full border rounded-lg"
              />
            </div>

            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={isLoading}
                className="pl-10 pr-3 py-2 w-full border rounded-lg"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Creating Account...
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <div className="flex items-center justify-center">
          <div className="border-t border-gray-300 flex-grow"></div>
          <div className="mx-4 text-xs text-gray-500">or</div>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

        <button
          onClick={googleLogin}
          type="button"
          disabled={isGoogleLoading}
          className="w-full flex justify-center items-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-50"
        >
          {isGoogleLoading ? (
            <>
              <FiLoader className="animate-spin mr-2" />
              Signing up with Google...
            </>
          ) : (
            <>
              <FcGoogle className="h-5 w-5 mr-2" />
              Sign up with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Signup;
