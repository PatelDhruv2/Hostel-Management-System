"use client"
import { useState } from "react";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import GridViewRoundedIcon from "@mui/icons-material/GridViewRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import Link from "next/link";
import { toast, Bounce } from "react-toastify";
import { FaAccessibleIcon } from "react-icons/fa";
export default function AppSidebar() { 
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed((prevState) => !prevState);
  };
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        style={{
          position: "fixed",
          left: 0,
          top: 48,
          height: "100vh",
          zIndex: 1000,
          backgroundColor: "#FFFFFF",
          color: "#000000",
        }}
      >
        <Menu>
          <MenuItem
            className="menu1"
            icon={<MenuRoundedIcon />}
            onClick={toggleSidebar}
            style={{
              backgroundColor: "#e2e8f0",
              color: "#000",
            }}
          >
            <h2>Hostel Management System</h2>
          </MenuItem>
          <MenuItem
            icon={<GridViewRoundedIcon />}
            component={<Link href="/dashboard" passHref />}
            style={{
              backgroundColor: "#e2e8f0",
              color: "#000",
            }}
          >
            Dashboard
          </MenuItem>
          <MenuItem
            icon={<SpeedDialIcon />}
            component={<Link href="/Components/FeedBack" passHref />}
            style={{
              backgroundColor: "#e2e8f0",
              color: "#000",
            }}
          >
            FeedBack
          </MenuItem>
          <MenuItem
            icon={<FaAccessibleIcon />}
            component={<Link href="/Components/GatePass" passHref />}
            style={{
              backgroundColor: "#e2e8f0",
              color: "#000",
            }}
          >
            gatePass
          </MenuItem>
          <MenuItem
            icon={<ReceiptRoundedIcon />}
            component={<Link href="/Components/Fee_Payment" passHref />}
            style={{
              backgroundColor: "#e2e8f0",
              color: "#000",
            }}
          >
           Fee Payment
          </MenuItem>
          <MenuItem
            icon={<LogoutRoundedIcon />}
            component={<Link href="/signin" passHref />}
            onClick={() => {
              localStorage.clear();
              toast.success("Logged Out Successfully!", {
                position: "top-center",
                autoClose: 5000,
                theme: "dark",
                transition: Bounce,
              });
            }}
            style={{
              backgroundColor: "#e2e8f0",
              color: "#000",
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Sidebar>

      {/* Content Area */}
      <div
        style={{
          flex: 1,
          padding: "20px",
          marginLeft: collapsed ? "80px" : "240px",
          transition: "margin-left 0.3s ease-in-out",
        }}
      >
        {/* Content goes here */}
      </div>
    </div>
  );
}
