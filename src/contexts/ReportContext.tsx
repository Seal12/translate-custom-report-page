import React, { createContext, useContext, useState, ReactNode, useEffect, useCallback } from "react";
import { TranslationLang, reportHeader, additionalInformation } from "../utils/constants";
import { TranslationApi } from "../fetches/api";
import { reportBasicInfo } from "../utils/constants";
import * as LocalStorage from "../utils/localStorage";
import toast from "react-hot-toast";

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
    originalFields: ReportFields;
    additionalInformationTitle: string;
    originalAdditionalInformationTitle: string;
    isLoading: boolean;
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
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [language, setLanguageState] = useState<TranslationLang>(TranslationLang.English);
    const [fields, setFields] = useState<ReportFields>({
        ...defaultFields,
    });
    const [originalFields] = useState<ReportFields>({
        ...defaultFields,
    });
    const [additionalInformationTitle, setAdditionalInformationTitle] = useState<string>(additionalInformation.title);
    const [originalAdditionalInformationTitle] = useState<string>(additionalInformation.title);

    const setLanguage = (newLanguage: TranslationLang) => {
        LocalStorage.setItem("language", newLanguage);
        setLanguageState(newLanguage);
    };

    const state: ReportState = {
        language,
        setLanguage,
        fields,
        originalFields,
        additionalInformationTitle,
        originalAdditionalInformationTitle,
        isLoading,
    };

    const resetFields = useCallback(() => {
        setFields({
            ...defaultFields,
        });
    }, [setFields]);

    const translate = useCallback(() => {
        setIsLoading(true);
        if (language === TranslationLang.English) {
            resetFields();
            setAdditionalInformationTitle(additionalInformation.title);
            setIsLoading(false);

            return;
        }

        const fieldsToTranslate = Object.values(defaultFields);
        fieldsToTranslate.push(additionalInformation.title);

        TranslationApi.translate(fieldsToTranslate, language)
            .then((data) => {
                if (data.ok && data.translatedText) {
                    const translatedFields = Object.keys(defaultFields).map((key, i) => {
                        return {
                            [key]: data.translatedText[i]
                        }
                    }).reduce((acc, curr) => {
                        return Object.assign(acc, curr);
                    }, {} as Partial<ReportFields>);

                    setFields((prevFields) => ({
                        ...prevFields,
                        ...translatedFields,
                    }));

                    setAdditionalInformationTitle(data.translatedText[fieldsToTranslate.length-1]);
                }
            })
            .catch((error) => {
                console.error('Translation failed:', error);
                toast.error('Failed to translate content. Please try again or refresh the page.');
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, [language, resetFields]);

    useEffect(() => {
        const cachedLanguage = LocalStorage.getItem("language");

        if (cachedLanguage) {
            setLanguage(cachedLanguage as TranslationLang);
        }
    }, []);

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

