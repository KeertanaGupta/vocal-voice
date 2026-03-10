import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  LineChart,
  Line,
} from "recharts";
import { mockDepartments, monthlyTrends, categoryDistribution, complaintActivityData } from "@/data/mockData";

const tooltipStyle = {
  backgroundColor: "hsl(228, 13%, 12%)",
  border: "1px solid hsl(224, 14%, 20%)",
  borderRadius: "6px",
  fontSize: "12px",
};

const axisTickStyle = { fontSize: 11, fill: "hsl(226, 12%, 53%)" };
const gridStroke = "hsl(224, 14%, 20%)";

const resolutionTimeData = [
  { dept: "Water", hours: 36 },
  { dept: "PWD", hours: 28 },
  { dept: "Sanitation", hours: 18 },
  { dept: "Electricity", hours: 42 },
  { dept: "Planning", hours: 72 },
];

const officerProductivity = [
  { name: "A. Sharma", resolved: 45, pending: 3 },
  { name: "V. Singh", resolved: 38, pending: 5 },
  { name: "R. Yadav", resolved: 52, pending: 2 },
  { name: "S. Pandey", resolved: 33, pending: 8 },
  { name: "D. Verma", resolved: 41, pending: 4 },
];

const Analytics = () => {
  return (
    <div className="overflow-auto p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Analytics</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">Performance & intelligence overview</p>
      </div>

      {/* Row 1: Trends + SLA */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Complaint Trends
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyTrends}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} />
              <XAxis dataKey="month" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <RechartsTooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="complaints" stroke="hsl(217, 91%, 60%)" fill="hsl(217, 91%, 60%)" fillOpacity={0.1} strokeWidth={2} />
              <Area type="monotone" dataKey="resolved" stroke="hsl(142, 71%, 45%)" fill="hsl(142, 71%, 45%)" fillOpacity={0.1} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            SLA Compliance by Department
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={mockDepartments}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
              <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} domain={[0, 100]} />
              <RechartsTooltip contentStyle={tooltipStyle} />
              <Bar dataKey="slaCompliance" fill="hsl(217, 91%, 60%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Row 2: Resolution Time + Dept Efficiency */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Avg Resolution Time (Hours)
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={resolutionTimeData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} horizontal={false} />
              <XAxis type="number" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis dataKey="dept" type="category" tick={axisTickStyle} axisLine={false} tickLine={false} width={80} />
              <RechartsTooltip contentStyle={tooltipStyle} />
              <Bar dataKey="hours" fill="hsl(38, 92%, 50%)" radius={[0, 3, 3, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Department Efficiency
          </h3>
          <div className="space-y-3">
            {mockDepartments.map((dept) => {
              const rate = Math.round((dept.resolved / dept.totalComplaints) * 100);
              return (
                <div key={dept.id}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs text-foreground">{dept.name}</span>
                    <span className="font-mono text-xs text-muted-foreground">{rate}%</span>
                  </div>
                  <div className="h-1.5 w-full rounded-full bg-secondary">
                    <div
                      className="h-full rounded-full bg-primary transition-all"
                      style={{ width: `${rate}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Row 3: Officer Productivity + Category Distribution */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Officer Productivity
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={officerProductivity}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
              <XAxis dataKey="name" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <RechartsTooltip contentStyle={tooltipStyle} />
              <Bar dataKey="resolved" fill="hsl(142, 71%, 45%)" radius={[3, 3, 0, 0]} />
              <Bar dataKey="pending" fill="hsl(0, 84%, 60%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="rounded-lg border border-border bg-card p-5">
          <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
            Category Distribution
          </h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={categoryDistribution}>
              <CartesianGrid strokeDasharray="3 3" stroke={gridStroke} vertical={false} />
              <XAxis dataKey="category" tick={axisTickStyle} axisLine={false} tickLine={false} />
              <YAxis tick={axisTickStyle} axisLine={false} tickLine={false} />
              <RechartsTooltip contentStyle={tooltipStyle} />
              <Bar dataKey="count" fill="hsl(217, 91%, 60%)" radius={[3, 3, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
