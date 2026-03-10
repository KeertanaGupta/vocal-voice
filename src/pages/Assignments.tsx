import { Search, UserCheck, ArrowUpDown } from "lucide-react";
import { mockAssignments } from "@/data/mockData";
import { PriorityBadge } from "@/components/StatusBadge";

const Assignments = () => {
  return (
    <div className="overflow-auto p-6 space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-foreground">Assignments</h1>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">
            {mockAssignments.length} active assignments
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search officer, department..."
              className="h-9 w-64 rounded-md border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          <button className="flex h-9 items-center gap-2 rounded-md border border-border bg-secondary px-3 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
            <ArrowUpDown className="h-3.5 w-3.5" />
            Sort
          </button>
        </div>
      </div>

      {/* Assignments Table */}
      <div className="overflow-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="sticky top-0 z-10 border-b border-border bg-card">
            <tr>
              {["Assignment ID", "Complaint", "Officer", "Department", "Priority", "Assigned", "SLA Deadline", "Status"].map(
                (h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground"
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {mockAssignments.map((a) => {
              const slaDate = new Date(a.slaDeadline);
              const now = new Date();
              const hoursLeft = Math.max(0, Math.round((slaDate.getTime() - now.getTime()) / 3600000));
              const breach = hoursLeft === 0;

              return (
                <tr key={a.id} className="transition-colors hover:bg-secondary/50">
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                    {a.id}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-primary">
                    {a.complaintId}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
                        {a.officer.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <span className="text-foreground text-sm">{a.officer}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                    {a.department}
                  </td>
                  <td className="px-4 py-3">
                    <PriorityBadge priority={a.priority} />
                  </td>
                  <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                    {new Date(a.assignedAt).toLocaleDateString("en-IN", {
                      day: "2-digit",
                      month: "short",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="whitespace-nowrap px-4 py-3">
                    <span className={`font-mono text-xs font-medium ${breach ? "text-destructive" : "text-warning"}`}>
                      {breach ? "BREACHED" : `${hoursLeft}h left`}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-medium ${
                        a.status === "Escalated"
                          ? "bg-destructive/10 text-destructive"
                          : "bg-primary/10 text-primary"
                      }`}
                    >
                      {a.status}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Officer Workload Summary */}
      <div>
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
          Officer Workload
        </h3>
        <div className="grid grid-cols-5 gap-3">
          {[
            { name: "Amit Sharma", dept: "Water", active: 3, resolved: 45 },
            { name: "Vikram Singh", dept: "PWD", active: 2, resolved: 38 },
            { name: "Ramesh Yadav", dept: "Sanitation", active: 1, resolved: 52 },
            { name: "Suresh Pandey", dept: "Water", active: 4, resolved: 33 },
            { name: "Deepak Verma", dept: "Planning", active: 2, resolved: 41 },
          ].map((officer) => (
            <div key={officer.name} className="rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30">
              <div className="flex items-center gap-2 mb-3">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-[10px] font-medium text-primary">
                  {officer.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <p className="text-xs font-medium text-foreground">{officer.name}</p>
                  <p className="text-[10px] text-muted-foreground">{officer.dept}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-mono text-lg font-semibold text-foreground">{officer.active}</p>
                  <p className="text-[10px] text-muted-foreground">Active</p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-lg font-semibold text-success">{officer.resolved}</p>
                  <p className="text-[10px] text-muted-foreground">Resolved</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Assignments;
