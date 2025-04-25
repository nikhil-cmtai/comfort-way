import { createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layouts/RootLayout';

// Import your page components here
import Home from '../pages/home/Home';
import About from '../pages/about/about';
import Contact from '../pages/contact/contact';
import ExtendedWarranty from '../pages/extended-warranty/ExtendedWarranty';

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
        path: 'extended-warranty',
        element: <ExtendedWarranty />,
      },
    ],
  },
]); 