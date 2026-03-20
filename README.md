<div align="center">
  <img src="./src/assets/shin.png" alt="Shin Logo" width="500px" />
  <p><strong>Visualize your GitHub programming language usage across repositories and organizations.</strong></p>

  [![Vue 3](https://img.shields.io/badge/Vue-%5E3.0.0-4FC08D?logo=vue.js&logoColor=white)](https://v3.vuejs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-~4.1.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
  [![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8?logo=pwa)](https://web.dev/progressive-web-apps/)
</div>

---

## Table of Contents

- [About](#about)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [License](#license)

---

## About

**Shin** is a Progressive Web App (PWA) that connects to the GitHub API and generates an interactive pie chart of your programming language usage across all your repositories and organizations. It helps developers get a quick, at-a-glance understanding of where they spend their coding time.

---

## Screenshots

<div align="center">
  <img src="https://github.com/user-attachments/assets/62b1aa6e-e570-461a-b95a-9cb7d346d83d" alt="Shin — Home screen" width="80%" />
  <p><em>Home screen — enter your GitHub username, organizations, and optional access token</em></p>
</div>

<div align="center">
  <img src="https://github.com/user-attachments/assets/58d96d88-5abf-42b4-bdda-6ece70f5f68e" alt="Shin — Language summary chart" width="80%" />
  <p><em>Summary view — interactive pie chart showing your programming language breakdown</em></p>
</div>

---

## Features

- 📊 **Language Breakdown** — Aggregates programming language bytes across all your repositories and visualizes them in an interactive pie chart.
- 🏢 **Organization Support** — Include repositories from multiple GitHub organizations alongside your personal repos.
- 📌 **Custom Repository List** — Manually include specific repositories (e.g., `owner/repo`) that aren't under your account.
- 🔑 **GitHub Token Support** — Provide a personal access token to avoid API rate limits.
- 🚫 **Smart Filtering** — Automatically filters out forked repositories and noise languages (CSS, HTML, Markdown, JSON, YAML, etc.) so the chart reflects meaningful code.
- 🎨 **330+ Language Colors** — Every language is rendered with its official community color.
- 📱 **Progressive Web App** — Installable on desktop and mobile with offline support via a service worker.
- ⚡ **Parallel Requests** — Uses `Promise.all()` to fetch repository and language data concurrently for fast results.

---

## Tech Stack

| Category | Technology |
|---|---|
| Framework | [Vue 3](https://v3.vuejs.org/) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| State Management | [Vuex 4](https://vuex.vuejs.org/) |
| Routing | [Vue Router 4](https://router.vuejs.org/) |
| Charts | [Chart.js 3](https://www.chartjs.org/) + [vue3-chartjs](https://github.com/J-T-McC/vue3-chartjs) |
| HTTP Client | [Axios](https://axios-http.com/) |
| Icons | [FontAwesome 5](https://fontawesome.com/) |
| Styling | SCSS |
| Build Tool | [Vue CLI](https://cli.vuejs.org/) |
| PWA | Workbox (GenerateSW) |

---

## Getting Started

### Prerequisites

- **Node.js** ≥ 14 and **npm** ≥ 6
- A [GitHub account](https://github.com/) (a personal access token is optional but recommended to avoid rate limits)

### Installation

```bash
# Clone the repository
git clone https://github.com/mslotwinski-dev/Shin.git
cd Shin

# Install dependencies
npm install
```

### Running the App

**Development server** (with hot-reload at [http://localhost:4000](http://localhost:4000)):

```bash
npm run start
```

**Production build** (output in the `/dist` directory):

```bash
npm run build
```

**Lint and auto-fix** source files:

```bash
npm run lint
```

---

## Usage

1. Open the app in your browser at [http://localhost:4000](http://localhost:4000).
2. Enter your **GitHub username** in the input field.
3. *(Optional)* Add one or more **organizations** to include their repositories.
4. *(Optional)* Add specific **repositories** in `owner/repo` format.
5. *(Optional)* Paste a **GitHub personal access token** in the token field to increase the API rate limit from 60 to 5,000 requests/hour. [Create a token here](https://github.com/settings/tokens/new) — no special scopes are required for public repositories.
6. Click **Summary** to fetch the data and view your language breakdown pie chart.

---

## Configuration

### Environment Variables

Create a `.env` file in the project root to provide a default GitHub API token at build time:

```env
VUE_APP_TOKEN=ghp_your_personal_access_token_here
```

> **Note:** A token entered in the UI at runtime takes precedence over `VUE_APP_TOKEN`.

### Vue CLI Configuration

The app is configured in [`vue.config.ts`](./vue.config.ts):

| Setting | Value |
|---|---|
| Development port | `4000` |
| PWA theme color | `#c3002f` |
| Path alias `@/` | `src/` |
| Path alias `>>/` | `public/` |

---

## Project Structure

```
Shin/
├── public/                 # Static assets and PWA manifest
│   ├── index.html
│   ├── manifest.json       # PWA configuration
│   └── _redirects          # Netlify SPA redirect rule
├── src/
│   ├── assets/             # Images and logo
│   ├── components/
│   │   ├── Charts/         # Pie chart component
│   │   ├── Data/           # Data display components
│   │   ├── Home/           # About, input form, and token components
│   │   ├── Render/         # Language bars and repository list renderers
│   │   ├── Results/        # User profile, repositories, and loading state
│   │   └── Shared/         # Navbar and shared utilities
│   ├── config/             # FontAwesome icon registration
│   ├── data/
│   │   ├── colors.ts       # Language → hex color mappings (330+ languages)
│   │   ├── idontlikeu.ts   # Languages excluded from the chart (CSS, HTML, etc.)
│   │   └── types.ts        # TypeScript interfaces (Params)
│   ├── router/             # Vue Router route definitions
│   ├── services/
│   │   └── github.ts       # GitHub API calls (fetchRepositories, fetchLanguages)
│   ├── store/              # Vuex store (token, request progress)
│   ├── views/              # Page-level components (Home, Summary, Data)
│   ├── App.vue             # Root component
│   └── main.ts             # Application entry point
├── vue.config.ts           # Vue CLI / dev server configuration
├── tsconfig.json           # TypeScript configuration
└── package.json
```

---

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository.
2. **Create** a feature branch: `git checkout -b feature/my-feature`
3. **Commit** your changes: `git commit -m "feat: add my feature"`
4. **Push** to your branch: `git push origin feature/my-feature`
5. **Open a Pull Request** against the `main` branch.

Please make sure your code passes linting before submitting:

```bash
npm run lint
```

---

## License

This project is licensed under the **MIT License** — see the [LICENSE](./LICENSE) file for details.
