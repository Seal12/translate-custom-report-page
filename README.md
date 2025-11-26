# Translate Custom Report Page

A React-based medical report viewer application with multi-language translation support. This application displays radiology reports with the ability to translate content into multiple languages (German, Spanish, French, Portuguese) while maintaining the original English text accessible via tooltips.

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- LibreTranslate API running (default: `http://localhost:5000`)

### Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

## Running the Application

### Development Mode

Run the app in development mode:

```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000) in your browser.

The page will reload automatically when you make edits.\
You will also see any lint errors in the console.

### Production Build

To create a production build:

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## Testing

### Run All Tests

Run the test suite:

```bash
npm test
```

### Test Coverage

The project includes unit tests for the TranslationApi class, covering:
- Cache hit scenarios
- API call behavior
- Error handling
- Array of strings translation
- Cache persistence

## Environment Variables

To configure the API URL, create a `.env` file in the root directory and set the `REACT_APP_API_URL` variable:

```
REACT_APP_API_URL=http://localhost:5001
```

> **Note:** 
> - Environment variables must be prefixed with `REACT_APP_` to be exposed to the browser
> - If not set, the app defaults to `http://localhost:5000`
> - You must restart the development server after changing environment variables for changes to take effect
> - The app assumes the translation api can be reached at `{{REACT_APP_API_URL}}/translate` url.

## Important Assumptions & Constraints

### 1. Architecture & Technology
- **Create React App (CRA)** - Cannot customize webpack/build without ejecting
- **Single Page Application** - No routing, client-side rendering only
- **Modern browsers only** - ES6+ required, no IE11 support
- **Static build output** - No server-side rendering capability

### 2. External Dependencies
- **LibreTranslate API required** - Must be running and accessible at `{{REACT_APP_API_URL}}/translate`
- **Network connectivity required** - No offline translation capability
- **English-only source language** - Hardcoded `source: 'en'` in all API calls
- **5 supported languages** - en, de, es, fr, pt (hardcoded enum)

### 3. Data Management
- **No backend database** - All data is static/mock JSON files
- **Single patient limitation** - Hardcoded patient ID: 9
- **Static findings data** - No dynamic updates or real API integration
- **LocalStorage only persistence** - Language preference only, subject to browser limits

### 4. UI/UX Design
- **Fixed-width layout** - 50% container width, no responsive design
- **Desktop-only** - No mobile optimization or touch support
- **Hardcoded styling** - Inline styles, no theme customization
- **Tooltips hover-only** - No keyboard or touch accessibility

### 5. Translation System
- **On-demand translation** - Async API calls with loading indicators, no pre-translation
- **LocalStorage caching** - Translation responses cached in browser localStorage to reduce API calls
- **Translation failures return original text** - No retry logic or error recovery
- **Original text scattered** - Stored in context + component state (inconsistent)

#### 6. Cost Reduction Mechanisms
- **Request caching** - Translation API responses are cached in localStorage using request data (text, source language, target language) as the cache key
- **Cache-first strategy** - Before making an API call, the app checks localStorage for a cached translation. If found, the cached response is returned immediately, avoiding unnecessary API requests
- **Persistent cache** - Cache persists across browser sessions, reducing API calls for frequently translated content
- **Cache key based on request parameters** - Each unique combination of text and language pair gets its own cache entry, ensuring accurate cache hits

### 7. State Management
- **React Context only** - No state management library, all consumers re-render on any change
- **No state persistence** - Beyond localStorage for language preference
- **Error boundary implemented** - Catches errors and displays fallback UI, prevents app crashes

### 8. Security & Error Handling
- **No authentication/authorization** - Public access assumed
- **No input validation** - No sanitization or XSS protection beyond React defaults
- **Basic error handling** - Console.error only, no user-friendly error messages
- **No error recovery** - Failed API calls return original text, no retry mechanism

### 9. Business Logic
- **Single report view** - Cannot view multiple reports or switch patients
- **Read-only report** - Only summary field is editable
- **No report export/print** - No functionality beyond display
- **Mock data generation** - Random delays and findings for demo purposes
