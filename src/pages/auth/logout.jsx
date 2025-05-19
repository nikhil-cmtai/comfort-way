import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/slices/authSlice'; // Optional: clear Redux auth state

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    // Remove token from localStorage
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('isAuthenticated');

    // Optional: Clear Redux state
    dispatch(logout());

    // Redirect to sign-in
    navigate('/sign-in');
  }, [dispatch, navigate]);

  return (
    <div className="h-screen flex items-center justify-center text-gray-700 text-lg">
      Logging you out...
    </div>
  );
};

export default Logout;
