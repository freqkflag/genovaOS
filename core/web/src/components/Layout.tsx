import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Server, Package, Store, Route, Key, ListTodo, FileText } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: Home },
    { path: '/nodes', label: 'Nodes', icon: Server },
    { path: '/apps', label: 'Apps', icon: Package },
    { path: '/catalog', label: 'Catalog', icon: Store },
    { path: '/routes', label: 'Routes', icon: Route },
    { path: '/secrets', label: 'Secrets', icon: Key },
    { path: '/jobs', label: 'Jobs', icon: ListTodo },
    { path: '/audit', label: 'Audit', icon: FileText },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      <aside className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <h1 className="text-2xl font-bold">Overseer</h1>
          <p className="text-gray-400 text-sm mt-1">Homelab Control Plane</p>
        </div>
        <nav className="mt-8">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center px-6 py-3 text-gray-300 hover:bg-gray-800 ${
                  isActive ? 'bg-gray-800 border-l-4 border-blue-500' : ''
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </Link>
            );
          })}
        </nav>
      </aside>
      <main className="flex-1 overflow-auto">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
