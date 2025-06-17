import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroUIProvider } from '@heroui/react'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
import HomePage from './pages/home'
import { getUserProfile } from './lib/api';
import Layout from './pages/layout'
import AdminLanding from './pages/admin';

const router = createBrowserRouter([
  {
    element: <Layout />,
    loader: async () => {
      return { profile: await getUserProfile() };
    },
    children: [
      {
        path: "/",
        element: <HomePage />,
        loader: async () => {
          return { profile: await getUserProfile() };
        },
      },
      {
        path: "/admin",
        element: <AdminLanding />,
        loader: async () => {
          return { profile: await getUserProfile() };
        },
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider>
      <main className="text-foreground bg-background">
        <RouterProvider router={router} />
      </main>
    </HeroUIProvider>
  </StrictMode>,
)
