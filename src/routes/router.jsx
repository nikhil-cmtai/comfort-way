import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/website/RootLayout';
import ProtectedRoute from './protectedRoute';
import { Navigate } from 'react-router-dom';

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
import ProductRepairForm from '../pages/maintenance-repair/ProductRepairForm';
import CategoryDetails from '../pages/buy-rent/[category]';
import Categories from '../pages/dashboard/categories/page';
import ProfilePage from '../pages/profile/page';


// Dashboard Routes
import Dashboard from '../pages/dashboard/page';
import DashboardLayout from '../layouts/dashboard/DashboardLayout';
import Leads from '../pages/dashboard/leads/page';
import MaintenanceRequest from '../pages/dashboard/maintenance-request/page';
import Products from '../pages/dashboard/products/page';
import Logout from '../pages/auth/logout';
import ProtectionPlans from '../pages/dashboard/protection-plans/page';
import Plans from '../pages/dashboard/plans/page';
import Customers from '../pages/dashboard/customers/page';
import Tasks from '../pages/dashboard/tasks/page';
import Users from '../pages/dashboard/users/page';
import RolePermissions from '../pages/dashboard/role-permissions/page';
import EditRole from '../pages/dashboard/role-permissions/edit-role';
import ServicesPage from '../pages/dashboard/services/page';
import ServiceHistory from '../pages/dashboard/serviceHistory/page';
import ProductPlans from '../pages/dashboard/products/products-plan/page';

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
        path: 'profile',
        element: (
          <ProtectedRoute>
            {localStorage.getItem('role') === 'NpkR5K3M242WKHPdVTTw' ? <ProfilePage /> : <Navigate to="/sign-in" replace />}
          </ProtectedRoute>
        ),
      },
      {
        path: 'maintenance-repair/:name',
        element: <ProductRepairForm />,
      },
      {
        path: 'logout',
        element: <Logout />,
      },
      ],
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute><DashboardLayout /></ProtectedRoute>,
    children: [
      {
        index: true,
        element: <ProtectedRoute><Dashboard /></ProtectedRoute>,
      },
      {
        path: 'leads',
        element: <ProtectedRoute><Leads /></ProtectedRoute>,
      },
      {
        path: 'maintenance-request',
        element: <ProtectedRoute><MaintenanceRequest /></ProtectedRoute>,
      },
      {
        path: '#',
        element: <ProtectedRoute><Products /></ProtectedRoute>,
      },
      {
        path: 'products/categories',
        element: <ProtectedRoute><Categories /></ProtectedRoute>,
      },
      {
        path: 'products',
        element: <ProtectedRoute><Products /></ProtectedRoute>,
      },
      {
        path: 'protection-plans',
        element: <ProtectedRoute><ProtectionPlans /></ProtectedRoute>,
      },
      {
        path: 'plans',
        element: <ProtectedRoute><Plans /></ProtectedRoute>,
      },
      {
        path: 'products/product-plans',
        element: <ProtectedRoute><ProductPlans /></ProtectedRoute>,
      },
      {
        path: 'customers',
        element: <ProtectedRoute><Customers /></ProtectedRoute>,
      },
      {
        path: 'tasks',
        element: <ProtectedRoute><Tasks /></ProtectedRoute>,
      },
      {
        path: 'users',
        element: <ProtectedRoute><Users /></ProtectedRoute>,
      },
      {
        path: 'role-permissions',
        element: <ProtectedRoute><RolePermissions /></ProtectedRoute>,
      },
      {
        path: 'role-permissions/:id',
        element: <ProtectedRoute><EditRole /></ProtectedRoute>,
      },
      {
        path: 'services',
        element: <ProtectedRoute><ServicesPage /></ProtectedRoute>,
      },
      {
        path: 'service-history',
        element: <ProtectedRoute><ServiceHistory /></ProtectedRoute>,
      },
    ],
  },
]); 