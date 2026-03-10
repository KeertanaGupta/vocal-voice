export interface Complaint {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: "Low" | "Medium" | "High" | "Critical";
  status: "Pending" | "Assigned" | "In Progress" | "Resolved" | "Closed" | "Escalated";
  department: string;
  slaDeadline: string;
  createdAt: string;
  updatedAt: string;
  citizenName: string;
  citizenEmail: string;
  citizenPhone: string;
  location: string;
  latitude: number;
  longitude: number;
  assignedOfficer?: string;
  escalationLevel: number;
  media?: string[];
  timeline?: TimelineEvent[];
}

export interface TimelineEvent {
  id: string;
  action: string;
  timestamp: string;
  actor: string;
  note?: string;
}

export interface KPIData {
  label: string;
  value: string | number;
  change: number;
  icon: string;
}

export interface Department {
  id: string;
  name: string;
  totalComplaints: number;
  resolved: number;
  pending: number;
  avgResolutionHours: number;
  slaCompliance: number;
}
