import { FC } from 'react';
import { Outlet } from 'react-router-dom';  
import { MantineProvider } from '@mantine/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Layout from './components/Layout'; 

const App: FC = () => {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Layout>
        <Outlet />  
      </Layout>
    </MantineProvider>
  );
};

export default App;