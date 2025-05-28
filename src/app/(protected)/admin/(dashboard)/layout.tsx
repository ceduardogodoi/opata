"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { LayoutDashboard, PawPrint, Users, LogOut, Menu } from "lucide-react";
import { PropsWithChildren, useState } from "react";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin/dashboard",
    color: "text-sky-500",
  },
  {
    label: "Animais",
    icon: PawPrint,
    href: "/admin/animals",
    color: "text-violet-500",
  },
  {
    label: "Usuários",
    icon: Users,
    href: "/admin/users",
    color: "text-pink-700",
  },
  {
    label: "Sair",
    icon: LogOut,
    href: "/api/sign-out",
    color: "text-red-500",
  },
];

export default function DashboardLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleNavigation = (href: string) => {
    setIsMobileMenuOpen(false);
    router.push(href);
  };

  return (
    <div className="h-full relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-[110] p-2 rounded-lg bg-white shadow-md"
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
        aria-controls="mobile-menu"
      >
        <Menu className="h-6 w-6 text-opata-green" />
      </button>

      {/* Backdrop for mobile */}
      {isMobileMenuOpen && (
        <div
          data-testid="mobile-backdrop"
          className="lg:hidden fixed inset-0 bg-black/50 z-[95]"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <div
        data-testid="mobile-sidebar"
        className={cn(
          "h-screen w-64 lg:h-full lg:w-64 lg:flex lg:flex-col lg:fixed lg:inset-y-0 z-[100] bg-white shadow-xl transition-transform duration-300 ease-in-out fixed top-0 left-0",
          isMobileMenuOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="px-3 py-6 flex-1">
            <div className="flex justify-center items-center pl-3 mb-14">
              <h1 className="text-2xl font-bold text-opata-green">Navegação</h1>
            </div>

            <nav className="space-y-1">
              {routes.map((route) => (
                <button
                  key={route.href}
                  onClick={() => handleNavigation(route.href)}
                  className={cn(
                    "text-sm group flex p-3 w-full justify-start font-medium cursor-pointer hover:text-white hover:bg-opata-green rounded-lg transition",
                    pathname === route.href
                      ? "text-white bg-opata-green"
                      : "text-zinc-700"
                  )}
                >
                  <div className="flex items-center flex-1">
                    <route.icon
                      className={cn(
                        "h-5 w-5 mr-3",
                        pathname === route.href ? "text-white" : route.color,
                        "group-hover:text-white"
                      )}
                    />
                    {route.label}
                  </div>
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <main className="w-full lg:pl-64 p-0 sm:p-4">{children}</main>
    </div>
  );
}
