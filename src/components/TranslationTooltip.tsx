import React, { ReactNode } from "react";
import { useReportContext } from "../contexts/ReportContext";
import { TranslationLang } from "../utils/constants";

interface TranslationTooltipProps {
    children: ReactNode;
    originalText: string;
    translatedText: string;
}

const styles = {
    tooltipContainer: {
        position: "relative" as "relative",
        display: "inline",
        cursor: "pointer",
    },
    tooltip: {
        visibility: "hidden" as "hidden",
        backgroundColor: "#333",
        color: "#fff",
        textAlign: "center" as "center",
        borderRadius: "6px",
        padding: "8px 12px",
        position: "absolute" as "absolute",
        zIndex: 1000,
        bottom: "125%",
        left: "50%",
        transform: "translateX(-50%)",
        fontSize: "0.875rem",
        opacity: 0,
        transition: "opacity 0.3s",
        pointerEvents: "none" as "none",
        maxWidth: "300px",
        wordWrap: "break-word" as "break-word",
        whiteSpace: "normal" as "normal",
    },
    tooltipVisible: {
        visibility: "visible" as "visible",
        opacity: 1,
    },
    tooltipArrow: {
        position: "absolute" as "absolute",
        top: "100%",
        left: "50%",
        transform: "translateX(-50%)",
        width: 0,
        height: 0,
        borderLeft: "5px solid transparent",
        borderRight: "5px solid transparent",
        borderTop: "5px solid #333",
    },
};

const TranslationTooltip: React.FC<TranslationTooltipProps> = ({
    children,
    originalText,
    translatedText,
}) => {
    const { language } = useReportContext();
    const [isHovered, setIsHovered] = React.useState(false);

    // Only show tooltip if language is not English and text is actually translated
    const shouldShowTooltip =
        language !== TranslationLang.English && originalText !== translatedText;

    if (!shouldShowTooltip) {
        return <>{children}</>;
    }

    return (
        <span
            style={styles.tooltipContainer}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {children}
            <span
                style={{
                    ...styles.tooltip,
                    ...(isHovered ? styles.tooltipVisible : {}),
                }}
            >
                {originalText}
                <span style={styles.tooltipArrow}></span>
            </span>
        </span>
    );
};

export default TranslationTooltip;

