import { useState } from "react";
import { Bell, AlertTriangle, Clock, UserCheck, CheckCircle, Settings, Filter } from "lucide-react";
import { mockNotifications } from "@/data/mockData";

const typeConfig = {
  escalation: { icon: AlertTriangle, color: "text-destructive", bg: "bg-destructive/10" },
  warning: { icon: Clock, color: "text-warning", bg: "bg-warning/10" },
  assignment: { icon: UserCheck, color: "text-primary", bg: "bg-primary/10" },
  resolution: { icon: CheckCircle, color: "text-success", bg: "bg-success/10" },
  system: { icon: Settings, color: "text-muted-foreground", bg: "bg-secondary" },
};

const Notifications = () => {
  const [filter, setFilter] = useState<string>("All");
  const [notifications, setNotifications] = useState(mockNotifications);

  const filters = ["All", "Unread", "Escalation", "Warning", "Assignment", "Resolution"];
  const unreadCount = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    if (filter === "All") return true;
    if (filter === "Unread") return !n.read;
    return n.type === filter.toLowerCase();
  });

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const toggleRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  return (
    <div className="overflow-auto p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Notifications</h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {unreadCount} unread
          </p>
        </div>
        <button
          onClick={markAllRead}
          className="h-8 rounded-md border border-border bg-secondary px-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
        >
          Mark all read
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 border-b border-border">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-3 py-2 text-xs font-medium transition-colors ${
              filter === f
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {f}
            {f === "Unread" && unreadCount > 0 && (
              <span className="ml-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 font-mono text-[10px] text-destructive-foreground">
                {unreadCount}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Notification List */}
      <div className="space-y-2">
        {filtered.length === 0 ? (
          <div className="flex h-40 items-center justify-center">
            <p className="text-xs text-muted-foreground">No notifications</p>
          </div>
        ) : (
          filtered.map((n) => {
            const config = typeConfig[n.type];
            const IconComp = config.icon;

            return (
              <div
                key={n.id}
                onClick={() => toggleRead(n.id)}
                className={`flex items-start gap-4 rounded-lg border p-4 transition-colors cursor-pointer ${
                  n.read
                    ? "border-border bg-card hover:border-primary/20"
                    : "border-primary/20 bg-primary/5 hover:border-primary/40"
                }`}
              >
                <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-md ${config.bg}`}>
                  <IconComp className={`h-[18px] w-[18px] ${config.color}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className={`text-sm font-medium ${n.read ? "text-foreground" : "text-foreground"}`}>
                      {n.title}
                    </h4>
                    {!n.read && (
                      <span className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    )}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                    {n.message}
                  </p>
                  <p className="mt-1.5 font-mono text-[10px] text-muted-foreground">
                    {new Date(n.timestamp).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Notifications;
