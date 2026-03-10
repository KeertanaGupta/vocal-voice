import { useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  UserCheck,
  Building2,
  Clock,
  BarChart3,
  Bell,
  Settings,
  Shield,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/" },
  { icon: FileText, label: "Complaints", path: "/complaints" },
  { icon: UserCheck, label: "Assignments", path: "/assignments" },
  { icon: Building2, label: "Departments", path: "/departments" },
  { icon: Clock, label: "SLA Monitor", path: "/sla" },
  { icon: BarChart3, label: "Analytics", path: "/analytics" },
  { icon: Bell, label: "Notifications", path: "/notifications" },
  { icon: Settings, label: "Settings", path: "/settings" },
];

export function AppSidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 z-40 flex h-screen w-14 flex-col items-center border-r border-border bg-background py-4">
      {/* Logo */}
      <div className="mb-6 flex h-8 w-8 items-center justify-center rounded-md bg-primary">
        <Shield className="h-4 w-4 text-primary-foreground" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-1 flex-col items-center gap-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Tooltip key={item.path} delayDuration={0}>
              <TooltipTrigger asChild>
                <Link
                  to={item.path}
                  className={`relative flex h-10 w-10 items-center justify-center rounded-md transition-colors ${
                    isActive
                      ? "bg-secondary text-primary"
                      : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                  }`}
                >
                  {isActive && (
                    <span className="absolute left-0 h-5 w-0.5 rounded-r bg-primary" />
                  )}
                  <item.icon className="h-[18px] w-[18px]" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-card text-card-foreground border-border">
                {item.label}
              </TooltipContent>
            </Tooltip>
          );
        })}
      </nav>

      {/* User avatar */}
      <div className="mt-auto flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-xs font-medium text-foreground">
        AS
      </div>
    </aside>
  );
}
