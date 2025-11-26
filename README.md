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
