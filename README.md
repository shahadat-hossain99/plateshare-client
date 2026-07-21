# 🍽️ PlateShare — Recipe Sharing & Weekly Meal Planner

[![Live Site](https://img.shields.io/badge/Live-plateshare--client--alpha.vercel.app-c0522d?style=flat-square)](https://plateshare-client-alpha.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-App%20Router-000000?style=flat-square&logo=next.js)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?style=flat-square&logo=tailwindcss)](https://tailwindcss.com/)
[![JavaScript](https://img.shields.io/badge/JavaScript-JSX-f7df1e?style=flat-square&logo=javascript)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](./LICENSE)

**Live Site:** https://plateshare-client-alpha.vercel.app/
**Backend Repo:** https://github.com/shahadat-hossain99/plateshare-server

PlateShare is a full-stack recipe sharing platform where home cooks publish recipes and build a personalized **weekly meal plan** with an auto-generated shopping list. This repository is the **client (frontend)** — a Next.js App Router application consuming a separate Express/MongoDB API, with JWT auth via HTTP-only cookies and two integrated AI features.

---

## Table of Contents

- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Routing Overview](#-routing-overview)
- [Design System](#-design-system)
- [Deployment](#-deployment)
- [Related Repository](#-related-repository)
- [License](#-license)

---

## ✨ Key Features

- **Recipe Sharing** — Registered users publish recipes with ingredients, step-by-step instructions, cook time, difficulty, and cuisine tags; owners can edit or delete only their own listings.
- **Weekly Meal Planner** — A Mon–Sun × Breakfast/Lunch/Dinner grid where saved recipes are assigned to slots, with a confirmation modal when a slot is already filled.
- **Auto-Generated Shopping List** — Ingredients from every recipe in the current week's plan are merged, de-duplicated, and made printable.
- **AI Recipe Copy Generator** — Converts rough ingredients/steps into a polished title, description, and formatted instructions, with adjustable tone/length and a Regenerate action.
- **AI "What Should I Cook?" Recommender** — Personalized suggestions based on saved Cookbook items and empty meal-plan slots, refinable by cuisine, cook time, and difficulty.
- **Secure Authentication** — Email/password and Google OAuth, JWT stored in HTTP-only cookies, server-verified private routes with no flash-of-redirect on reload.
- **Search & Filter** — Recipe discovery by name, cuisine tag, cook time, and difficulty.
- **Responsive, Branded UI** — Custom "Harvest Table" color theme and Fraunces + Plus Jakarta Sans typography, tuned for mobile, tablet, and desktop.

---

## 🛠️ Tech Stack

| Layer         | Technology                                           |
| ------------- | ---------------------------------------------------- |
| Framework     | Next.js (App Router), React                          |
| Language      | JavaScript (JSX only — no TypeScript)                |
| Styling       | Tailwind CSS v4, custom CSS variables                |
| Notifications | Sonner                                               |
| Icons         | Lucide React                                         |
| Image hosting | ImgBB                                                |
| Auth          | JWT (HTTP-only cookies), Google OAuth                |
| AI            | Anthropic API (content generation + recommendations) |
| Deployment    | Vercel                                               |

---

## 📁 Folder Structure

```
plateshare-client/
├── app/
│   ├── (public)/            # Home, Recipes, Login, Register
│   ├── (private)/           # Add Recipe, My Cookbook, Meal Planner
│   ├── recipes/[id]/        # Recipe details page
│   ├── layout.jsx           # Root layout: fonts, Navbar, Footer, Toaster
│   └── globals.css          # Theme tokens + base styles
├── components/
│   ├── Shared/               # Navbar, Footer
│   └── Ui/                   # Button, Container, Input, SectionTitle, ImageUpload
├── hooks/
│   └── useImageUpload.js
├── lib/
│   └── core/session.js       # Server-side session helper
├── public/
├── .env.local                # Not committed — see Environment Variables
├── next.config.js
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm (or yarn/pnpm)
- A running instance of the [PlateShare backend](https://github.com/shahadat-hossain99/plateshare-server)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shahadat-hossain99/plateshare-client.git
cd plateshare-client

# 2. Install dependencies
npm install

# 3. Set up environment variables (see below)
cp .env.example .env.local

# 4. Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🔐 Environment Variables

Create a `.env.local` file in the project root:

```env
NEXT_PUBLIC_API_URL=https://plateshare-backend-alpha.vercel.app
NEXT_PUBLIC_IMGBB_API_KEY=your_imgbb_api_key
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

> Never commit `.env.local`. Backend-only secrets (MongoDB URI, JWT secret, AI API key) live in the [server repo](https://github.com/shahadat-hossain99/plateshare-server), not here.

---

## 📜 Available Scripts

| Command         | Description                        |
| --------------- | ---------------------------------- |
| `npm run dev`   | Start the local development server |
| `npm run build` | Create a production build          |
| `npm run start` | Serve the production build locally |
| `npm run lint`  | Run ESLint against the codebase    |

---

## 🧭 Routing Overview

| Route                 | Access  | Description                      |
| --------------------- | ------- | -------------------------------- |
| `/`                   | Public  | Home page, latest 6 recipes      |
| `/recipes`            | Public  | All recipes, search & filter     |
| `/recipes/[id]`       | Public  | Recipe details, save/edit/delete |
| `/login`, `/register` | Public  | Authentication                   |
| `/add-recipe`         | Private | Create a new recipe              |
| `/my-cookbook`        | Private | Saved recipes                    |
| `/meal-planner`       | Private | Weekly planner + shopping list   |

Private routes are guarded server-side via session checks in `lib/core/session.js` — no client-side-only redirect flashes, and no forced re-login on page reload.

---

## 🎨 Design System

- **Colors:** custom "Harvest Table" theme — burnt terracotta primary, herb green secondary, warm cream background, espresso dark text (see `app/globals.css`).
- **Typography:** `Fraunces` for headings, `Plus Jakarta Sans` for body text, loaded via `next/font/google` and exposed as CSS variables.
- **Components:** all shared UI (`Button`, `Container`, `Input`, `SectionTitle`, `ImageUpload`) lives in `components/Ui/` and is theme-driven via CSS variables, so the whole app re-themes from one file.

---

## ☁️ Deployment

The frontend is deployed on **Vercel** and auto-deploys from the `main` branch.

- Live: https://plateshare-client-alpha.vercel.app/
- Ensure all environment variables above are set in the Vercel project dashboard before deploying.

---

## 🔗 Related Repository

- **Backend (API):** [plateshare-server](https://github.com/shahadat-hossain99/plateshare-server) — Express + MongoDB, JWT auth, AI endpoints.

---

## 📄 License

This project is open source and available under the [MIT License](./LICENSE).

---

Built by [Shahadat Hossain](https://github.com/shahadat-hossain99) — [Portfolio](https://shahadat-portfolio-999.vercel.app/)
