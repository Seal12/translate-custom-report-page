import { CSSProperties, useCallback, useEffect, useState } from "react";
import InputTag from "./InputTag";
import { patientId } from "../models/patientDetails";
import { convertToReadableString } from "../utils/strings";
import { getRandomNumberInRange } from "../utils/numbers";
import { loadingText, TranslationLang } from "../utils/constants";
import { useReportContext } from "../contexts/ReportContext";
import { TranslationApi } from "../fetches/api";
import TranslationTooltip from "./TranslationTooltip";

const styles = {
    container: {
        display: "inline-grid",
        gridTemplateColumns: "1fr 1fr",
        width: "98%",
        paddingLeft: "2%",
        paddingBottom: "2%",
    },
    detailContainer: {},
    detailTitle: {
        fontSize: "0.875rem",
        lineHeight: "1.25rem",
        fontWeight: 600,
        paddingRight: "10%",
    },
};

interface ParentDetailsSectionInterface {
    patientId: patientId;
    style?: CSSProperties;
}

interface Label {
    key: string;
    value: string;
    label: string;
    originalLabel: string;
}

const ParentDetailsSection = (props: ParentDetailsSectionInterface) => {
    const { language } = useReportContext();

    const { patientId, style } = props;

    const [labels, setLabels] = useState<Label[]>([]);

    const translateLabels = useCallback(async (labels: string[]) => {

        if (language === TranslationLang.English) {
            return labels.map((label) => convertToReadableString(label));
        }

        const { translatedText, ok } = await TranslationApi.translate(labels, language);

        if (ok) {
            return translatedText;
        } else {
            return labels;
        }
    }, [language]);

    useEffect(() => {
        setTimeout(async () => {
            const patientDetails = require("../fetches/fetchPatientDetails.json")[patientId];

            const values = Object.values(patientDetails);
            const keys = Object.keys(patientDetails);
            const formattedLabels = keys.map((key) => convertToReadableString(key));
            
            const translatedLabels = await translateLabels(formattedLabels);
            
            const _labels = keys.map((label, i) => ({
                key: label,
                value: values[i],
                label: translatedLabels[i],
                originalLabel: formattedLabels[i]
            }));

            setLabels(_labels as Label[]);
        }, getRandomNumberInRange(200, 1800));
    }, [language, patientId, translateLabels]);

    return (
        <div style={{ ...styles.container, ...style }}>
            {labels
                ? labels.map((label) => (
                    <div key={label.key} style={styles.detailContainer}>
                        <TranslationTooltip
                            originalText={label.originalLabel}
                            translatedText={label.label}
                        >
                            <span style={styles.detailTitle} translate="yes">{label.label}</span>
                        </TranslationTooltip>
                        <InputTag>{label.value}</InputTag>
                    </div>
                )) : (
                    <span translate="yes">{loadingText}</span>
                )
            }
        </div>
    );
};

export default ParentDetailsSection;
