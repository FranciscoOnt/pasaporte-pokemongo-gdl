import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { HeroUIProvider } from "@heroui/react";
import { ToastProvider } from "@heroui/toast";
import {
  createBrowserRouter,
  redirect,
  RouterProvider,
  useHref,
} from "react-router";
import HomePage from "./pages/home";
import { getUserData, getUserProfile } from "./lib/api";
import Layout from "./pages/layout";
import AdminLanding from "./pages/admin";
import Terms from "./pages/terms";
import AdminUsers from "./pages/admin/users/users";
import AdminUsersInspect from "./pages/admin/users/user-inspect";
import AdminSites from "./pages/admin/sites/sites";
import AdminSitesEdit from "./pages/admin/sites/sites-edit";
import AdminCollections from "./pages/admin/collections/collections";
import AdminCollectionsEdit from "./pages/admin/collections/collections-edit";
import AdminSeals from "./pages/admin/seals/seals";
import AdminSealsEdit from "./pages/admin/seals/seals-edit";
import AdminSponsors from "./pages/admin/sponsors/sponsors";
import AdminSponsorsEdit from "./pages/admin/sponsors/sponsors-edit";
import AdminEvents from "./pages/admin/events/events";
import AdminEventsEdit from "./pages/admin/events/events-edit";
import AdminLists from "./pages/admin/lists";

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
        path: "/qr/:uuid",
        loader: async ({ params }) => {
          throw redirect(`/admin/usuarios/${params.uuid}`);
        },
        element: <div />,
      },
      {
        path: "/admin",
        loader: async () => {
          const profile = await getUserProfile();

          if (profile.isAdmin !== true) {
            return redirect("/");
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
              const profile = await getUserData(params.uuid);

              return { profile };
            },
            element: <AdminUsersInspect />,
          },
          {
            path: "/admin/lugares",
            element: <AdminSites />,
          },
          {
            path: "/admin/lugares/:uuid",
            loader: async ({ params }) => {
              const site =
                params.uuid !== "nuevo"
                  ? { uuid: params.uuid, displayName: "Test Site" }
                  : null;

              return { site };
            },
            element: <AdminSitesEdit />,
          },
          {
            path: "/admin/colecciones",
            element: <AdminCollections />,
          },
          {
            path: "/admin/colecciones/:uuid",
            loader: async ({ params }) => {
              const collection =
                params.uuid !== "nuevo"
                  ? { uuid: params.uuid, displayName: "Test Collection" }
                  : null;

              return { collection };
            },
            element: <AdminCollectionsEdit />,
          },
          {
            path: "/admin/sellos",
            element: <AdminSeals />,
          },
          {
            path: "/admin/sellos/:uuid",
            loader: async ({ params }) => {
              const seal =
                params.uuid !== "nuevo"
                  ? { uuid: params.uuid, displayName: "Test Seal" }
                  : null;

              return { seal };
            },
            element: <AdminSealsEdit />,
          },
          {
            path: "/admin/patrocinadores",
            element: <AdminSponsors />,
          },
          {
            path: "/admin/patrocinadores/:uuid",
            loader: async ({ params }) => {
              const sponsor =
                params.uuid !== "nuevo"
                  ? { uuid: params.uuid, displayName: "Test Sponsor" }
                  : null;

              return { sponsor };
            },
            element: <AdminSponsorsEdit />,
          },
          {
            path: "/admin/eventos",
            element: <AdminEvents />,
          },
          {
            path: "/admin/eventos/:uuid",
            loader: async ({ params }) => {
              const event =
                params.uuid !== "nuevo"
                  ? { uuid: params.uuid, displayName: "Test Event" }
                  : null;

              return { event };
            },
            element: <AdminEventsEdit />,
          },
          {
            path: "/admin/listas",
            element: <AdminLists />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <HeroUIProvider navigate={router.navigate} useHref={useHref}>
      <main className="text-foreground bg-background">
        <ToastProvider placement="top-center" toastOffset={64} />
        <RouterProvider router={router} />
      </main>
    </HeroUIProvider>
  </StrictMode>,
);
