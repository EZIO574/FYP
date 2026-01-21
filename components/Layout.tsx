import React, { useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import {
  LayoutDashboard,
  Calendar,
  BarChart3,
  Settings,
  LogOut,
  Hexagon,
  Menu,
  X,
  Sparkles,
  Mail,
  Users,
  Workflow,
  Crosshair,
  Bell,
  Layers,
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
    <NavLink
      to={to}
      onClick={onClick}
      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group text-sm font-medium relative
        ${
          isActive
            ? "bg-white/10 text-white shadow-lg backdrop-blur-sm border border-white/10"
            : "text-slate-400 hover:text-white hover:bg-white/5"
        }`}
    >
      <span className="relative z-10 transition-transform duration-300 group-hover:scale-110 group-active:scale-95">
        {icon}
      </span>
      <span className="relative z-10">{label}</span>
      {isActive && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-blue-500 rounded-r-full shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
      )}
    </NavLink>
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
        return "Campaign Manager";
      case "/generate":
        return "AI Studio";
      case "/competitors":
        return "Competitor Analysis";
      case "/email":
        return "Email Campaigns";
      case "/leads":
        return "Lead Manager";
      case "/schedule":
        return "Scheduler";
      case "/automation":
        return "Automation Hub";
      case "/analytics":
        return "Analytics";
      case "/settings":
        return "Settings";
      default:
        return "AutoMarketer";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-slate-100 font-sans selection:bg-purple-500/30">
      {/* Sidebar - Desktop */}
      <aside className="w-72 hidden md:flex flex-col z-20 m-4 rounded-2xl glass-panel border-r-0">
        <div className="p-6 pb-2">
          <div className="flex items-center gap-3 px-2">
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20">
              <Hexagon size={24} strokeWidth={2.5} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white tracking-tight font-display leading-none">
                AutoMarketer
              </h1>
              <span className="text-xs text-blue-300 font-medium tracking-wider uppercase opacity-80">
                AI Powered
              </span>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-6 scrollbar-hide">
          <div className="px-4 py-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
            Platform
          </div>
          <NavItem
            to="/"
            icon={<LayoutDashboard size={20} />}
            label="Overview"
          />
          <NavItem
            to="/campaigns"
            icon={<Layers size={20} />}
            label="Campaigns"
          />
          <NavItem
            to="/generate"
            icon={<Sparkles size={20} />}
            label="AI Studio"
          />
          <NavItem
            to="/competitors"
            icon={<Crosshair size={20} />}
            label="Competitors"
          />
          <NavItem to="/audience" icon={<Users size={20} />} label="Audience" />
          <NavItem
            to="/email"
            icon={<Mail size={20} />}
            label="Email Marketing"
          />
          <NavItem
            to="/leads"
            icon={<Users size={20} />}
            label="Lead Scoring"
          />
          <NavItem
            to="/schedule"
            icon={<Calendar size={20} />}
            label="Scheduler"
          />

          <div className="px-4 py-2 mt-6 text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">
            System
          </div>
          <NavItem
            to="/automation"
            icon={<Workflow size={20} />}
            label="Automation Hub"
          />
          <NavItem
            to="/analytics"
            icon={<BarChart3 size={20} />}
            label="Analytics"
          />
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
          />
        </nav>

        <div className="p-4 border-t border-white/10 mx-4 mb-2">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors border border-white/5 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold uppercase shadow-lg">
              {user?.name.slice(0, 2) || "US"}
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-semibold text-white truncate group-hover:text-blue-300 transition-colors">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-slate-400 truncate">Project Lead</p>
            </div>
            <button
              onClick={handleLogout}
              className="text-slate-400 hover:text-red-400 transition-colors p-1.5 hover:bg-white/5 rounded-lg"
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
          className="fixed inset-0 bg-slate-900/60 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-72 glass-panel z-50 transform transition-transform duration-300 md:hidden ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-blue-600 to-purple-600 p-2 rounded-lg text-white">
              <Hexagon size={20} />
            </div>
            <span className="text-lg font-bold text-white">AutoMarketer</span>
          </div>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>
        <nav className="p-4 space-y-1">
          <NavItem
            to="/"
            icon={<LayoutDashboard size={20} />}
            label="Dashboard"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/campaigns"
            icon={<Layers size={20} />}
            label="Campaigns"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/generate"
            icon={<Sparkles size={20} />}
            label="AI Studio"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/competitors"
            icon={<Crosshair size={20} />}
            label="Competitors"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/email"
            icon={<Mail size={20} />}
            label="Email Marketing"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/leads"
            icon={<Users size={20} />}
            label="Lead Scoring"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/schedule"
            icon={<Calendar size={20} />}
            label="Scheduler"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/automation"
            icon={<Workflow size={20} />}
            label="Automation Hub"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/analytics"
            icon={<BarChart3 size={20} />}
            label="Analytics"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <NavItem
            to="/settings"
            icon={<Settings size={20} />}
            label="Settings"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </nav>
        <div className="p-4 border-t border-white/10">
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-red-400 w-full text-sm font-medium px-4 py-2 hover:bg-white/5 rounded-lg transition-colors"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 relative z-10 overflow-hidden">
        {/* Mobile Header */}
        <header className="h-16 flex items-center justify-between px-4 md:hidden glass-panel mb-4 mx-4 mt-4 rounded-xl sticky top-4 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="text-slate-300 hover:text-white"
            >
              <Menu size={24} />
            </button>
            <span className="font-bold text-white text-lg">
              {getPageTitle()}
            </span>
          </div>
          <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold uppercase">
            {user?.name.slice(0, 2) || "AM"}
          </div>
        </header>

        {/* Desktop Header */}
        <div className="hidden md:flex items-center justify-between py-4 px-6 mt-4 mr-4">
          <h2 className="text-2xl font-bold text-slate-800 tracking-tight font-display">
            {getPageTitle()}
          </h2>
          <div className="flex items-center gap-4">
            <button className="relative p-2 text-slate-500 hover:text-slate-800 transition-colors hover:bg-white rounded-full">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-100 pointer-events-none"></span>
            </button>
            <div className="h-6 w-px bg-slate-200" />
            <span className="text-sm text-slate-500">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto px-4 md:px-6 md:mr-4 pb-6">
          <div className="max-w-7xl mx-auto h-full">{children}</div>
        </div>
      </main>
    </div>
  );
};
