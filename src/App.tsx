import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppLayout } from "@/components/AppLayout";
import Index from "./pages/Index";
import Complaints from "./pages/Complaints";
import Analytics from "./pages/Analytics";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/complaints" element={<Complaints />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/assignments" element={<PlaceholderPage title="Assignments" />} />
            <Route path="/departments" element={<PlaceholderPage title="Departments" />} />
            <Route path="/sla" element={<PlaceholderPage title="SLA Monitor" />} />
            <Route path="/notifications" element={<PlaceholderPage title="Notifications" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AppLayout>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex h-[calc(100vh-2rem)] items-center justify-center p-6">
      <div className="text-center space-y-2">
        <h1 className="text-lg font-semibold text-foreground">{title}</h1>
        <p className="text-xs text-muted-foreground font-mono">Module under development</p>
      </div>
    </div>
  );
}

export default App;
