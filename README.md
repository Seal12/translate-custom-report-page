### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

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
- **No translation caching** - Beyond basic localStorage
- **Translation failures return original text** - No retry logic or error recovery
- **Original text scattered** - Stored in context + component state (inconsistent)

### 6. State Management
- **React Context only** - No state management library, all consumers re-render on any change
- **No state persistence** - Beyond localStorage for language preference
- **Error boundary implemented** - Catches errors and displays fallback UI, prevents app crashes

### 7. Security & Error Handling
- **No authentication/authorization** - Public access assumed
- **No input validation** - No sanitization or XSS protection beyond React defaults
- **Basic error handling** - Console.error only, no user-friendly error messages
- **No error recovery** - Failed API calls return original text, no retry mechanism

### 8. Business Logic
- **Single report view** - Cannot view multiple reports or switch patients
- **Read-only report** - Only summary field is editable
- **No report export/print** - No functionality beyond display
- **Mock data generation** - Random delays and findings for demo purposes
