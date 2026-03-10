import { Building2, Users, Clock, CheckCircle, AlertTriangle } from "lucide-react";
import { mockDepartments } from "@/data/mockData";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from "recharts";

const tooltipStyle = {
  backgroundColor: "hsl(228, 13%, 12%)",
  border: "1px solid hsl(224, 14%, 20%)",
  borderRadius: "6px",
  fontSize: "12px",
};
const axisTickStyle = { fontSize: 11, fill: "hsl(226, 12%, 53%)" };
const gridStroke = "hsl(224, 14%, 20%)";

const deptOfficers: Record<string, { name: string; role: string; active: number }[]> = {
  "Water Department": [
    { name: "Amit Sharma", role: "Senior Engineer", active: 3 },
    { name: "Suresh Pandey", role: "Field Inspector", active: 4 },
    { name: "Ravi Tiwari", role: "Junior Engineer", active: 1 },
  ],
  PWD: [
    { name: "Vikram Singh", role: "Executive Engineer", active: 2 },
    { name: "Ajay Mehta", role: "Site Supervisor", active: 3 },
  ],
  Sanitation: [
    { name: "Ramesh Yadav", role: "Zone Supervisor", active: 1 },
    { name: "Manoj Gupta", role: "Health Inspector", active: 2 },
  ],
  "Electricity Board": [
    { name: "Sanjay Joshi", role: "Line Inspector", active: 3 },
    { name: "Arun Verma", role: "Technician", active: 2 },
  ],
  "Urban Planning": [
    { name: "Deepak Verma", role: "Town Planner", active: 2 },
    { name: "Neha Kapoor", role: "Building Inspector", active: 1 },
  ],
};

const Departments = () => {
  return (
    <div className="overflow-auto p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Departments</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">
          {mockDepartments.length} departments active
        </p>
      </div>

      {/* Department Cards Grid */}
      <div className="grid grid-cols-2 gap-4">
        {mockDepartments.map((dept) => {
          const rate = Math.round((dept.resolved / dept.totalComplaints) * 100);
          const officers = deptOfficers[dept.name] || [];
          const slaOk = dept.slaCompliance >= 80;

          return (
            <div
              key={dept.id}
              className="rounded-lg border border-border bg-card p-5 transition-colors hover:border-primary/30"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-foreground">{dept.name}</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {officers.length} officers
                    </p>
                  </div>
                </div>
                <span
                  className={`inline-flex items-center rounded px-2 py-0.5 font-mono text-xs font-medium ${
                    slaOk ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                  }`}
                >
                  {dept.slaCompliance}% SLA
                </span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div>
                  <p className="font-mono text-lg font-semibold text-foreground">{dept.totalComplaints}</p>
                  <p className="text-[10px] text-muted-foreground">Total</p>
                </div>
                <div>
                  <p className="font-mono text-lg font-semibold text-success">{dept.resolved}</p>
                  <p className="text-[10px] text-muted-foreground">Resolved</p>
                </div>
                <div>
                  <p className="font-mono text-lg font-semibold text-warning">{dept.pending}</p>
                  <p className="text-[10px] text-muted-foreground">Pending</p>
                </div>
                <div>
                  <p className="font-mono text-lg font-semibold text-foreground">{dept.avgResolutionHours}h</p>
                  <p className="text-[10px] text-muted-foreground">Avg Time</p>
                </div>
              </div>

              {/* Resolution Rate Bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] text-muted-foreground">Resolution Rate</span>
                  <span className="font-mono text-xs text-muted-foreground">{rate}%</span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-secondary">
                  <div
                    className="h-full rounded-full bg-primary transition-all"
                    style={{ width: `${rate}%` }}
                  />
                </div>
              </div>

              {/* Officers */}
              <div className="space-y-2">
                <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                  Officers
                </span>
                {officers.map((o) => (
                  <div key={o.name} className="flex items-center justify-between rounded-md bg-secondary p-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-primary/10 text-[8px] font-medium text-primary">
                        {o.name.split(" ").map((n) => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-xs text-foreground">{o.name}</p>
                        <p className="text-[10px] text-muted-foreground">{o.role}</p>
                      </div>
                    </div>
                    <span className="font-mono text-xs text-muted-foreground">{o.active} active</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Department Performance Chart */}
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
          Department Performance Comparison
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={mockDepartments}>
            <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
            <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
            <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
            <RechartsTooltip contentStyle={tooltipStyle} />
            <Bar dataKey="resolved" fill="hsl(142, 71%, 45%)" name="Resolved" radius={[3, 3, 0, 0]} />
            <Bar dataKey="pending" fill="hsl(38, 92%, 50%)" name="Pending" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Departments;
