import { TranslationApi } from './api';
import { TranslationLang } from '../utils/constants';
import * as LocalStorage from '../utils/localStorage';

// Mock localStorage
jest.mock('../utils/localStorage', () => ({
    getItem: jest.fn(),
    setItem: jest.fn(),
}));

// Mock fetch
global.fetch = jest.fn();

describe('TranslationApi', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        (LocalStorage.getItem as jest.Mock).mockReturnValue(null);
        (LocalStorage.setItem as jest.Mock).mockImplementation(() => {});
    });

    describe('translate', () => {
        it('should return cached translation if available', async () => {
            const cachedResponse = {
                translatedText: ['Hola'],
                ok: true,
            };
            const cacheKey = JSON.stringify({
                q: 'Hello',
                source: 'en',
                target: TranslationLang.Spanish,
                format: 'text',
            });

            (LocalStorage.getItem as jest.Mock).mockReturnValue(JSON.stringify(cachedResponse));

            const result = await TranslationApi.translate('Hello', TranslationLang.Spanish);

            expect(LocalStorage.getItem).toHaveBeenCalledWith(cacheKey);
            expect(fetch).not.toHaveBeenCalled();
            expect(result).toEqual({
                ...cachedResponse,
                ok: true,
                error: null,
            });
        });

        it('should make API call when cache is not available', async () => {
            const mockResponse = {
                translatedText: ['Hola'],
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => mockResponse,
            });

            const result = await TranslationApi.translate('Hello', TranslationLang.Spanish);

            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/translate'),
                expect.objectContaining({
                    method: 'POST',
                    body: JSON.stringify({
                        q: 'Hello',
                        source: 'en',
                        target: TranslationLang.Spanish,
                        format: 'text',
                    }),
                })
            );
            expect(LocalStorage.setItem).toHaveBeenCalled();
            expect(result).toEqual({
                translatedText: ['Hola'],
                error: null,
                ok: true,
            });
        });

        it('should handle array of strings', async () => {
            const mockResponse = {
                translatedText: ['Hola', 'Mundo'],
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => mockResponse,
            });

            const result = await TranslationApi.translate(
                ['Hello', 'World'],
                TranslationLang.Spanish
            );

            expect(fetch).toHaveBeenCalledWith(
                expect.stringContaining('/translate'),
                expect.objectContaining({
                    body: JSON.stringify({
                        q: ['Hello', 'World'],
                        source: 'en',
                        target: TranslationLang.Spanish,
                        format: 'text',
                    }),
                })
            );
            expect(result.translatedText).toEqual(['Hola', 'Mundo']);
        });

        it('should return original text on error', async () => {
            const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
            (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

            const result = await TranslationApi.translate('Hello', TranslationLang.Spanish);

            expect(result).toEqual({
                translatedText: 'Hello',
                error: expect.any(Error),
                ok: false,
            });
            expect(consoleErrorSpy).toHaveBeenCalled();

            consoleErrorSpy.mockRestore();
        });

        it('should cache successful API responses', async () => {
            const mockResponse = {
                translatedText: ['Bonjour'],
            };

            (fetch as jest.Mock).mockResolvedValueOnce({
                json: async () => mockResponse,
            });

            await TranslationApi.translate('Hello', TranslationLang.French);

            expect(LocalStorage.setItem).toHaveBeenCalled();
            const cacheKey = JSON.stringify({
                q: 'Hello',
                source: 'en',
                target: TranslationLang.French,
                format: 'text',
            });
            expect(LocalStorage.setItem).toHaveBeenCalledWith(
                cacheKey,
                JSON.stringify(mockResponse)
            );
        });

        it('should use different cache keys for different languages', async () => {
            const spanishCache = { translatedText: ['Hola'] };
            const frenchCache = { translatedText: ['Bonjour'] };

            (LocalStorage.getItem as jest.Mock)
                .mockReturnValueOnce(JSON.stringify(spanishCache))
                .mockReturnValueOnce(JSON.stringify(frenchCache));

            const spanishResult = await TranslationApi.translate('Hello', TranslationLang.Spanish);
            const frenchResult = await TranslationApi.translate('Hello', TranslationLang.French);

            expect(spanishResult.translatedText).toEqual(['Hola']);
            expect(frenchResult.translatedText).toEqual(['Bonjour']);
            expect(LocalStorage.getItem).toHaveBeenCalledTimes(2);
        });
    });
});

