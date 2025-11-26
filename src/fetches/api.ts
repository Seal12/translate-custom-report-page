import { TranslationLang } from '../utils/constants';
import * as LocalStorage from "../utils/localStorage";

export class TranslationApi {
    private static readonly apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

    private static async getCache(data: any) {
        const cacheKey = JSON.stringify(data);
        const cache = LocalStorage.getItem(cacheKey);

        if (cache) {
            return JSON.parse(cache);
        }
        
        return null;
    }

    private static async setCache(data: any, response: any) {
        const cacheKey = JSON.stringify(data);
        LocalStorage.setItem(cacheKey, JSON.stringify(response));
    }

    static async translate(text: string | string[], targetLanguage: TranslationLang) {
        try {
            const data = {
                q: text,
                source: 'en',
                target: targetLanguage,
                format: 'text',
            };

            const cache = await TranslationApi.getCache(data);

            if (cache) {
                return {
                    ...cache,
                    ok: true,
                    error: null,
                };
            }
    
            const response = await fetch(`${TranslationApi.apiUrl}/translate`, {
                method: 'POST',
                body: JSON.stringify(data),
                headers: { "Content-Type": "application/json" }
            });

            const responseData = await response.json();
            await TranslationApi.setCache(data, responseData);

            return {
                translatedText: responseData.translatedText,
                error: null,
                ok: true
            };
        } catch (error) {
            console.error('Error translating text:', error);

            return {
                translatedText: text,
                error: error,
                ok: false
            };
        }
    }
}