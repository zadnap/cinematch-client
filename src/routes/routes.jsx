import App from '../App';
import Home from '../pages/Home/Home';
import Movie from '../pages/Movie/Movie';
import Trending from '../pages/Trending/Trending';
import Upcoming from '../pages/Upcoming/Upcoming';
import Favourites from '../pages/Favourites/Favourites';
import Search from '../pages/Search/Search';
import Error from '../pages/Error/Error';
import SignIn from '../pages/SignIn/SignIn';
import SignUp from '../pages/SignUp/SignUp';
import ForYou from '../pages/ForYou/ForYou';
import MainLayout from '../layouts/MainLayout/MainLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';
import { Navigate } from 'react-router-dom';
import Onboarding from '../pages/Onboarding/Onboarding';
import OnboardingRedirectGuard from './OnboardingRedirectGuard';
import GuestGuard from './GuestGuard';
import OnboardingGuard from './OnboardingGuard';

const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        element: (
          <OnboardingRedirectGuard>
            <MainLayout />
          </OnboardingRedirectGuard>
        ),
        children: [
          { index: true, element: <Home /> },
          { path: 'movie/:id', element: <Movie /> },
          { path: 'upcoming', element: <Upcoming /> },
          { path: 'trending', element: <Trending /> },
          { path: 'favourites', element: <Favourites /> },
          { path: 'search', element: <Search /> },
          { path: 'for-you', element: <ForYou /> },
        ],
      },
      {
        path: 'auth',
        element: (
          <GuestGuard>
            <AuthLayout />
          </GuestGuard>
        ),
        children: [
          { index: true, element: <Navigate to="sign-in" replace /> },
          { path: 'sign-in', element: <SignIn /> },
          { path: 'sign-up', element: <SignUp /> },
        ],
      },
      {
        path: 'onboarding',
        element: (
          <OnboardingGuard>
            <Onboarding />
          </OnboardingGuard>
        ),
      },
    ],
  },
];

export default routes;
