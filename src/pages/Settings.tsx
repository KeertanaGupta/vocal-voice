import { useState } from "react";
import { User, Shield, Bell, Palette, Database, Globe, Mail, Lock } from "lucide-react";
import { toast } from "sonner";

const SettingsPage = () => {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "security", label: "Security", icon: Lock },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "system", label: "System", icon: Database },
    { id: "roles", label: "Roles & Access", icon: Shield },
  ];

  return (
    <div className="overflow-auto p-6 space-y-6">
      <div>
        <h1 className="text-lg font-semibold text-foreground">Settings</h1>
        <p className="text-xs text-muted-foreground font-mono mt-0.5">
          System configuration & preferences
        </p>
      </div>

      <div className="flex gap-6">
        {/* Settings Tabs */}
        <div className="w-48 flex-shrink-0 space-y-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-secondary text-primary"
                  : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
              }`}
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 max-w-2xl">
          {activeTab === "profile" && <ProfileSettings />}
          {activeTab === "security" && <SecuritySettings />}
          {activeTab === "notifications" && <NotificationSettings />}
          {activeTab === "system" && <SystemSettings />}
          {activeTab === "roles" && <RolesSettings />}
        </div>
      </div>
    </div>
  );
};

function ProfileSettings() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Profile Information" />
      <div className="space-y-4">
        <div className="flex items-center gap-4 mb-6">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-lg font-semibold text-primary">
            AS
          </div>
          <div>
            <p className="text-sm font-medium text-foreground">Admin Sharma</p>
            <p className="text-xs text-muted-foreground font-mono">admin@pscrm.gov.in</p>
            <p className="text-[10px] text-muted-foreground mt-0.5">Role: System Administrator</p>
          </div>
        </div>
        <FormField label="Full Name" value="Admin Sharma" />
        <FormField label="Email" value="admin@pscrm.gov.in" />
        <FormField label="Phone" value="+91 98765 00001" />
        <FormField label="Department" value="Central Administration" />
        <SaveButton />
      </div>
    </div>
  );
}

function SecuritySettings() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Security" />
      <div className="space-y-4">
        <FormField label="Current Password" value="" type="password" placeholder="••••••••" />
        <FormField label="New Password" value="" type="password" placeholder="Enter new password" />
        <FormField label="Confirm Password" value="" type="password" placeholder="Re-enter new password" />
        <SaveButton label="Update Password" />
      </div>

      <SectionHeader title="Two-Factor Authentication" />
      <div className="rounded-md border border-border bg-secondary p-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-foreground">2FA Status</p>
            <p className="text-xs text-muted-foreground mt-0.5">Add extra security to your account</p>
          </div>
          <ToggleSwitch />
        </div>
      </div>

      <SectionHeader title="Active Sessions" />
      <div className="space-y-2">
        {[
          { device: "Chrome on Windows", ip: "192.168.1.100", time: "Active now" },
          { device: "Firefox on macOS", ip: "10.0.0.45", time: "2 hours ago" },
        ].map((s) => (
          <div key={s.device} className="flex items-center justify-between rounded-md border border-border bg-secondary p-3">
            <div>
              <p className="text-xs text-foreground">{s.device}</p>
              <p className="text-[10px] text-muted-foreground font-mono">{s.ip} · {s.time}</p>
            </div>
            <button className="text-xs text-destructive hover:underline">Revoke</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function NotificationSettings() {
  return (
    <div className="space-y-6">
      <SectionHeader title="Notification Preferences" />
      <div className="space-y-3">
        {[
          { label: "SLA Breach Alerts", desc: "Get notified when complaints breach SLA deadlines", default: true },
          { label: "Escalation Notifications", desc: "Alerts when complaints are escalated", default: true },
          { label: "New Assignment Alerts", desc: "Notification for new complaint assignments", default: true },
          { label: "Resolution Updates", desc: "When complaints are marked as resolved", default: false },
          { label: "System Maintenance", desc: "Scheduled maintenance and downtime alerts", default: false },
          { label: "Daily Digest", desc: "Daily summary of all complaint activity", default: true },
          { label: "High Volume Alerts", desc: "Alert when department receives unusual complaint volume", default: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-md border border-border bg-secondary p-3">
            <div>
              <p className="text-xs text-foreground">{item.label}</p>
              <p className="text-[10px] text-muted-foreground">{item.desc}</p>
            </div>
            <ToggleSwitch defaultOn={item.default} />
          </div>
        ))}
      </div>

      <SectionHeader title="Channels" />
      <div className="space-y-3">
        {[
          { label: "In-App Notifications", default: true },
          { label: "Email Notifications", default: true },
          { label: "SMS Alerts (Critical Only)", default: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-md border border-border bg-secondary p-3">
            <p className="text-xs text-foreground">{item.label}</p>
            <ToggleSwitch defaultOn={item.default} />
          </div>
        ))}
      </div>
    </div>
  );
}

function SystemSettings() {
  return (
    <div className="space-y-6">
      <SectionHeader title="SLA Configuration" />
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <FormField label="Critical SLA (hours)" value="24" />
          <FormField label="High SLA (hours)" value="48" />
          <FormField label="Medium SLA (hours)" value="72" />
          <FormField label="Low SLA (hours)" value="120" />
        </div>
        <SaveButton label="Update SLA Rules" />
      </div>

      <SectionHeader title="Escalation Rules" />
      <div className="space-y-3">
        {[
          { level: "Level 1 → 2", rule: "No officer response within 12 hours" },
          { level: "Level 2 → 3", rule: "No resolution within 75% of SLA window" },
          { level: "Level 3 → Admin", rule: "SLA breach with no action plan" },
        ].map((r) => (
          <div key={r.level} className="flex items-center justify-between rounded-md border border-border bg-secondary p-3">
            <div>
              <p className="text-xs font-medium text-foreground">{r.level}</p>
              <p className="text-[10px] text-muted-foreground">{r.rule}</p>
            </div>
            <button className="text-xs text-primary hover:underline">Edit</button>
          </div>
        ))}
      </div>

      <SectionHeader title="AI Configuration" />
      <div className="space-y-3">
        {[
          { label: "Auto-Classification", desc: "AI automatically classifies complaint category", default: true },
          { label: "Priority Scoring", desc: "AI assigns priority based on complaint analysis", default: true },
          { label: "Duplicate Detection", desc: "Flag potential duplicate complaints", default: true },
          { label: "Voice Transcription", desc: "Enable voice-to-text for complaint intake", default: true },
        ].map((item) => (
          <div key={item.label} className="flex items-center justify-between rounded-md border border-border bg-secondary p-3">
            <div>
              <p className="text-xs text-foreground">{item.label}</p>
              <p className="text-[10px] text-muted-foreground">{item.desc}</p>
            </div>
            <ToggleSwitch defaultOn={item.default} />
          </div>
        ))}
      </div>
    </div>
  );
}

function RolesSettings() {
  const roles = [
    { role: "Admin", users: 2, permissions: "Full system access, user management, configuration" },
    { role: "Supervisor", users: 8, permissions: "Department management, assignment, escalation" },
    { role: "Officer", users: 25, permissions: "View/update assigned complaints, field reports" },
    { role: "Citizen", users: 1240, permissions: "Submit complaints, track status, feedback" },
  ];

  return (
    <div className="space-y-6">
      <SectionHeader title="Roles & Permissions" />
      <div className="space-y-3">
        {roles.map((r) => (
          <div key={r.role} className="rounded-md border border-border bg-secondary p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Shield className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-medium text-foreground">{r.role}</span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">{r.users} users</span>
            </div>
            <p className="text-xs text-muted-foreground">{r.permissions}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Shared components
function SectionHeader({ title }: { title: string }) {
  return (
    <h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground border-b border-border pb-2">
      {title}
    </h3>
  );
}

function FormField({ label, value, type = "text", placeholder }: { label: string; value: string; type?: string; placeholder?: string }) {
  const [val, setVal] = useState(value);
  return (
    <div>
      <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={val}
        onChange={(e) => setVal(e.target.value)}
        placeholder={placeholder}
        className="h-9 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
      />
    </div>
  );
}

function SaveButton({ label = "Save Changes" }: { label?: string }) {
  return (
    <button
      onClick={() => toast.success("Settings saved")}
      className="h-9 rounded-md bg-primary px-5 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
    >
      {label}
    </button>
  );
}

function ToggleSwitch({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <button
      onClick={() => setOn(!on)}
      className={`relative inline-flex h-5 w-9 flex-shrink-0 items-center rounded-full transition-colors ${
        on ? "bg-primary" : "bg-border"
      }`}
    >
      <span
        className={`inline-block h-3.5 w-3.5 rounded-full bg-foreground transition-transform ${
          on ? "translate-x-[18px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

export default SettingsPage;
