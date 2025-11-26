import { TranslationLang } from '../utils/constants';

export class TranslationApi {
    private static readonly apiUrl = 'http://localhost:5001';

    private static async getCache(data: any) {
        const cacheKey = JSON.stringify(data);
        const cache = localStorage.getItem(cacheKey);

        if (cache) {
            return JSON.parse(cache);
        }
        
        return null;
    }

    private static async setCache(data: any, response: any) {
        const cacheKey = JSON.stringify(data);
        localStorage.setItem(cacheKey, JSON.stringify(response));
    }

    static async translate(text: string | string[], targetLanguage: TranslationLang) {
        try {
            const data = {
                q: text,
                source: 'en',
                target: targetLanguage,
                format: 'text',
            };
            console.log("data: ", data);

            const cache = await TranslationApi.getCache(data);
            if (cache) {
                return cache;
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
            // return response.json();
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