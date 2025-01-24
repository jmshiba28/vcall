import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout = ({ header, footer }) => {
  return (
    <div className="main-layout">
      <header>{header}</header>
      <main>
        <Outlet />
      </main>
      <footer>{footer}</footer>
    </div>
  );
};

export default MainLayout;
