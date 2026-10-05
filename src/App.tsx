import { lazy, Suspense, type ReactNode } from "react";
import { BrowserRouter, Route, Routes, useParams } from "react-router-dom";
import Index from "./pages/Index";
import { GoogleTranslate } from "./components/GoogleTranslate";
import { MotionProvider } from "./components/motion/MotionProvider";
import { languagePaths } from "./lib/languages";

// Secondary routes are split out of the entry bundle.
const ProviderDetail = lazy(() => import("./pages/ProviderDetail"));
const NotFound = lazy(() => import("./pages/NotFound"));

/** Renders children for "/" or "/<supported-language>/..."; anything else is a 404. */
const LangGate = ({ children }: { children: ReactNode }) => {
  const { lang } = useParams();
  return !lang || languagePaths.includes(lang) ? <>{children}</> : <NotFound />;
};

const App = () => (
  <MotionProvider>
    <BrowserRouter>
      <GoogleTranslate />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/:lang?" element={<LangGate><Index /></LangGate>} />
          <Route path="/:lang?/provider/:providerId" element={<LangGate><ProviderDetail /></LangGate>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  </MotionProvider>
);

export default App;
