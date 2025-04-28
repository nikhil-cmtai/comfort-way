import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';

// Import your page components here
import Home from '../pages/home/home';
import About from '../pages/about/about';
import Contact from '../pages/contact/contact';
import BuyRent from '../pages/buy-rent/buy-rent';
import ProtectionPlan from '../pages/protection-plans/protection-plans';
import RaiseRequest from '../pages/raise-request/raise-request';
import Privacy from '../pages/privacy/privacy';
import Terms from '../pages/terms/terms';
import Services from '../pages/services/services';
import MaintenanceRepair from '../pages/maintenance-repair/maintenance-repair';
import SignIn from '../pages/auth/signin';
import SignUp from '../pages/auth/signup';
import Devices from '../pages/devices/devices';
import DeviceDetails from '../pages/device-detail/device-detail';
import ProductRepairForm from '../pages/maintenance-repair/ProductRepairForm';
import CategoryDetails from '../pages/buy-rent/[category]';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'contact',
        element: <Contact />,
      },
      {
        path: 'buy-rent',
        element: <BuyRent />,
      },
      {
        path: 'buy-rent/:category',
        element: <CategoryDetails />,
      },
      {
        path: 'home-protection',
        element: <ProtectionPlan />,
      },
      {
        path: 'raise-request',
        element: <RaiseRequest />,
      },
      {
        path: 'privacy',
        element: <Privacy />,
      },
      {
        path: 'terms',
        element: <Terms />,
      },
      {
        path: 'services',
        element: <Services />,
      },
      {
        path: 'maintenance-repair',
        element: <MaintenanceRepair />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
      {
        path: 'devices',
        element: <Devices />,
      },
      {
        path: 'devices/:deviceId',
        element: <DeviceDetails />,
      },  
      {
        path: 'maintenance-repair/:product',
        element: <ProductRepairForm />,
      },
    ],
  },
]); 