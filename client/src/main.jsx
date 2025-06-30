import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { HeroUIProvider } from '@heroui/react'
import { ToastProvider } from "@heroui/toast";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  useHref,
} from "react-router";
import HomePage from './pages/home'
import { getUserData, getUserProfile } from './lib/api';
import Layout from './pages/layout'
import AdminLanding from './pages/admin';
import Terms from './pages/terms';
import AdminUsers from './pages/admin/users';
import AdminUsersInspect from './pages/admin/user-inspect';

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
        path: "/terminos-y-condiciones",
        element: <Terms />,
      },
      {
        path: "/admin",
        loader: async () => {
          const profile = await getUserProfile();

          if (profile.isAdmin !== true) {
            return redirect("/")
          }

          return profile;
        },
        children: [
          {
            index: true,
            element: <AdminLanding />,
          },
          {
            path: "/admin/eventos",
            element: <AdminLanding />,
          },
          {
            path: "/admin/usuarios",
            element: <AdminUsers />,
          },
          {
            path: "/admin/usuarios/:uuid",
            loader: async ({ params }) => {
              const profile = await getUserData(params.uuid)

              return { profile };
            },
            element: <AdminUsersInspect />,
          },
        ]
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HeroUIProvider navigate={router.navigate} useHref={useHref}>
      <main className="text-foreground bg-background">
        <ToastProvider placement='top-center' toastOffset={64} />
        <RouterProvider router={router} />
      </main>
    </HeroUIProvider>
  </StrictMode>,
)
