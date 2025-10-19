import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store.ts";
import { PersistGate } from 'redux-persist/integration/react';
import { Toaster } from "./components/ui/toaster.tsx";
import Router from "./routes/Routes.tsx";
import { ThemeProvider } from "@/components/theme-provider";
import ErrorBoundary from "./components/ErrorBoundary.tsx";
import { AuthProvider } from "./contexts/AuthProvider.tsx";
import MonitoringDashboard from "./components/MonitoringDashboard.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
              <RouterProvider router={Router} />
              <Toaster />
              <MonitoringDashboard />
            </AuthProvider>
          </PersistGate>
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  </StrictMode>
);
