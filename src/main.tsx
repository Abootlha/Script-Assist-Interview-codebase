import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App'; 
import Landing from './pages/landing/Landing';
import LoginForm from './components/LoginForm'; 
import ResourceList from './components/ResourceList'; 
import ResourceDetail from './components/ResourceDetail'; 
import PrivateRoute from './components/PrivateRoute'; 

export const routes = [
  {
    path: '/',
    element: <App />, 
    children: [
      {
        path: '/',  
        element: <Landing />,
      },
      {
        path: '/login',
        element: <LoginForm />,
      },
      {
        path: '/resources',
        element: (
          <PrivateRoute>
            <ResourceList />
          </PrivateRoute>
        ),
      },
      {
        path: '/resources/:type/:id',
        element: (
          <PrivateRoute>
            <ResourceDetail />
          </PrivateRoute>
        ),
      },
    ],
  },
];

const router = createBrowserRouter(routes);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
      cacheTime: 1000 * 60 * 15,
    },
  },
});

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
);