import { useState } from "react";
import { X, Upload, MapPin, Mic } from "lucide-react";
import { toast } from "sonner";
import { AudioComplaintModal, ExtractedComplaint } from "./AudioComplaintModal";

interface AddComplaintModalProps {
  open: boolean;
  onClose: () => void;
}

const categories = [
  "Water Supply",
  "Road Maintenance",
  "Sanitation",
  "Electricity",
  "Building & Planning",
  "Sewage",
  "Other",
];

const priorities = ["Low", "Medium", "High", "Critical"];

export function AddComplaintModal({ open, onClose }: AddComplaintModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [priority, setPriority] = useState("");
  const [location, setLocation] = useState("");
  const [citizenName, setCitizenName] = useState("");
  const [citizenPhone, setCitizenPhone] = useState("");
  const [audioModalOpen, setAudioModalOpen] = useState(false);

  const handleAudioExtracted = (data: ExtractedComplaint) => {
    setTitle(data.title);
    setDescription(data.description);
    setCategory(data.category);
    setPriority(data.priority);
    setLocation(data.location);
  };

  const handleSubmit = () => {
    if (!title || !description || !category || !priority || !location) {
      toast.error("Please fill all required fields");
      return;
    }
    toast.success("Complaint submitted successfully");
    onClose();
    // Reset form
    setTitle("");
    setDescription("");
    setCategory("");
    setPriority("");
    setLocation("");
    setCitizenName("");
    setCitizenPhone("");
  };

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />

        <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-auto rounded-lg border border-border bg-card animate-fade-in">
          {/* Header */}
          <div className="sticky top-0 z-20 flex items-center justify-between border-b border-border bg-card px-6 py-4">
            <h2 className="text-sm font-semibold text-foreground">New Complaint</h2>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setAudioModalOpen(true)}
                className="flex h-8 items-center gap-2 rounded-md border border-primary/30 bg-primary/5 px-3 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
              >
                <Mic className="h-3.5 w-3.5" />
                Voice Input
              </button>
              <button
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Form */}
          <div className="p-6 space-y-4">
            {/* Title */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Brief complaint title"
                className="h-9 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                Description *
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Detailed description of the complaint..."
                rows={4}
                className="w-full rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary resize-none"
              />
            </div>

            {/* Category + Priority Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                  Category *
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="h-9 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                >
                  <option value="">Select category</option>
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                  Priority *
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="h-9 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary appearance-none"
                >
                  <option value="">Select priority</option>
                  {priorities.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Location */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                Location *
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Address or landmark"
                  className="h-9 w-full rounded-md border border-border bg-secondary pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Citizen Info */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                  Citizen Name
                </label>
                <input
                  type="text"
                  value={citizenName}
                  onChange={(e) => setCitizenName(e.target.value)}
                  placeholder="Full name"
                  className="h-9 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={citizenPhone}
                  onChange={(e) => setCitizenPhone(e.target.value)}
                  placeholder="+91 XXXXX XXXXX"
                  className="h-9 w-full rounded-md border border-border bg-secondary px-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                />
              </div>
            </div>

            {/* Media Upload */}
            <div>
              <label className="block text-xs font-medium uppercase tracking-wider text-muted-foreground mb-1.5">
                Attachments
              </label>
              <div className="flex h-20 items-center justify-center rounded-md border border-dashed border-border bg-background transition-colors hover:border-primary/50 cursor-pointer">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Upload className="h-4 w-4" />
                  <span className="text-xs">Drop files or click to upload images</span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 flex items-center justify-end gap-2 border-t border-border bg-card px-6 py-4">
            <button
              onClick={onClose}
              className="h-9 rounded-md border border-border bg-secondary px-4 text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="h-9 rounded-md bg-primary px-6 text-xs font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              Submit Complaint
            </button>
          </div>
        </div>
      </div>

      <AudioComplaintModal
        open={audioModalOpen}
        onClose={() => setAudioModalOpen(false)}
        onExtracted={handleAudioExtracted}
      />
    </>
  );
}
