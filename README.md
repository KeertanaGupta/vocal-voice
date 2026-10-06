# PS-CRM: Smart Public Service Command Center

> A grievance-management dashboard for government departments. Officials can track citizen complaints, assign them to departments, monitor SLA deadlines, and file new complaints **by voice in Hindi or English**.

![React](https://img.shields.io/badge/React_18-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?logo=tailwindcss&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000000)

> **Status:** frontend prototype. All data comes from `src/data/mockData.ts`, and the voice-to-complaint step is simulated (see [Voice Complaint Intake](#-voice-complaint-intake)). There is no backend yet.

---

## ✨ Features

| Page | What it does |
|---|---|
| **Command Center** (`/`) | KPI cards and charts summarising complaint volume, status and trends |
| **Complaints** (`/complaints`) | Complaint table with status filters, a detail panel (citizen, location, assigned officer, timeline) and a form to add new complaints |
| **Assignments** (`/assignments`) | Which officer is handling which complaint |
| **Departments** (`/departments`) | Per-department load, resolution rate, average resolution time and SLA compliance |
| **SLA Monitor** (`/sla`) | Complaints grouped as Breached, Critical, Warning or On Track against their deadline |
| **Analytics** (`/analytics`) | Area, bar and line charts (Recharts) |
| **Notifications** (`/notifications`) | Escalation and assignment alerts |
| **Settings** (`/settings`) | Profile, security, notifications, system, and roles & access tabs |

Each complaint tracks priority (Low → Critical), status (Pending → Assigned → In Progress → Resolved / Closed, or Escalated), department, SLA deadline, escalation level, GPS coordinates and a full activity timeline.

---

## 🎙️ Voice Complaint Intake

From **Complaints → Add Complaint → Record**, an official can speak a complaint instead of typing it:

1. The browser records audio from the microphone, with a live waveform and timer (Web Audio API + MediaRecorder).
2. The recording is turned into a transcript, and the **title, description, category, priority and location** are extracted from it.
3. The extracted fields fill in the complaint form for the official to review and submit.

**Current limitation:** recording and the waveform are real, but step 2 is **simulated**. It always returns the same sample Hindi transcript and extracted fields after a short delay. The next step is to connect a speech-to-text and LLM extraction service (see [Roadmap](#-roadmap)).

---

## 🛠️ Tech Stack

| Area | Technology |
|---|---|
| Framework | React 18 + TypeScript, Vite (SWC) |
| UI | Tailwind CSS, shadcn/ui (Radix UI), lucide-react icons |
| Routing | React Router v6 |
| Charts | Recharts |
| Forms | React Hook Form + Zod |
| Data fetching (ready for backend) | TanStack Query |
| Notifications | Sonner |
| Testing | Vitest, Playwright |

---

## 📁 Project Structure

```
src/
├── pages/            # Command Center, Complaints, Assignments, Departments,
│                     # SLA Monitor, Analytics, Notifications, Settings
├── components/
│   ├── AppLayout.tsx / AppSidebar.tsx     # shell and navigation
│   ├── ComplaintsTable.tsx                # complaint list
│   ├── ComplaintDetailPanel.tsx           # complaint details + timeline
│   ├── AddComplaintModal.tsx              # new complaint form
│   ├── AudioComplaintModal.tsx            # voice recording + extraction
│   ├── KPICard.tsx / StatusBadge.tsx
│   └── ui/                                # shadcn/ui components
├── data/mockData.ts  # sample complaints and departments
├── types/crm.ts      # Complaint, TimelineEvent, Department types
└── test/             # Vitest setup
```

---

## 🚀 Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
git clone https://github.com/KeertanaGupta/vocal-voice.git
cd vocal-voice
npm install
npm run dev
```

Open **http://localhost:8080**.

> Voice recording needs microphone permission, and browsers only allow it on `localhost` or HTTPS.

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |
| `npm test` | Run Vitest tests |

---

## 🗺️ Roadmap

- [ ] Real speech-to-text (e.g. Whisper) and LLM field extraction for voice complaints
- [ ] Backend API and database to replace mock data
- [ ] Authentication with role-based access (admin, supervisor, officer)
- [ ] Automatic department routing and SLA-based escalation
- [ ] Map view of complaints using stored coordinates
- [ ] Citizen-facing portal to file and track complaints
- [ ] Real unit and end-to-end tests

---

## 👩‍💻 Author

**Keertana Gupta** · [GitHub](https://github.com/KeertanaGupta) · [LinkedIn](https://www.linkedin.com/in/keertanagupta/)

Initial UI scaffolded with [Lovable](https://lovable.dev).
