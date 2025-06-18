import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroUIProvider } from '@heroui/react'
import {
  createBrowserRouter,
  RouterProvider,
  useHref,
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
      },
      {
        path: "/admin",
        element: <AdminLanding />,
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider navigate={router.navigate} useHref={useHref}>
      <main className="text-foreground bg-background">
        <RouterProvider router={router} />
      </main>
    </HeroUIProvider>
  </StrictMode>,
)
