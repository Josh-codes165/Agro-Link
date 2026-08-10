import {
  LayoutDashboard,
  Bookmark,
  UserRoundPlus,
  CirclePlus,
  Send,
  CreditCard,
  ChartNoAxesColumnIncreasing,
  UserRound,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink } from "react-router-dom";

import "./FarmerSidebar.css";

function FarmerSidebar() {
  const menuItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "My listings",
      path: "/my-listings",
      icon: Bookmark,
    },
    {
      name: "Buyer requests",
      path: "/buyer-requests",
      icon: UserRoundPlus,
    },
    {
      name: "Orders",
      path: "/orders",
      icon: CirclePlus,
    },
    {
      name: "Messages",
      path: "/messages",
      icon: Send,
    },
    {
      name: "Payments",
      path: "/payments",
      icon: CreditCard,
    },
    {
      name: "Market insights",
      path: "/market-insights",
      icon: ChartNoAxesColumnIncreasing,
    },
  ];

  const bottomMenuItems = [
    {
      name: "Profile",
      path: "/profile",
      icon: UserRound,
    },
    {
      name: "Settings",
      path: "/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="farmer-sidebar">
      {/* Logo */}
      <div className="sidebar-logo">Ubani</div>

      {/* Main navigation */}
      <nav className="sidebar-navigation">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={25} strokeWidth={1.8} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom navigation */}
      <div className="sidebar-bottom">
        {bottomMenuItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <Icon size={25} strokeWidth={1.8} />

              <span>{item.name}</span>
            </NavLink>
          );
        })}

        {/* Logout */}
        <button className="sidebar-link logout-button">
          <LogOut size={25} strokeWidth={1.8} />

          <span>Log out</span>
        </button>
      </div>
    </aside>
  );
}

export default FarmerSidebar;
