import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { TranslationLang, reportHeader, additionalInformation } from "../utils/constants";
import { TranslationApi } from "../fetches/api";
import { reportBasicInfo } from "../utils/constants";

interface ReportFields {
    secondaryText: string;

    // Basic Info
    reportTitle: string;
    hospitalDetailsTitle: string;
    patientDetailsTitle: string;
    abnormalFindingsTitle: string;
    normalFindingsTitle: string;
    confidenceTitle: string;
    service: string;
    date: string;
}

interface ReportState {
    // Language
    language: TranslationLang;
    setLanguage: (language: TranslationLang) => void;
    fields: ReportFields;
    additionalInformationTitle: string;
}

const ReportContext = createContext<ReportState | undefined>(undefined);

interface ReportProviderProps {
    children: ReactNode;
}

const defaultFields: ReportFields = {
    secondaryText: reportHeader.secondaryText || "",
    ...reportBasicInfo,
};

export const ReportProvider: React.FC<ReportProviderProps> = ({ children }) => {
    const [language, setLanguageState] = useState<TranslationLang>(TranslationLang.English);
    const [fields, setFields] = useState<ReportFields>({
        ...defaultFields,
    });
    const [additionalInformationTitle, setAdditionalInformationTitle] = useState<string>(additionalInformation.title);

    const setLanguage = (newLanguage: TranslationLang) => {
        setLanguageState(newLanguage);
    };

    const state: ReportState = {
        language,
        setLanguage,
        fields,
        additionalInformationTitle,
    };

    const resetFields = useCallback(() => {
        setFields({
            ...defaultFields,
        });
    }, [setFields]);

    const translate = useCallback(() => {
        if (language === TranslationLang.English) {
            resetFields();
            return;
        }

        const fieldsToTranslate = Object.values(defaultFields);
        fieldsToTranslate.push(additionalInformationTitle);

        TranslationApi.translate(fieldsToTranslate, language).then((data) => {
            const translatedFields = Object.keys(defaultFields).map((key, i) => {
                return {
                    [key]: data.translatedText[i]
                }
            }).reduce((acc, curr) => {
                return Object.assign(acc, curr);
            }, {} as Partial<ReportFields>);

            setFields({
                ...fields,
                ...translatedFields,
            });

            setAdditionalInformationTitle(data.translatedText[fieldsToTranslate.length-1]);
        });
    }, [language, setFields, resetFields]);

    useEffect(() => {
        resetFields();
    }, [resetFields]);

    useEffect(() => {
        translate()
    }, [language, translate]);

    return (
        <ReportContext.Provider value={state}>
            {children}
        </ReportContext.Provider>
    );
};

export const useReportContext = (): ReportState => {
    const context = useContext(ReportContext);

    if (context === undefined) {
        throw new Error("useReportContext must be used within a ReportProvider");
    }

    return context;
};

