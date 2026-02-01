import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import {
  LayoutDashboard,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Menu,
  X,
  Sparkles,
  Mail,
  Users,
  Workflow,
  Crosshair,
  Bell,
  Layers,
  User,
  ChevronDown,
  Search,
} from "lucide-react";

interface LayoutProps {
  children: React.ReactNode;
}

const NavItem = ({
  to,
  icon,
  label,
  onClick,
}: {
  to: string;
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
}) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-sm font-medium ${
        isActive
          ? "bg-blue-600 text-white"
          : "text-slate-300 hover:text-white hover:bg-slate-700/50"
      }`}
    >
      <span className={`${isActive ? "text-white" : "text-slate-400"}`}>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
};

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const getPageTitle = () => {
    switch (location.pathname) {
      case "/":
        return "Dashboard";
      case "/campaigns":
        return "Campaigns";
      case "/generate":
        return "Content Generator";
      case "/audience":
        return "Audience Builder";
      case "/competitors":
        return "Competitor Analysis";
      case "/email":
        return "Email Marketing";
      case "/leads":
        return "Lead Management";
      case "/schedule":
        return "Scheduler";
      case "/automation":
        return "Automation";
      case "/analytics":
        return "Analytics";
      case "/settings":
        return "Settings";
      case "/reports":
        return "Reports";
      case "/notifications":
        return "Notifications";
      case "/activity":
        return "Activity Log";
      default:
        return "AutoMarketer";
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar - Desktop */}
      <aside className="w-64 hidden md:flex flex-col bg-slate-800 border-r border-slate-700">
        {/* Logo */}
        <div className="h-16 flex items-center px-5 border-b border-slate-700">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="text-lg font-semibold text-white">
              AutoMarketer
            </span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 py-2 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Main
          </div>
          <NavItem
            to="/"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
          />
          <NavItem
            to="/campaigns"
            icon={<Layers size={18} />}
            label="Campaigns"
          />
          <NavItem
            to="/generate"
            icon={<Sparkles size={18} />}
            label="Content Generator"
          />
          <NavItem
            to="/audience"
            icon={<User size={18} />}
            label="Audience Builder"
          />
          <NavItem
            to="/competitors"
            icon={<Crosshair size={18} />}
            label="Competitors"
          />
          <NavItem
            to="/email"
            icon={<Mail size={18} />}
            label="Email Marketing"
          />
          <NavItem to="/leads" icon={<Users size={18} />} label="Leads" />
          <NavItem
            to="/schedule"
            icon={<Calendar size={18} />}
            label="Scheduler"
          />

          <div className="px-3 py-2 mt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Tools
          </div>
          <NavItem
            to="/automation"
            icon={<Workflow size={18} />}
            label="Automation"
          />
          <NavItem
            to="/analytics"
            icon={<BarChart3 size={18} />}
            label="Analytics"
          />
          <NavItem
            to="/settings"
            icon={<Settings size={18} />}
            label="Settings"
          />
        </nav>

        {/* User Profile */}
        <div className="p-3 border-t border-slate-700">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-700/50 transition-colors cursor-pointer">
            <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
              {user?.name?.slice(0, 2)?.toUpperCase() || "U"}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-400 truncate">
                {user?.email || "user@company.com"}
              </p>
            </div>
            <button
              onClick={handleLogout}
              className="p-1.5 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded transition-colors"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-slate-800 z-50 transform transition-transform duration-300 md:hidden ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Sparkles size={18} className="text-white" />
            </div>
            <span className="font-semibold text-white">AutoMarketer</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 text-slate-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>
        <nav className="p-3 space-y-1">
          <NavItem
            to="/"
            icon={<LayoutDashboard size={18} />}
            label="Dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/campaigns"
            icon={<Layers size={18} />}
            label="Campaigns"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/generate"
            icon={<Sparkles size={18} />}
            label="Content Generator"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/audience"
            icon={<User size={18} />}
            label="Audience Builder"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/competitors"
            icon={<Crosshair size={18} />}
            label="Competitors"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/email"
            icon={<Mail size={18} />}
            label="Email Marketing"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/leads"
            icon={<Users size={18} />}
            label="Leads"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/schedule"
            icon={<Calendar size={18} />}
            label="Scheduler"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/automation"
            icon={<Workflow size={18} />}
            label="Automation"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/analytics"
            icon={<BarChart3 size={18} />}
            label="Analytics"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/settings"
            icon={<Settings size={18} />}
            label="Settings"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-slate-700">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-red-400 w-full text-sm font-medium px-3 py-2 hover:bg-slate-700/50 rounded-lg transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="p-2 text-slate-500 hover:text-slate-700 md:hidden"
            >
              <Menu size={20} />
            </button>
            <h1 className="text-lg font-semibold text-slate-900">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Search - Desktop only */}
            <div className="hidden md:flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-2">
              <Search size={16} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm text-slate-600 placeholder-slate-400 w-48"
              />
            </div>

            {/* Notifications */}
            <button
              onClick={() => navigate("/notifications")}
              className="relative p-2 text-slate-500 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Avatar - Desktop */}
            <div className="hidden md:flex items-center gap-2 pl-3 border-l border-slate-200">
              <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
                {user?.name?.slice(0, 2)?.toUpperCase() || "U"}
              </div>
              <span className="text-sm font-medium text-slate-700">
                {user?.name || "User"}
              </span>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-7xl mx-auto">{children}</div>
        </div>
      </main>
    </div>
  );
};
