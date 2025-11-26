import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./index.css";

import { ReportProvider } from "./contexts/ReportContext";

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <ReportProvider>
            <App />
        </ReportProvider>
    </React.StrictMode>
);
