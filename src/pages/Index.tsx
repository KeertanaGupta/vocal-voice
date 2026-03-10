import { useState } from "react";
import { FileText, AlertTriangle, Clock, TrendingUp, Search, Plus, Mic } from "lucide-react";
import { KPICard } from "@/components/KPICard";
import { ComplaintsTable } from "@/components/ComplaintsTable";
import { ComplaintDetailPanel } from "@/components/ComplaintDetailPanel";
import { mockComplaints, complaintActivityData, categoryDistribution } from "@/data/mockData";
import { Complaint } from "@/types/crm";
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
} from "recharts";

const Dashboard = () => {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  return (
    <div className="flex h-screen">
      <div className={`flex-1 overflow-auto transition-all ${selectedComplaint ? "mr-0" : ""}`}>
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-foreground">Command Center</h1>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                {new Date().toLocaleDateString("en-IN", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search complaints..."
                  className="h-9 w-64 rounded-md border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button className="flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90">
                <Plus className="h-3.5 w-3.5" />
                New Complaint
              </button>
              <button className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-secondary text-muted-foreground transition-colors hover:border-primary hover:text-primary">
                <Mic className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-4">
            <KPICard label="Total Complaints" value="1,247" change={12} icon={FileText} />
            <KPICard label="Active Complaints" value="183" change={-5} icon={TrendingUp} variant="warning" />
            <KPICard label="SLA Compliance" value="84.2%" change={3} icon={Clock} variant="success" />
            <KPICard label="Escalated" value="23" change={18} icon={AlertTriangle} variant="destructive" />
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-5 gap-4">
            {/* Activity Chart */}
            <div className="col-span-3 rounded-lg border border-border bg-card p-5">
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
                Complaint Activity
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={complaintActivityData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(224, 14%, 20%)" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: "hsl(226, 12%, 53%)" }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 11, fill: "hsl(226, 12%, 53%)" }} axisLine={false} tickLine={false} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(228, 13%, 12%)",
                      border: "1px solid hsl(224, 14%, 20%)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Area type="monotone" dataKey="filed" stroke="hsl(217, 91%, 60%)" fill="hsl(217, 91%, 60%)" fillOpacity={0.1} strokeWidth={2} />
                  <Area type="monotone" dataKey="resolved" stroke="hsl(142, 71%, 45%)" fill="hsl(142, 71%, 45%)" fillOpacity={0.1} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Category Distribution */}
            <div className="col-span-2 rounded-lg border border-border bg-card p-5">
              <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
                By Category
              </h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={categoryDistribution} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(224, 14%, 20%)" horizontal={false} />
                  <XAxis type="number" tick={{ fontSize: 11, fill: "hsl(226, 12%, 53%)" }} axisLine={false} tickLine={false} />
                  <YAxis dataKey="category" type="category" tick={{ fontSize: 11, fill: "hsl(226, 12%, 53%)" }} axisLine={false} tickLine={false} width={90} />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: "hsl(228, 13%, 12%)",
                      border: "1px solid hsl(224, 14%, 20%)",
                      borderRadius: "6px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="count" fill="hsl(217, 91%, 60%)" radius={[0, 3, 3, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Heatmap placeholder */}
          <div className="rounded-lg border border-border bg-card p-5">
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-4">
              Complaint Heatmap
            </h3>
            <div className="grid grid-cols-12 gap-1">
              {Array.from({ length: 84 }, (_, i) => {
                const intensity = Math.random();
                let bg = "bg-secondary";
                if (intensity > 0.8) bg = "bg-destructive/60";
                else if (intensity > 0.6) bg = "bg-warning/40";
                else if (intensity > 0.3) bg = "bg-primary/20";
                return (
                  <div
                    key={i}
                    className={`h-6 rounded-sm ${bg} transition-colors hover:ring-1 hover:ring-primary/50`}
                  />
                );
              })}
            </div>
            <div className="mt-3 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-secondary" /> Low</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-primary/20" /> Medium</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-warning/40" /> High</span>
              <span className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-destructive/60" /> Critical</span>
            </div>
          </div>

          {/* Recent Complaints */}
          <div>
            <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-3">
              Recent Complaints
            </h3>
            <ComplaintsTable
              complaints={mockComplaints}
              onSelect={setSelectedComplaint}
              selectedId={selectedComplaint?.id}
            />
          </div>
        </div>
      </div>

      {/* Detail Panel */}
      {selectedComplaint && (
        <div className="w-[420px] flex-shrink-0 h-screen overflow-hidden">
          <ComplaintDetailPanel
            complaint={selectedComplaint}
            onClose={() => setSelectedComplaint(null)}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
