![badge](https://img.shields.io/github/watchers/wdpedroborges/music-quiz?style=social)
![badge](https://img.shields.io/github/stars/wdpedroborges/music-quiz?style=social)
![badge](https://img.shields.io/github/license/wdpedroborges/music-quiz)
![badge](https://img.shields.io/badge/powered%20by-vite-blue)
![badge](https://img.shields.io/badge/powered%20by-react.js-blue)
![badge](https://img.shields.io/badge/powered%20by-typescript-blue)
![badge](https://img.shields.io/badge/powered%20by-sass.js-blue)

# Music Quiz
## A quiz based in the model Better Quiz

The quiz app designed for training music ear is an excellent resource for anyone who is interested in improving their musical skills. The app offers a range of quizzes that are designed to help users recognize intervals, chords, and other musical elements by ear. The app is made for people who want to improve their ability to identify different musical components without needing to rely on visual aids or sheet music.

## Live Demo

wdpedroborges.github.io/music-quiz

## Features

- Filter questions by categories
- Suggestions
- Configurable timer
- Points counting
- Performance calculation
- Record storage in Local Storage
- Processes text, images, and audio

## Tech

- Vite
- React.js
- Typescript
- Sass

## Installation

Clone the repository:

```bash
git clone https://github.com/wdpedroborges/music-quiz
```

For production:

```sh
cd music-quiz
npm install
npm run dev
```

Debug in Typescript:

```bash
tsc --noEmit --watch
```

Build:

```bash
npm run build
```

## Deploy

- Add to vite.config.js:

```bash
base: "/<repo>/"
```

- Then:

```bash
npm install gh-pages --save-dev
```

- Add to package.json

```bash
 "homepage": "https://<username>.github.io/<repo>/",
  ...
  "scripts": {
...
"build": "vite build",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist",
...
```

## License

This project is licensed under the MIT License. Please see the LICENSE file for more details.