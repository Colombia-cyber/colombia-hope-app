import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Ensure DOM is ready before initializing React
function initializeApp() {
  const rootElement = document.getElementById("root");
  if (!rootElement) {
    throw new Error("Root element not found");
  }

  // In production, avoid StrictMode to prevent potential event handler issues
  const isDev = import.meta.env.DEV;

  // Error boundary component
  class ErrorBoundary extends React.Component<
    { children: React.ReactNode },
    { hasError: boolean }
  > {
    constructor(props: { children: React.ReactNode }) {
      super(props);
      this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
      console.error("React Error Boundary caught an error:", error, errorInfo);
    }

    render() {
      if (this.state.hasError) {
        return (
          <div style={{ padding: "20px", textAlign: "center" }}>
            <h1>Something went wrong.</h1>
            <button onClick={() => window.location.reload()}>Reload Page</button>
          </div>
        );
      }

      return this.props.children;
    }
  }

  const AppWithErrorBoundary = () => (
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  );

  ReactDOM.createRoot(rootElement).render(
    isDev ? (
      <React.StrictMode>
        <AppWithErrorBoundary />
      </React.StrictMode>
    ) : (
      <AppWithErrorBoundary />
    )
  );
}

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initializeApp);
} else {
  initializeApp();
}