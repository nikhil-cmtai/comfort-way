import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchUser } from '../../features/slices/authSlice';

/**
 * Component to initialize authentication state when the app loads
 * Checks for a stored token and fetches user data if available
 */
const AuthInitializer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // If we have a token, fetch the user data
      dispatch(fetchUser());
    }
  }, [dispatch]);

  // This component doesn't render anything
  return null;
};

export default AuthInitializer; 