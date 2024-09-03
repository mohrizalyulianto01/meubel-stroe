import Header from "./components/Dashboard/Header.jsx";
import Sidebar from "./components/Dashboard/Sidebar.jsx";
import DashboardRouters from "./routers/DashboardRouters.jsx";
import "./styles/Dashboard.css";
import { useState } from "react";


const Admin = () => {
  const [openSidebarToggle, setOpenSidebarToggle] = useState(false);

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle);
  };

  return (
    <div className="grid-container container-fluid p-0">
      <Header OpenSidebar={OpenSidebar} />
      <Sidebar
        openSidebarToggle={openSidebarToggle}
        OpenSidebar={OpenSidebar}
      />
      <main className="p-3 text-bg-dark">
        <DashboardRouters />
      </main>
    </div>
  );
};

export default Admin;
