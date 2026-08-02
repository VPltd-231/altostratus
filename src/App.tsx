import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Fragment } from "react";
import Index from "./pages/Index";
import ProviderDetail from "./pages/ProviderDetail";
import NotFound from "./pages/NotFound";
import { GoogleTranslate } from "./components/GoogleTranslate";
import { languagePaths } from "./lib/languages";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <GoogleTranslate />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/provider/:providerId" element={<ProviderDetail />} />
          {languagePaths.map((lang) => (
            <Fragment key={lang}>
              <Route path={`/${lang}`} element={<Index />} />
              <Route path={`/${lang}/provider/:providerId`} element={<ProviderDetail />} />
            </Fragment>
          ))}
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
