import React from "react";
import "./App.css";
import { Toaster } from "react-hot-toast";
import ReportHeader from "./components/ReportHeader";
import ReportPage from "./components/ReportPage";
import ReportSection from "./components/ReportSection";
import ReportBasicInfoSection from "./components/ReportBasicInfoSection";
import ReportAdditionalInformationSection from "./components/ReportAdditionalInformationSection";
import { useReportContext } from "./contexts/ReportContext";

const styles = {
    wrapper: {
        backgroundColor: "#052e39",
        backdropFilter: "blur(2rem)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    container: {
        width: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column" as "column",
        gapY: "2rem",
        height: "95%",
    },
};

function App() {
    const { additionalInformationTitle, originalAdditionalInformationTitle } = useReportContext();

    return (
        <>
            <Toaster
                position="top-right"
                toastOptions={{
                    duration: 5000,
                    style: {
                        background: "#E53E3E",
                        color: "#fff",
                    },
                    error: {
                        duration: 5000,
                        style: {
                            background: "#E53E3E",
                            color: "#fff",
                        },
                    },
                }}
            />
            <div style={styles.wrapper}>
                <div style={styles.container}>
                    <ReportHeader />
                    <ReportPage>
                        <ReportBasicInfoSection />
                    </ReportPage>
                    <ReportPage>
                        <ReportSection
                            title={additionalInformationTitle}
                            originalTitle={originalAdditionalInformationTitle}
                        >
                            <ReportAdditionalInformationSection />
                        </ReportSection>
                    </ReportPage>
                </div>
            </div>
        </>
    );
}

export default App;
