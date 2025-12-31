import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  LayoutDashboard,
  FileText,
  Plus,
  Settings,
  LogOut,
  Menu,
  X,
  Shield,
  Users,
  ChevronDown,
  Bell,
} from 'lucide-react';
import vssLogo from '@/assets/vss-logo.png';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const userNavItems = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/dashboard/report', icon: Plus, label: 'New Report' },
    { href: '/dashboard/my-reports', icon: FileText, label: 'My Reports' },
  ];

  const adminNavItems = [
    { href: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
    { href: '/admin/reports', icon: FileText, label: 'All Reports' },
    { href: '/admin/users', icon: Users, label: 'Users' },
  ];

  const navItems = isAdmin ? adminNavItems : userNavItems;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <header className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-card border-b border-border z-50 px-4 flex items-center justify-between">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 hover:bg-muted rounded-lg transition-colors"
        >
          <Menu size={24} />
        </button>
        <img src={vssLogo} alt="VSS" className="h-8 w-auto" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-medium">
              {user?.email?.charAt(0).toUpperCase()}
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={handleSignOut}>
              <LogOut size={16} className="mr-2" />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-64 bg-card border-r border-border z-50 transform transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-border">
            <Link to="/" className="flex items-center gap-2">
              <img src={vssLogo} alt="VSS" className="h-8 w-auto" />
            </Link>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {isAdmin && (
              <div className="px-3 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                <Shield size={14} className="inline mr-2" />
                Admin Panel
              </div>
            )}
            {navItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-primary text-primary-foreground shadow-soft'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-muted transition-colors">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-white font-medium">
                    {user?.email?.charAt(0).toUpperCase()}
                  </div>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium text-foreground truncate">
                      {user?.email}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {isAdmin ? 'Administrator' : 'User'}
                    </p>
                  </div>
                  <ChevronDown size={16} className="text-muted-foreground" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard/settings">
                    <Settings size={16} className="mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut} className="text-destructive">
                  <LogOut size={16} className="mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:pl-64 pt-16 lg:pt-0 min-h-screen">
        <div className="p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
};

export default DashboardLayout;
