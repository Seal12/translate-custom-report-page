import { useState, useEffect, useCallback } from "react";
import InputTag from "./InputTag";
import { generateXrayAnalysisSummary } from "../utils/strings";
import { TranslationApi } from "../fetches/api";
import { useReportContext } from "../contexts/ReportContext";
import { TranslationLang } from "../utils/constants";
import TranslationTooltip from "./TranslationTooltip";

const styles = {
    title: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: 600,
        paddingRight: "10%",
        alignSelf: "center",
        justifyCenter: "center",
        alignText: "center",
    },
};

interface AdditionalInfo {
    header: string;
    summary: string;
}

const defaultAdditionalInfo: AdditionalInfo = {
    header: "Summary",
    summary: "",
};

const ReportAdditionalInformationSection = () => {
    const { language } = useReportContext();
    const [additionalInfo, setAdditionalInfo] = useState<AdditionalInfo>(defaultAdditionalInfo);
    const [originalSummary, setOriginalSummary] = useState<string>("");

    const translateAdditionalInfo = useCallback(async (summary: string) => {
        const info = [
            defaultAdditionalInfo.header,
            summary,
        ]
        const translatedSummary = await TranslationApi.translate(info, language);

        setAdditionalInfo({
            header: translatedSummary.translatedText[0] || defaultAdditionalInfo.header,
            summary: translatedSummary.translatedText[1]
                || summary,
        });
        setOriginalSummary(summary);
    }, [language]);

    useEffect(() => {
        const summary = generateXrayAnalysisSummary();
        if (language !== TranslationLang.English) {
            translateAdditionalInfo(summary);
        } else {
            setAdditionalInfo({
                header: defaultAdditionalInfo.header,
                summary: summary,
            });
            setOriginalSummary(summary);
        }
    }, [language, translateAdditionalInfo]);

    return (
        <div translate="yes">
            <TranslationTooltip
                originalText={defaultAdditionalInfo.header}
                translatedText={additionalInfo.header}
            >
                <span style={styles.title}>{additionalInfo.header}: </span>
            </TranslationTooltip>
            <TranslationTooltip
                originalText={originalSummary}
                translatedText={additionalInfo.summary}
            >
                <InputTag editable={true}>{additionalInfo.summary}</InputTag>
            </TranslationTooltip>
        </div>
    );
};

export default ReportAdditionalInformationSection;
