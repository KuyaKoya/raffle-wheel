# Raffle Wheel

A vibrant and interactive Raffle Wheel application built with **Vue 3**, **TypeScript**, and **Pinia**.

## Features

- **Interactive Wheel**: smoothly animated spinning wheel using HTML5 Canvas.
- **Winner Selection**: Randomly selects a winner with a drumroll effect.
- **Drumroll & Animations**: Lively UI with animated gradient backgrounds and glassmorphism effects.
- **Manage Entries**:
  - Add names manually.
  - **Numeric Auto-Fill**: Quickly generate a range of numbers (e.g., 1-50).
  - Remove individual names.
- **Winner Management**:
  - Winners are removed from the main wheel to avoid repeats.
  - "Removed Items" list tracks past winners.
- **Controls**:
  - **Shuffle**: Randomize the list order.
  - **Clear All**: Reset the entire board.
  - **Restart**: Restore all removed winners back to the wheel.

## Tech Stack

- [Vue 3](https://vuejs.org/) - The Progressive JavaScript Framework
- [Vite](https://vitejs.dev/) - Next Generation Frontend Tooling
- [Pinia](https://pinia.vuejs.org/) - The intuitive store for Vue.js
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript at Any Scale

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Type-Check, Compile and Minify for Production

```sh
pnpm build
```

### Lint with [ESLint](https://eslint.org/)

```sh
pnpm lint
```
