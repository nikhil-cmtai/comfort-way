import { RouterProvider } from 'react-router-dom';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { router } from './routes/router';
import { store } from './features/store';
import AuthInitializer from './components/auth/AuthInitializer';
import Maintenance from './pages/Maintenance';

// Google client ID from environment variables
// If not available, this will need to be set in the .env file
const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = import.meta.env.VITE_GOOGLE_CLIENT_SECRET;
const MAINTENANCE_MODE = import.meta.env.VITE_MAINTENANCE === 'true';

function App() {
  if (MAINTENANCE_MODE) {
    return <Maintenance />;
  }
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID} clientSecret={GOOGLE_CLIENT_SECRET}>
        <AuthInitializer />
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
