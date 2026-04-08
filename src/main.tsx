
  import { createRoot } from "react-dom/client";
  import { SiteConfigProvider } from "./config/SiteConfigContext";
  import App from "./app/App.tsx";
  import AdminDashboard from "./app/components/AdminDashboard";
  import "./styles/index.css";

  const isAdminRoute = window.location.pathname.startsWith("/admin");

  createRoot(document.getElementById("root")!).render(
    isAdminRoute ? (
      <AdminDashboard />
    ) : (
      <SiteConfigProvider>
        <App />
      </SiteConfigProvider>
    )
  );
  