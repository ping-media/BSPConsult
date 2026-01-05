import { useRoutes } from 'react-router-dom';
import AuthGuard from '../auth/AuthGuard';
import GuestGuard from '../auth/GuestGuard';
// layouts
import MainLayout from '../layouts/main';
//
import {
  LandingPage,
  RegisterPage,
  LoginPage,
  TermsPage,
  PolicyPage,
  HomePage,
  PackagesPage,
  LockPage,
  SuccessPage,
} from './elements';

// ----------------------------------------------------------------------

export default function Router() {
  return useRoutes([
    {
      path: 'register',
      children: [
        {
          element: (
            <GuestGuard>
              <RegisterPage />
            </GuestGuard>
          ),
          index: true,
        },
      ],
    },
    {
      path: 'login',
      children: [
        {
          element: (
            <GuestGuard>
              <LoginPage />
            </GuestGuard>
          ),
          index: true,
        },
      ],
    },
    // Main layout
    {
      element: <MainLayout />,
      children: [{ element: <LandingPage />, index: true }],
    },
    {
      path: 'terms-and-conditions',
      element: <MainLayout />,
      children: [{ element: <TermsPage />, index: true }],
    },
    {
      path: 'privacy-policy',
      element: <MainLayout />,
      children: [{ element: <PolicyPage />, index: true }],
    },
    {
      path: 'home',
      children: [
        {
          element: (
            <AuthGuard>
              <HomePage />
            </AuthGuard>
          ),
          index: true,
        },
      ],
    },
    {
      path: 'check-out',
      children: [
        {
          element: (
            <GuestGuard>
              <PackagesPage />
            </GuestGuard>
          ),
          index: true,
        },
      ],
    },
    {
      path: 'lock',
      children: [
        {
          element: (
            <AuthGuard>
              <LockPage />
            </AuthGuard>
          ),
          index: true,
        },
      ],
    },
    {
      path: 'success',
      children: [
        {
          element: (
            <GuestGuard>
              <SuccessPage />
            </GuestGuard>
          ),
          index: true,
        },
      ],
    },
  ]);
}
