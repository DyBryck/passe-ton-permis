import { useEffect } from "react";
import { Outlet, useLoaderData, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Navbar from "./components/Navbar";

const App = () => {
  const { pathname } = useLocation();
  const user = useLoaderData();

  useEffect(() => {
    const container = document.getElementById("scrollable-container");
    if (container) {
      container.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
  }, [pathname]);

  return (
    <>
      <Layout>
        <Outlet context={user} />
      </Layout>
      <Navbar />
    </>
  );
};

export default App;
