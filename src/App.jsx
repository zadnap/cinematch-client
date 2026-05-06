import { Outlet } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PopupProvider } from './contexts/PopupContext';
import { useEffect, useState } from 'react';

function App() {
  const [Analytics, setAnalytics] = useState(null);

  useEffect(() => {
    if (import.meta.env.VITE_ENABLE_ANALYTICS === 'true') {
      import('@vercel/analytics/react').then((mod) => {
        setAnalytics(() => mod.Analytics);
      });
    }
  }, []);

  return (
    <AuthProvider>
      <PopupProvider>
        <Outlet />
        {Analytics && <Analytics />}
      </PopupProvider>
    </AuthProvider>
  );
}

export default App;
