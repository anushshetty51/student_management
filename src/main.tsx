import { createRoot } from 'react-dom/client';
import { RouterProvider } from '@tanstack/react-router'; 
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { router } from './routes/router';
import './index.css'; // Global styles
import { GoogleOAuthProvider } from '@react-oauth/google';
// const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || 'your-default-client-id-here';



// Create a new instance of QueryClient
const queryClient = new QueryClient();

const Main = () => {
  return (
    // Wrap the RouterProvider with QueryClientProvider
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>

    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
    </GoogleOAuthProvider>

  );
};

// Create root and render the app to the DOM
createRoot(document.getElementById('root')!).render(<Main />);
