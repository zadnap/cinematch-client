import { Outlet } from 'react-router-dom';
import { Analytics } from '@vercel/analytics/react';
import { AuthProvider } from './contexts/AuthContext';
import { PopupProvider } from './contexts/PopupContext';

function App() {
  return (
    <AuthProvider>
      <PopupProvider>
        <Outlet />
        <Analytics />
      </PopupProvider>
    </AuthProvider>
  );
}

export default App;
