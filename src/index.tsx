import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

import { ReportProvider } from "./contexts/ReportContext";
import ErrorBoundary from "./components/ErrorBoundary";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <ErrorBoundary>
            <ReportProvider>
                <App />
            </ReportProvider>
        </ErrorBoundary>
    </React.StrictMode>
);
