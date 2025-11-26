import { useReportContext } from "../contexts/ReportContext";
import { TranslationLang } from "../utils/constants";

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
    const { fields, language, setLanguage } = useReportContext();

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
                <span style={styles.secondaryText} translate="yes">
                    {fields.secondaryText}
                </span>
                <select
                    id="language-select"
                    value={language}
                    onChange={handleLanguageChange}
                    style={styles.languageDropdown}
                >
                    {languageOptions.map((option) => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>
            </div>
            
        </div>
    );
};

export default ReportHeader;
