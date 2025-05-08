# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# YouTube Transcript Extractor

This application allows users to extract and summarize transcripts from YouTube videos. It consists of a frontend built with React and a backend powered by FastAPI.

## Features

- Extract transcripts from YouTube videos.
- Summarize transcripts using GPT-4.
- Download transcripts in various formats (TXT, SRT, JSON).
- Navigate easily between pages.

## Frontend

### Technologies

- React
- React Router
- Tailwind CSS

### Setup

1. **Install Dependencies:**

   ```bash
   npm install
   ```

2. **Run the Frontend:**

   ```bash
   npm start
   ```

3. **Navigate to:**

   Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Backend

### Technologies

- FastAPI
- YouTube Transcript API
- OpenAI API

### Setup

1. **Install Dependencies:**

   ```bash
   pip install fastapi uvicorn youtube-transcript-api openai
   ```

2. **Run the Backend:**

   ```bash
   uvicorn main:app --reload
   ```

3. **API Endpoints:**

   - `/transcript`: Extracts transcript from a YouTube video.
   - `/summarize`: Summarizes the extracted transcript.

## Environment Variables

- **OpenAI API Key:** Set your OpenAI API key in the environment.

  ```bash
  export OPENAI_API_KEY='your_openai_api_key'
  ```

## Usage

1. **Extract Transcript:**
   - Enter a YouTube video URL and click "Extract."

2. **View and Summarize:**
   - View the extracted transcript and click "Summarize" to get a summary.

3. **Download:**
   - Download the transcript in your preferred format.

## Contributing

Feel free to submit issues or pull requests for improvements.

## License

This project is licensed under the MIT License.