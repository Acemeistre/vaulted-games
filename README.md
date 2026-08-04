<p align="center">
<img src="./src/assets/Screenshots/Vaulted games_README-Header.gif">
</p>

[![Static Badge](https://img.shields.io/badge/Version%3A-1.1-darkgreen)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Codecademy](https://img.shields.io/badge/Codecademy-%2321759B.svg?logo=codecademy&logoColor=white)](https://www.codecademy.com/profiles/Acemeistre)
[![GitHub](https://img.shields.io/badge/GitHub-repo-blue?logo=github
)](https://github.com/Acemeistre/Portfolio-Project_Golf-sweepstake-app)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)](#)
[![Vercel](https://img.shields.io/badge/Vercel-%23000000.svg?logo=vercel&logoColor=white)](https://vercel.com/glenn-niblett-s-projects/golf-sweepstake-app)
[![Visual Studio Code](https://custom-icon-badges.demolab.com/badge/Visual%20Studio%20Code-0078d7.svg?logo=visualstudiocode&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![Javascript](https://img.shields.io/badge/JavaScript-%2320232a.svg?logo=javascript)](#)
[![CSS](https://img.shields.io/badge/CSS-red?style=flat&logo=css&logoColor=white&color=red
)](#)



# 🎮 Vaulted Games app
An app used to track, store and organize any person's history of video game experiences.

## Table of contents
- [Overview](#overview)
- [Disclaimer](#disclaimer)
- [Screenshots](#screenshots)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation & usage](#installation--usage)
- [Known limitations](#known-limitations)
- [Roadmap](#roadmap)
- [Maintenance requirements](#maintenance-requirements)
- [Acknowledgements](#acknowledgements)
- [License](#license)

## 📖 Overview
'Vaulted games' is an app that lets users record any and all video games that they may have played, completed or competed in.

The overall idea is for users to be able to log any game title, combined with choice of year and platform they played, as well as being able to rate and rank those gaming experiences.

Maximum flexibilty as to how users can view and organize their game titles has been designed through a sort bar mechanism so that they can choose from the aforementioned platforms, years, ratings and rankings, as well as genres, a-z, z-a, oldest and newest entries.

This is all presented in a retro-gaming aesthetic, with plenty of animations designed, to add a sense of interactivity and dynamism to the app's appeal.

## 📋 Disclaimer
This app uses flashing visual effects, that could potentially be hazardous to some users who can suffer from photo-sensitive epilepsy. Please use with caution.

## 📸 Screenshots 

#### Vaulted games - Screenshot
<img src="./src/assets/Screenshots/Vaulted games_screenshot.jpg" width="600">

#### Vaulted games - demo
<img src="./src/assets/Screenshots/Vaulted games_demo.gif" width="600">

## ✨ Features
* **Game Entry** - allows you to enter in platform, year, title, genre, rating and conditional rank (appears for Top 10/20 ratings) of new game titles.
* **Smart filtering and Sorting** - allows users to select and filter games via platform, year, genre rating or alphabetically.
* **Retro Animation System** 
    * Terminal boot-up flicker on game rows (triggered by sort filter changes and page load)
    * Typewriter text effect — fields type out character by character.
    * Ambient letter flicker on headers. 
    * Neon sign text css shadow effect.
    * Random TV static on input fields
    * Drifting pixel art controller icons in margins

## 🛠️ Tech Stack
- **React** - components-based UI framework.
- **Vite** - build tool and local development server.
- **JavaScript (ES6+)** - app logic and custom hooks.
- **CSS** - component-scoped styling.
- **Vercel** - deployment and hosting.
- **Figma** - UI design and prototyping.


## ⚙️ Installation & usage

### Prerequisites
- Node.js (v18 or higher)
- npm

### Clone the repository
```bash
git clone https://github.com/Acemeistre/vaulted-games.git
cd vaulted-games
```

### Install dependencies
```bash
npm install
```

### Run locally
```bash
npm run dev
```

### Or visit the live app
[vaulted-games.vercel.app](https://vaulted-games.vercel.app/)

### Sample Data
The app comes pre-loaded with 6 sample games to demonstrate its features. 
Clear localStorage in your browser's dev tools (Application → Local Storage) 
and add your own games to start your personal library.

## ⚠️ Known limitations
#### Technical:
- App is landscape-only for mobile — portrait mobile shows a rotate prompt by design (768px is the minimum supported viewport width).
- Margin pixel art decoration only shows at a viewport width of 1680px and above.
- Local storage only — data doesn't sync across devices or browsers.
- Global CSS rules (h2, h3, select, input, button) are duplicated across component CSS files EntryBar and SortBar, rather than being consolidated in index.css — a future refactor could improve maintainability.

#### UX/Design:
- Native 'select' elements limit styling of placeholder text colour.
- Platform sort dropdown shows a flat list rather than brand-grouped options (in roadmap).
- Occasional animation edge cases when adding new games or rapidly changing filters.

#### Data:
- Genre and platform lists are predefined — users can't add custom genres/platforms (intentional for data integrity)
- No import/export functionality for the game library.


## 🗺️ Roadmap

**The following points are the current pipeline of updates coming to future versions of the Vaulted Games app.**

- Platform brand grouping in sort bar (so N64, GameCube, Switch etc. group under Nintendo like in EntryBar)
- Fix occasional animation edge cases on new game entries and filter changes

## 🔧 Maintenance Requirements

**This app is low maintenance by design, for example; there are no external API dependencies.**

- Local storage - if the data structure ever changes (new fields added etc.), existing saved data would need migrating.
- Year cap — already auto-handled with new Date().getFullYear() ✅

## 🙏 Acknowledgements
- [kenney.nl](https://kenney.nl/assets/input-prompts)

## 🔓 License
This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).
