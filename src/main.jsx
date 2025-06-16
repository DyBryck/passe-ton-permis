import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import App from "./App.jsx";
import Loader from "./components/base/Loader.jsx";
import { useThemeColor } from "./hooks/useThemeColor.jsx";
import {
  AddNotePage,
  HomePage,
  LandingPage,
  NotFoundPage,
  SignInPage,
  SignUpPage,
  UserPage,
} from "./pages/index.jsx";
import { requireAuth } from "./utils/utils.js";

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <LandingPage />,
      hydrateFallbackElement: <Loader />,
    },
    {
      path: "/app",
      element: <App />,
      loader: requireAuth,
      hydrateFallbackElement: <Loader />,
      children: [
        { path: "accueil", element: <HomePage /> },
        { path: "ajouter-une-note", element: <AddNotePage /> },
        { path: "profile", element: <UserPage /> },
      ],
    },
    {
      path: "/inscription",
      element: <SignUpPage />,
    },
    {
      path: "/connexion",
      element: <SignInPage />,
    },
    {
      path: "*",
      element: <NotFoundPage />,
    },
  ],
  {
    future: {
      v7_partialHydration: true,
    },
  },
);

function Root() {
  useThemeColor();
  return <RouterProvider router={router} />;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Root />
  </StrictMode>,
);
