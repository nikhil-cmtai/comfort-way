import React, { useState, useEffect } from 'react';
import { FiLogIn, FiMail, FiLock, FiLoader } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useGoogleLogin } from '@react-oauth/google';
import { login, loginWithGoogle, setError } from '../../features/slices/authSlice';

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error } = useSelector((state) => state.auth);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [localError, setLocalError] = useState('');
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  useEffect(() => {
    dispatch(setError(''));
  }, [dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setLocalError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError('');
    try {
      const res = await dispatch(login(formData));

      if (res?.token) {
        const role = res?.user?.role;
        navigate(role === 'admin' ? '/dashboard' : '/profile');
      } else {
        setLocalError('Invalid email or password');
      }
    } catch (err) {
      setLocalError(err?.message || 'Login failed.');
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      setIsGoogleLoading(true);
      setLocalError('');
      try {
        const res = await dispatch(loginWithGoogle(tokenResponse.access_token));
        if (res?.token) {
          const role = res?.user?.role;
          navigate(role === 'admin' ? '/dashboard' : '/profile');
        } else {
          setLocalError('Google sign-in failed. Please try again.');
        }
      } catch (err) {
        setLocalError(err?.message || 'Google sign-in failed.');
      } finally {
        setIsGoogleLoading(false);
      }
    },
    onError: (err) => {
      setLocalError('Google sign-in failed: ' + err?.error || 'Unknown error');
    },
    flow: 'implicit',
    popup: true,
  });

  return (
    <div className="min-h-screen bg-gradient-to-tr from-blue-200 via-indigo-200 to-blue-300 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-4 bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-100">
        <div className="text-center">
          <div className="inline-block p-3 bg-blue-100 rounded-full mb-2">
            <FiLogIn className="h-8 w-8 text-blue-600" />
          </div>
          <h2 className="text-2xl font-extrabold text-gray-900">Welcome Back!</h2>
          <p className="mt-1 text-sm text-gray-600">
            Sign in or{' '}
            <Link to="/sign-up" className="font-medium text-blue-600 hover:text-blue-500">
              create an account
            </Link>
          </p>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <div className="space-y-3">
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="email"
                type="email"
                required
                placeholder="Email address"
                value={formData.email}
                onChange={handleChange}
                disabled={isLoading}
                className="pl-10 pr-3 py-2 w-full border rounded-lg"
              />
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                name="password"
                type="password"
                required
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                disabled={isLoading}
                className="pl-10 pr-3 py-2 w-full border rounded-lg"
              />
            </div>
          </div>

          {(() => {
            if (localError && typeof localError === 'string' && localError.trim() !== '') {
              return (
                <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">
                  {localError}
                </div>
              );
            }
            if (error && typeof error === 'string' && error.trim() !== '') {
              return (
                <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">
                  {error}
                </div>
              );
            }
            if (error && typeof error === 'object' && error !== null && typeof error.message === 'string') {
              return (
                <div className="bg-red-100 text-red-700 p-2 rounded text-sm text-center">
                  {error.message}
                </div>
              );
            }
            return null;
          })()}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full flex justify-center items-center py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            {isLoading ? (
              <>
                <FiLoader className="animate-spin mr-2" />
                Signing In...
              </>
            ) : (
              'Sign In'
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
              Signing in with Google...
            </>
          ) : (
            <>
              <FcGoogle className="h-5 w-5 mr-2" />
              Sign in with Google
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default Signin;