import { Clock, AlertTriangle, CheckCircle, XCircle } from "lucide-react";
import { mockComplaints } from "@/data/mockData";
import { PriorityBadge, StatusBadge } from "@/components/StatusBadge";

const SLAMonitor = () => {
  const now = new Date();

  const complaintsWithSLA = mockComplaints.map((c) => {
    const deadline = new Date(c.slaDeadline);
    const hoursLeft = Math.round((deadline.getTime() - now.getTime()) / 3600000);
    const percentUsed = Math.min(100, Math.max(0, 100 - (hoursLeft / 72) * 100));
    let slaStatus: "ok" | "warning" | "critical" | "breached" = "ok";
    if (hoursLeft <= 0) slaStatus = "breached";
    else if (hoursLeft <= 6) slaStatus = "critical";
    else if (hoursLeft <= 24) slaStatus = "warning";
    return { ...c, hoursLeft, percentUsed, slaStatus };
  }).sort((a, b) => a.hoursLeft - b.hoursLeft);

  const breached = complaintsWithSLA.filter((c) => c.slaStatus === "breached").length;
  const critical = complaintsWithSLA.filter((c) => c.slaStatus === "critical").length;
  const warning = complaintsWithSLA.filter((c) => c.slaStatus === "warning").length;
  const ok = complaintsWithSLA.filter((c) => c.slaStatus === "ok").length;

  const statusColors = {
    ok: { bar: "bg-success", text: "text-success", icon: CheckCircle },
    warning: { bar: "bg-warning", text: "text-warning", icon: Clock },
    critical: { bar: "bg-destructive", text: "text-destructive", icon: AlertTriangle },
    breached: { bar: "bg-destructive", text: "text-destructive", icon: XCircle },
  };

  return (
    <div className="overflow-auto p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">SLA Monitor</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">
          Real-time compliance tracking
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { label: "Breached", value: breached, color: "text-destructive", bg: "bg-destructive/10", icon: XCircle },
          { label: "Critical", value: critical, color: "text-destructive", bg: "bg-destructive/10", icon: AlertTriangle },
          { label: "Warning", value: warning, color: "text-warning", bg: "bg-warning/10", icon: Clock },
          { label: "On Track", value: ok, color: "text-success", bg: "bg-success/10", icon: CheckCircle },
        ].map((item) => (
          <div key={item.label} className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {item.label}
                </p>
                <p className={`font-mono text-2xl font-semibold mt-1 ${item.color}`}>{item.value}</p>
              </div>
              <div className={`flex h-9 w-9 items-center justify-center rounded-md ${item.bg}`}>
                <item.icon className={`h-[18px] w-[18px] ${item.color}`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* SLA Timeline Cards */}
      <div className="space-y-3">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Active SLA Timers
        </h3>
        {complaintsWithSLA.map((c) => {
          const config = statusColors[c.slaStatus];
          const IconComp = config.icon;

          return (
            <div
              key={c.id}
              className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30"
            >
              <div className="flex items-center gap-4">
                {/* Status Icon */}
                <div className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-md ${
                  c.slaStatus === "breached" ? "bg-destructive/10" :
                  c.slaStatus === "critical" ? "bg-destructive/10" :
                  c.slaStatus === "warning" ? "bg-warning/10" :
                  "bg-success/10"
                }`}>
                  <IconComp className={`h-5 w-5 ${config.text}`} />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-xs text-primary">{c.id}</span>
                    <span className="text-sm text-foreground truncate">{c.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{c.department}</span>
                    <span>·</span>
                    <span>{c.assignedOfficer || "Unassigned"}</span>
                  </div>
                </div>

                {/* Priority + Status */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <PriorityBadge priority={c.priority} />
                  <StatusBadge status={c.status} />
                </div>

                {/* SLA Timer */}
                <div className="flex-shrink-0 text-right w-28">
                  <p className={`font-mono text-lg font-semibold ${config.text}`}>
                    {c.slaStatus === "breached" ? "BREACHED" : `${c.hoursLeft}h`}
                  </p>
                  <p className="text-[10px] text-muted-foreground">
                    {new Date(c.slaDeadline).toLocaleString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-3">
                <div className="h-1 w-full rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full transition-all ${config.bar}`}
                    style={{ width: `${c.percentUsed}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SLAMonitor;
