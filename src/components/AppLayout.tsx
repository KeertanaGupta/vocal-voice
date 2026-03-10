import { ReactNode } from "react";
import { AppSidebar } from "./AppSidebar";

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <AppSidebar />
      <main className="ml-14 flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
