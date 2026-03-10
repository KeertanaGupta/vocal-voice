import { X, Clock, User, MapPin, AlertTriangle, ChevronRight } from "lucide-react";
import { Complaint } from "@/types/crm";
import { StatusBadge, PriorityBadge } from "./StatusBadge";

interface ComplaintDetailPanelProps {
  complaint: Complaint;
  onClose: () => void;
}

export function ComplaintDetailPanel({ complaint, onClose }: ComplaintDetailPanelProps) {
  const slaDate = new Date(complaint.slaDeadline);
  const now = new Date();
  const hoursRemaining = Math.max(0, Math.round((slaDate.getTime() - now.getTime()) / (1000 * 60 * 60)));
  const slaBreach = hoursRemaining === 0;

  return (
    <div className="flex h-full w-full flex-col border-l border-border bg-card animate-slide-in-right">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <div className="space-y-1">
          <p className="font-mono text-xs text-primary">{complaint.id}</p>
          <h2 className="text-sm font-semibold text-foreground">{complaint.title}</h2>
        </div>
        <button
          onClick={onClose}
          className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-5 space-y-6">
        {/* Status Row */}
        <div className="flex items-center gap-3">
          <StatusBadge status={complaint.status} />
          <PriorityBadge priority={complaint.priority} />
          {complaint.escalationLevel > 0 && (
            <span className="inline-flex items-center gap-1 rounded bg-destructive/10 px-2 py-0.5 font-mono text-xs text-destructive">
              <AlertTriangle className="h-3 w-3" />
              L{complaint.escalationLevel}
            </span>
          )}
        </div>

        {/* SLA Timer */}
        <div className={`rounded-md border p-4 ${slaBreach ? "border-destructive/30 bg-destructive/5" : "border-warning/30 bg-warning/5"}`}>
          <div className="flex items-center gap-2">
            <Clock className={`h-4 w-4 ${slaBreach ? "text-destructive" : "text-warning"}`} />
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">SLA Deadline</span>
          </div>
          <p className={`mt-1 font-mono text-lg font-semibold ${slaBreach ? "text-destructive" : "text-warning"}`}>
            {slaBreach ? "BREACHED" : `${hoursRemaining}h remaining`}
          </p>
          <p className="mt-0.5 font-mono text-xs text-muted-foreground">
            {slaDate.toLocaleString("en-IN")}
          </p>
        </div>

        {/* Description */}
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Description</h3>
          <p className="text-sm leading-relaxed text-foreground/80">{complaint.description}</p>
        </div>

        {/* Citizen Info */}
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Citizen</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <span className="text-foreground">{complaint.citizenName}</span>
            </div>
            <p className="pl-5 font-mono text-xs text-muted-foreground">{complaint.citizenEmail}</p>
            <p className="pl-5 font-mono text-xs text-muted-foreground">{complaint.citizenPhone}</p>
          </div>
        </div>

        {/* Location */}
        <div>
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Location</h3>
          <div className="flex items-center gap-2 text-sm">
            <MapPin className="h-3.5 w-3.5 text-muted-foreground" />
            <span className="text-foreground">{complaint.location}</span>
          </div>
          <div className="mt-2 h-32 rounded-md border border-border bg-secondary flex items-center justify-center">
            <span className="font-mono text-xs text-muted-foreground">
              {complaint.latitude.toFixed(4)}, {complaint.longitude.toFixed(4)}
            </span>
          </div>
        </div>

        {/* Assigned Officer */}
        {complaint.assignedOfficer && (
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Assigned Officer</h3>
            <div className="flex items-center gap-3 rounded-md border border-border bg-secondary p-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                {complaint.assignedOfficer.split(" ").map(n => n[0]).join("")}
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">{complaint.assignedOfficer}</p>
                <p className="text-xs text-muted-foreground">{complaint.department}</p>
              </div>
            </div>
          </div>
        )}

        {/* Timeline */}
        {complaint.timeline && complaint.timeline.length > 0 && (
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">Timeline</h3>
            <div className="space-y-0">
              {complaint.timeline.map((event, idx) => (
                <div key={event.id} className="relative flex gap-3 pb-4">
                  {idx < complaint.timeline!.length - 1 && (
                    <div className="absolute left-[7px] top-4 h-full w-px bg-border" />
                  )}
                  <div className="relative z-10 mt-1 flex h-3.5 w-3.5 flex-shrink-0 items-center justify-center">
                    <ChevronRight className="h-3 w-3 text-primary" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm text-foreground">{event.action}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-xs text-muted-foreground">
                        {new Date(event.timestamp).toLocaleString("en-IN", {
                          day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit"
                        })}
                      </span>
                      <span className="text-xs text-muted-foreground">· {event.actor}</span>
                    </div>
                    {event.note && (
                      <p className="mt-1 text-xs text-warning">{event.note}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
