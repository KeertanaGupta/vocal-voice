import { Complaint } from "@/types/crm";
import { StatusBadge, PriorityBadge } from "./StatusBadge";

interface ComplaintsTableProps {
  complaints: Complaint[];
  onSelect: (complaint: Complaint) => void;
  selectedId?: string;
}

export function ComplaintsTable({ complaints, onSelect, selectedId }: ComplaintsTableProps) {
  return (
    <div className="overflow-auto rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="sticky top-0 z-10 border-b border-border bg-card">
          <tr>
            {["ID", "Title", "Category", "Priority", "Department", "Status", "SLA Deadline"].map(
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
          {complaints.map((c) => (
            <tr
              key={c.id}
              onClick={() => onSelect(c)}
              className={`cursor-pointer transition-colors hover:bg-secondary/50 ${
                selectedId === c.id ? "bg-secondary" : ""
              }`}
            >
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-primary">
                {c.id}
              </td>
              <td className="max-w-[200px] truncate px-4 py-3 text-foreground">
                {c.title}
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                {c.category}
              </td>
              <td className="px-4 py-3">
                <PriorityBadge priority={c.priority} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 text-muted-foreground">
                {c.department}
              </td>
              <td className="px-4 py-3">
                <StatusBadge status={c.status} />
              </td>
              <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-muted-foreground">
                {new Date(c.slaDeadline).toLocaleDateString("en-IN", {
                  day: "2-digit",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
