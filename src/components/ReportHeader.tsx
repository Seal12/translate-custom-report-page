import { useReportContext } from "../contexts/ReportContext";
import { TranslationLang } from "../utils/constants";
import TranslationTooltip from "./TranslationTooltip";

const styles = {
    container: {
        backgroundColor: "#064c60",
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "space-between",
        alignItems: "center" as "center",
        padding: "1rem",
        width: "100%",
    },
    logo: {
        width: "10rem",
    },
    secondaryText: {
        color: "#fff",
    },
    languageDropdown: {
        padding: "0.25rem 0.5rem",
        borderRadius: "4px",
        border: "1px solid #fff",
        backgroundColor: "#064c60",
        color: "#fff",
        fontSize: "0.9rem",
        cursor: "pointer",
        marginLeft: "0.5rem",
        opacity: 1,
    },
    loadingIndicator: {
        display: "inline-block",
        width: "12px",
        height: "12px",
        border: "2px solid rgba(255, 255, 255, 0.3)",
        borderTopColor: "#fff",
        borderRadius: "50%",
        animation: "spin 0.6s linear infinite",
        marginLeft: "0.5rem",
    },
    headerRight: {
        display: "flex",
        flexDirection: "row" as "row",
        justifyContent: "flex-end",
        alignItems: "center" as "center",
        gap: "0.5rem",
    },
};

const languageOptions = [
    { value: TranslationLang.English, label: "English" },
    { value: TranslationLang.German, label: "German" },
    { value: TranslationLang.Spanish, label: "Spanish" },
    { value: TranslationLang.French, label: "French" },
    { value: TranslationLang.Portuguese, label: "Portuguese" },
];

const ReportHeader = () => {
    const { fields, originalFields, language, setLanguage, isLoading } = useReportContext();

    const handleLanguageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setLanguage(event.target.value as TranslationLang);
    };

    return (
        <div style={styles.container}>
            <img
                alt="Logo"
                src={require("../static/logo.png")}
                style={styles.logo}
            />
            <div style={styles.headerRight}>
                <TranslationTooltip
                    originalText={originalFields.secondaryText}
                    translatedText={fields.secondaryText}
                >
                    <span style={styles.secondaryText} translate="yes">
                        {fields.secondaryText}
                    </span>
                </TranslationTooltip>
                <select
                    id="language-select"
                    value={language}
                    onChange={handleLanguageChange}
                    disabled={isLoading}
                    style={styles.languageDropdown}
                >
                    {languageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
                {isLoading && <span style={styles.loadingIndicator}></span>}
            </div>
            
        </div>
    );
};

export default ReportHeader;
