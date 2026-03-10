interface StatusBadgeProps {
  status: string;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    Pending: "bg-muted text-muted-foreground",
    Assigned: "bg-primary/10 text-primary",
    "In Progress": "bg-primary/15 text-primary",
    Resolved: "bg-success/10 text-success",
    Closed: "bg-muted text-muted-foreground",
    Escalated: "bg-destructive/10 text-destructive",
  };

  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-medium ${
        styles[status] || styles.Pending
      }`}
    >
      {status}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: string;
}

export function PriorityBadge({ priority }: PriorityBadgeProps) {
  const styles: Record<string, string> = {
    Low: "bg-muted text-muted-foreground",
    Medium: "bg-warning/10 text-warning",
    High: "bg-warning/15 text-warning",
    Critical: "bg-destructive/10 text-destructive",
  };

  return (
    <span
      className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-medium ${
        styles[priority] || styles.Low
      }`}
    >
      {priority}
    </span>
  );
}
