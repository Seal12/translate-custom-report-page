import React from "react";
import "./App.css";
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
    );
}

export default App;
