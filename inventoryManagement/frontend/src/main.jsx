import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/styles/main.scss";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60, // ✅ 1 minute staleTime
      gcTime: 1000 * 60 * 10, // optional: keep cache for 10 minutes
      refetchOnWindowFocus: false, // prevent auto refetch on tab focus
      refetchOnMount: true, // prevent refetch when component remounts
      refetchOnReconnect: false, // prevent refetch on internet reconnect
    },
  },
});
createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <QueryClientProvider client={queryClient}>
    <App />,
  </QueryClientProvider>,
  // {/* </StrictMode> */}
);
