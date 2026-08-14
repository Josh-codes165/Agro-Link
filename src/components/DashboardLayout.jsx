import { useState } from 'react';
import { NavLink } from 'react-router-dom';
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
  Menu,
  X,
} from 'lucide-react';

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BookmarkPlus, label: 'My listings', href: '/listings' },
  { icon: UserRoundPlus, label: 'Buyer requests', href: '/requests' },
  { icon: CirclePlus, label: 'Orders', href: '/orders' },
  { icon: Send, label: 'Messages', href: '/messages' },
  { icon: CreditCard, label: 'Payments', href: '/payments' },
  {
    icon: ChartNoAxesCombined,
    label: 'Market insights',
    href: '/market-insights',
  },
];

export default function DashboardLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  const closeSidebar = () => setIsOpen(false);

  return (
    <div className="dashboard-shell">
      <div className="mobile-topbar">
        <div className="logo">Ubani</div>
        <button
          className="hamburger-btn"
          onClick={() => setIsOpen(true)}
          aria-label="Open menu">
          <Menu size={22} />
        </button>
      </div>

      {isOpen && <div className="sidebar-overlay" onClick={closeSidebar} />}

      <aside className={`sidebar${isOpen ? ' sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="logo">Ubani</div>
          <button
            className="close-btn"
            onClick={closeSidebar}
            aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <div className="sidebar-nav">
          <ul className="nav-group">
            {NAV_ITEMS.map(({ icon: Icon, label, href }) => (
              <li key={label}>
                <Icon size={18} />
                <NavLink
                  to={href}
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `nav-item${isActive ? ' active' : ''}`
                  }>
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <div className="nav-items2">
            <ul className="nav-group-2">
              <li>
                <UserRoundPen size={18} />
                <NavLink
                  to="/profile"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `nav-item${isActive ? ' active' : ''}`
                  }>
                  Profile
                </NavLink>
              </li>
              <li>
                <Settings size={18} />
                <NavLink
                  to="/settings"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `nav-item${isActive ? ' active' : ''}`
                  }>
                  Settings
                </NavLink>
              </li>
            </ul>

            <ul>
              <li>
                <LogOut size={18} />
                <NavLink
                  to="/login"
                  onClick={closeSidebar}
                  className={({ isActive }) =>
                    `nav-item${isActive ? ' active' : ''}`
                  }>
                  Log out
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </aside>

      <main className="main">{children}</main>
    </div>
  );
}
