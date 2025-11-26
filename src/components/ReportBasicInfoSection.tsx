import ReportSection from "./ReportSection";
import AddressInfoSection from "./AddressInfoSection";
import ContactInfoSection from "./ContactInfoSection";
import ParentDetailsSection from "./ParentDetailsSection";
import ReportFindings from "./ReportFindings";
import { useReportContext } from "../contexts/ReportContext";
import TranslationTooltip from "./TranslationTooltip";

const styles = {
    container: {
        display: "flex",
        flexDirection: "row" as "row",
        width: "90%",
    },
    segmentContainer: {
        paddingTop: "2rem",
        paddingBottom: "2rem",
        paddingLeft: "1rem",
        paddingRight: "1rem",
        width: "fit-content",
        textWrap: "nowrap" as "nowrap",
    },
    segmentTitle: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: 600,
        paddingRight: "10%",
    },
    segmentContent: {},
    segmentImg: {
        width: "8rem",
        gridColumn: 3,
        alignSelf: "center",
    },
};

const ReportBasicInfoSection = () => {
    const { fields, originalFields } = useReportContext();

    return (
        <div>
            <ReportSection
                title={fields.reportTitle}
                originalTitle={originalFields.reportTitle}
                secondaryText="ID: 91"
            >
                <div style={styles.container}>
                    <div
                        style={{
                            ...styles.segmentContainer,
                            borderRight: "1px solid #064c60",
                            paddingRight: "31%",
                        }}
                    >
                        <TranslationTooltip
                            originalText={originalFields.service}
                            translatedText={fields.service}
                        >
                            <span style={styles.segmentTitle} translate="yes">
                                {fields.service}:
                            </span>
                        </TranslationTooltip>
                        <span style={styles.segmentContent}>SignalRAY</span>
                    </div>
                    <div style={styles.segmentContainer}>
                        <TranslationTooltip
                            originalText={originalFields.date}
                            translatedText={fields.date}
                        >
                            <span style={styles.segmentTitle} translate="yes">
                                {fields.date}:
                            </span>
                        </TranslationTooltip>
                        <span style={styles.segmentContent}>01-01-1994</span>
                    </div>
                </div>
            </ReportSection>
            <ReportSection
                title={fields.hospitalDetailsTitle}
                originalTitle={originalFields.hospitalDetailsTitle}
                contentWrapperStyle={{
                    width: "100%",
                    justifyContent: "space-around",
                }}
            >
                <AddressInfoSection />
                <ContactInfoSection style={{ gridColumn: 2 }} />
                <img
                    alt="report-logo"
                    src={require("../static/report-logo.png")}
                    style={styles.segmentImg}
                />
            </ReportSection>
            <ReportSection
                title={fields.patientDetailsTitle}
                originalTitle={originalFields.patientDetailsTitle}
            >
                <ParentDetailsSection patientId={9} />
            </ReportSection>
            <ReportSection
                title={fields.abnormalFindingsTitle}
                originalTitle={originalFields.abnormalFindingsTitle}
                secondaryText={fields.confidenceTitle}
                originalSecondaryText={originalFields.confidenceTitle}
            >
                <ReportFindings isNormal={false} editable={true} />
            </ReportSection>
            <ReportSection
                title={fields.normalFindingsTitle}
                originalTitle={originalFields.normalFindingsTitle}
                secondaryText={fields.confidenceTitle}
                originalSecondaryText={originalFields.confidenceTitle}
            >
                <ReportFindings isNormal={true} editable={true} />
            </ReportSection>
        </div>
    );
};

export default ReportBasicInfoSection;
