import { FC } from 'react';
import { Outlet } from 'react-router-dom';  
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { GoogleOAuthProvider } from '@react-oauth/google';
import Layout from './components/Layout'; 

const App: FC = () => {
  const queryClient = new QueryClient();

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <QueryClientProvider client={queryClient}>
        <MantineProvider withGlobalStyles withNormalizeCSS>
          <Layout>
            <Outlet />  
          </Layout>
        </MantineProvider>
      </QueryClientProvider>
    </GoogleOAuthProvider>
  );
};

export default App;