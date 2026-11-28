import { startTransition } from "react";
import { createRoot } from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import "@fontsource-variable/inter";
import { inject } from "@vercel/analytics";
import App from "./App.tsx";
import "./index.css";

inject();

// #root already holds the prerendered page (scripts/prerender.ts). Rendering in
// a transition keeps that snapshot on screen until React's tree, including any
// lazy route chunk, is ready, then swaps in one commit: no blank flash between
// the static HTML and the app.
const root = createRoot(document.getElementById("root")!);
startTransition(() => {
  root.render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  );
});
