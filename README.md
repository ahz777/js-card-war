# Card War Game

A simple, browser-based implementation of the classic "War" card game using the Deck of Cards API. Draw cards against the computer—highest card wins each round until the deck is exhausted.

## Features

- Draw two cards per round (player vs. computer)
- Automatic score tracking
- Animated card draws and visual highlights for the winner
- Game over overlay with final scores and replay option
- Responsive design; works on mobile and desktop

## Quick Start

1. Clone or download this repository.
2. Open `index.html` in any modern web browser (Chrome, Edge, Firefox, Safari).
3. Click **New Deck** to initialize a fresh deck.
4. Click **Draw** to play rounds until the deck runs out.

Tip: If you prefer a local server, you can use the VS Code Live Server extension or any static server.

## Requirements

- Modern web browser
- Internet connection (to access the Deck of Cards API)
- No build steps, package manager, or server required

## How to Play

1. Click **New Deck** to fetch and shuffle a new deck from the API.
2. Click **Draw** to pull two cards—one for the computer and one for you.
3. The higher-ranked card wins the round.
4. In case of a tie, the round is marked as "War!" and no points are awarded.
5. Continue drawing until no cards remain. The game over screen will show the final result.

## Project Structure

- `index.html` — Main HTML file and UI layout
- `script.js` — Game logic, event handling, and API interactions
- `style.css` — Visual styling and animations
- `background.png` — Background image
- `icon.png` — Favicon

## How It Works

- The game disables the **Draw** button until a new deck is created.
- On **New Deck**, scores and UI states reset, and a shuffled deck is requested from the API.
- On **Draw**, two cards are fetched and displayed with a short animation.
- The function `winnerCard(card1, card2)` compares ranks to decide the round outcome.
- Visual cues:
  - Player/computer winner highlights
  - "War!" highlight in case of a tie
  - Final overlay with scores and replay when the deck is empty

### Card Ranking

`2 < 3 < 4 < 5 < 6 < 7 < 8 < 9 < 10 < JACK < QUEEN < KING < ACE`

## API Usage

This project uses the public Deck of Cards API:

- Create and shuffle a new deck
  - `GET https://www.deckofcardsapi.com/api/deck/new/shuffle/`
- Draw two cards from a deck
  - `GET https://deckofcardsapi.com/api/deck/{deck_id}/draw/?count=2`

Notes:

- Network access is required for API calls.
- If a request fails, an error is logged to the console and the UI remains safe.

## Development

- JavaScript: `script.js` (vanilla ES6)
  - Key functions: `handleNewDeck`, `handleDraw`, `winnerCard`
- Styling: `style.css`
  - Card animations: `.card-drawn`
  - Winner glow effect: `.winning-card`
- HTML: `index.html`

### Run with a Local Static Server (optional)

- VS Code: Install the "Live Server" extension and click "Go Live" on `index.html`.
- Node users: `npx serve .` (or any static server) and open the printed URL.

## Troubleshooting

- Draw button disabled: Click **New Deck** first.
- Images or draws not loading: Check your internet connection or browser console.
- Final screen stuck or overlapping: Click **Play Again** to reset.

## Credits

- Card data/images: [Deck of Cards API](https://www.deckofcardsapi.com/)

## License

This project is licensed under the MIT License — see `LICENSE` for details.
