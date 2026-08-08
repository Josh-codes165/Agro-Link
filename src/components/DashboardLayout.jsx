import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  BookmarkPlus,
  UserRoundPlus,
  CirclePlus,
  Send,
  CreditCard,
  ChartNoAxesCombined,
  UserRoundPen,
  Settings,
  LogOut,
} from "lucide-react";
import "../../src/";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/dashboard" },
  { icon: BookmarkPlus, label: "My listings", href: "/listings" },
  { icon: UserRoundPlus, label: "Buyer requests", href: "/buyer-requests" },
  { icon: CirclePlus, label: "Orders", href: "/orders" },
  { icon: Send, label: "Messages", href: "/messages" },
  { icon: CreditCard, label: "Payments", href: "/payments" },
  { icon: ChartNoAxesCombined, label: "Market insights", href: "/insights" },
]
export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-shell">
      {/* Sidebar navigation — fixed across all dashboard pages */}
      <aside className="sidebar">
        <div className="logo">Ubani</div>

        <div className="sidebar-nav">
          <ul className="nav-group">
            {NAV_ITEMS.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Icon size={18} />
                <NavLink
                  to={href}
                  className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}`
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <ul className="nav-items2">
            <div className="nav-group-2">
              <li>
                <UserRoundPen size={18} />
                <NavLink
                  to="/profile"
                  className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}`
                  }
                >
                  Profile
                </NavLink>
              </li>
              <li>
                <Settings size={18} />
                <NavLink
                  to="/settings"
                  className={({ isActive }) =>
                    `nav-item${isActive ? " active" : ""}`
                  }
                >
                  Settings
                </NavLink>
              </li>
            </div>

            <li>
              <LogOut size={18} />
              <a className="nav-item" href="/logout">Log out</a>
            </li>
          </ul>
        </div>
      </aside>

      {/* Page content — changes per dashboard page */}
      <main className="main">{children}</main>
    </div>
  );
}
