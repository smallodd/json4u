<p align="center">
<img src="./src/app/icon.svg" height="150" alt="JSON editor logo">
</p>

# JSON Editor

A privacy-first JSON visualization and processing tool. JSON is parsed and transformed in your browser; this application does not provide a server-side API for editor content.

## Features

- Graph and table views
- JSON validation, formatting, nesting, and comparison
- jq support through locally served WebAssembly
- CSV import and export
- JSONPath, URL, escaping, and Python-dict conversion tools

## Deploy on Vercel

Import this repository in Vercel as a Next.js project. No `vercel.json` is required.

Vercel supplies a default deployment URL. Set these variables to customize your deployment:

```dotenv
NEXT_PUBLIC_SITE_URL=https://json.example.com
NEXT_PUBLIC_SITE_NAME=My JSON Tool
NEXT_PUBLIC_DEFAULT_LOCALE=en
NEXT_PUBLIC_REPOSITORY_URL=https://github.com/your-account/your-repository
NEXT_PUBLIC_FEEDBACK_URL=https://github.com/your-account/your-repository/issues/new
```

The interface follows the browser's preferred language when it is Chinese or English. `NEXT_PUBLIC_DEFAULT_LOCALE` is the fallback when neither language is preferred or no language preference is sent; it defaults to English.

Optional integrations are disabled unless you configure them:

```dotenv
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ADSENSE_CLIENT=ca-pub-1234567890
NEXT_PUBLIC_MONACO_VS_URL=/monaco/vs
NEXT_PUBLIC_FILE_NAME_PREFIX=my-json
```

Preview deployments use their own generated URL and prevent indexing automatically. Set `NEXT_PUBLIC_SITE_URL` only for Production; a value shared with Preview would make Preview metadata point to the Production site. Do not set Google Analytics or AdSense variables if you do not want those third-party scripts loaded.

## Local development

```sh
pnpm install
pnpm dev
```

Open <http://localhost:3000>. Monaco editor assets are copied to `public/monaco` automatically before development and production builds.

## Privacy boundary

Editor content remains in the browser and local IndexedDB. Some user-initiated features, such as URL parsing and image preview, request the URL supplied by the user from the browser. Optional Google Analytics and AdSense integrations process data under their respective policies when configured by the deployer.

## Acknowledgements

This project is a privacy-focused fork of [loggerhead/json4u](https://github.com/loggerhead/json4u), originally created by loggerhead. We are grateful to the original author and all upstream contributors for the foundation of this project.

## License

Licensed under [Apache-2.0](./LICENSE). Original copyright and license notices are retained.
