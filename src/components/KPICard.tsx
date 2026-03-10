import { LucideIcon } from "lucide-react";

interface KPICardProps {
  label: string;
  value: string | number;
  change: number;
  icon: LucideIcon;
  variant?: "default" | "warning" | "destructive" | "success";
}

export function KPICard({ label, value, change, icon: Icon, variant = "default" }: KPICardProps) {
  const iconColors = {
    default: "text-primary bg-primary/10",
    warning: "text-warning bg-warning/10",
    destructive: "text-destructive bg-destructive/10",
    success: "text-success bg-success/10",
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30">
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {label}
          </p>
          <p className="font-mono text-2xl font-semibold text-foreground">{value}</p>
        </div>
        <div className={`flex h-9 w-9 items-center justify-center rounded-md ${iconColors[variant]}`}>
          <Icon className="h-[18px] w-[18px]" />
        </div>
      </div>
      <div className="mt-3 flex items-center gap-1.5">
        <span
          className={`font-mono text-xs font-medium ${
            change >= 0 ? "text-success" : "text-destructive"
          }`}
        >
          {change >= 0 ? "+" : ""}
          {change}%
        </span>
        <span className="text-xs text-muted-foreground">vs last week</span>
      </div>
    </div>
  );
}
