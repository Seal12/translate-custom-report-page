import { CSSProperties, ReactNode } from "react";
import TranslationTooltip from "./TranslationTooltip";

interface ReportSectionInterface {
    children?: ReactNode;
    title: string | ReactNode;
    originalTitle?: string;
    secondaryText?: string | ReactNode;
    originalSecondaryText?: string;
    style?: CSSProperties;
    contentWrapperStyle?: CSSProperties;
}

const styles = {
    container: {
        border: "1px solid #064c60",
    },
    headerContainer: {
        backgroundColor: "#064c60",
        display: "flex",
        justifyContent: "space-between",
        paddingLeft: "1%",
        paddingRight: "3%",
    },
    titleText: {
        color: "#fff",
    },
    childrenWrapper: {
        display: "inline-grid",
        width: "100%",
    },
};

const ReportSection = (props: ReportSectionInterface) => {
    const { title, originalTitle, children, secondaryText, originalSecondaryText, style, contentWrapperStyle } = props;
    
    const titleElement = typeof title === "string" && originalTitle ? (
        <TranslationTooltip originalText={originalTitle} translatedText={title}>
            <span style={styles.titleText} translate="yes">
                {title}
            </span>
        </TranslationTooltip>
    ) : (
        <span style={styles.titleText} translate="yes">
            {title}
        </span>
    );

    const secondaryTextElement = typeof secondaryText === "string" && originalSecondaryText ? (
        <TranslationTooltip originalText={originalSecondaryText} translatedText={secondaryText}>
            <span style={styles.titleText} translate="yes">
                {secondaryText}
            </span>
        </TranslationTooltip>
    ) : (
        <span style={styles.titleText} translate="yes">
            {secondaryText}
        </span>
    );

    return (
        <div style={{ ...styles.container, ...style }}>
            <div style={styles.headerContainer}>
                {titleElement}
                {secondaryText && secondaryTextElement}
            </div>
            <div style={{ ...styles.childrenWrapper, ...contentWrapperStyle }}>
                {children}
            </div>
        </div>
    );
};

export default ReportSection;
