import { useState } from "react";
import { Search, Filter, Plus, Mic } from "lucide-react";
import { ComplaintsTable } from "@/components/ComplaintsTable";
import { ComplaintDetailPanel } from "@/components/ComplaintDetailPanel";
import { AddComplaintModal } from "@/components/AddComplaintModal";
import { AudioComplaintModal, ExtractedComplaint } from "@/components/AudioComplaintModal";
import { mockComplaints } from "@/data/mockData";
import { Complaint } from "@/types/crm";

const Complaints = () => {
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [audioModalOpen, setAudioModalOpen] = useState(false);

  const statuses = ["All", "Pending", "Assigned", "In Progress", "Resolved", "Escalated"];

  const filtered = statusFilter === "All"
    ? mockComplaints
    : mockComplaints.filter((c) => c.status === statusFilter);

  return (
    <>
      <div className="flex h-screen">
        <div className="flex-1 overflow-auto p-6 space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-semibold text-foreground">Complaints</h1>
              <p className="text-xs text-muted-foreground font-mono mt-0.5">
                {mockComplaints.length} total grievances
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search by ID, title..."
                  className="h-9 w-64 rounded-md border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <button className="flex h-9 items-center gap-2 rounded-md border border-border bg-secondary px-3 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground">
                <Filter className="h-3.5 w-3.5" />
                Filter
              </button>
              <button
                onClick={() => setAddModalOpen(true)}
                className="flex h-9 items-center gap-2 rounded-md bg-primary px-4 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
              >
                <Plus className="h-3.5 w-3.5" />
                Add
              </button>
              <button
                onClick={() => setAudioModalOpen(true)}
                className="flex h-9 w-9 items-center justify-center rounded-md border border-primary/30 bg-primary/5 text-primary transition-colors hover:bg-primary/10"
              >
                <Mic className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Status tabs */}
          <div className="flex items-center gap-1 border-b border-border">
            {statuses.map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-2 text-xs font-medium transition-colors ${
                  statusFilter === s
                    ? "border-b-2 border-primary text-primary"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s}
                {s !== "All" && (
                  <span className="ml-1.5 font-mono text-muted-foreground">
                    {mockComplaints.filter((c) => c.status === s).length}
                  </span>
                )}
              </button>
            ))}
          </div>

          <ComplaintsTable
            complaints={filtered}
            onSelect={setSelectedComplaint}
            selectedId={selectedComplaint?.id}
          />
        </div>

        {selectedComplaint && (
          <div className="w-[420px] flex-shrink-0 h-screen overflow-hidden">
            <ComplaintDetailPanel
              complaint={selectedComplaint}
              onClose={() => setSelectedComplaint(null)}
            />
          </div>
        )}
      </div>

      <AddComplaintModal open={addModalOpen} onClose={() => setAddModalOpen(false)} />
      <AudioComplaintModal
        open={audioModalOpen}
        onClose={() => setAudioModalOpen(false)}
        onExtracted={(data) => {
          setAudioModalOpen(false);
          setAddModalOpen(true);
          // In a real app, this would pre-fill the form
        }}
      />
    </>
  );
};

export default Complaints;
