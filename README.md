# Tic-Tac-Toe Game Building

## Contents

- Introduction
- Game Rules
- Setup
- Building Process
- Conclusion

## Introduction

Tic-Tac-Toe is a simple two-player game played on a 3x3 grid. The game is also known as Noughts and Crosses. The objective of the game is to place three marks in a row, either horizontally, vertically, or diagonally.

## Game Rules

- The game is played on a 3x3 grid.
- One player is X, and the other player is O.
- X always starts first.
- Who wins the game is the first player to start the next round.
- Players take turns placing their marks on an empty square.
- The first player to get three marks in a row wins the game.
- If all squares are filled and no player has won, the game is a draw.

## Setup

### Prerequisites

Node environment should be installed on your machine. If not, you can download it from [https://nodejs.org/en/download/](https://nodejs.org/en/download/). Better to use the latest version.

### Installation

1. Clone the repository: `git clone https://github.com/wwJavid/game`
2. Install dependencies
`npm i`
3. Run `npm run build` to build the project
4. Run `npm run dev` to start the server

## Building Process

- Sketching UI
- Defining guidelines
- Branding
- Future improvements
- References

### Sketching UI

After reading the requirements, I started to make sketches to visualize the layout and interface of the game. I sketched out possible designs for the game board, player markers, buttons for starting a new game, and displaying the game's status.

### Branding

In order to create branding for the game, I based upon design system of Monese. I got logo from Monese Media Pack and used it according to brand guidelines. More comprehensive information is acquired from Joe Alisson's design sytem work for Monese.

### Defining guidelines

I followed React’s 5 principles regarding app building alongside Airbnb and BEM style conventions. 

Steps I followed:

Step 1: Breaking the UI into a component hierarchy

Step 2: Building a static version

Step 3: Finding the minimal but complete representation of UI state

Step 4: Identifying where states should live

Step 5: Adding global state management

### Future Improvements

1. Static image format should be replaced with SVG for performance boost.
2. Semantic HTML elements should be improved
3. Form validation should be improved.
4. Responsive design should be implemented.
5. Accessibility should be met.
6. Following Container/Presentational pattern for larger components.
7. Storing game data in indexedDB web storage.

### References

[https://joeallison.co.uk/monesedesignsystem.html](https://joeallison.co.uk/monesedesignsystem.html)

## Conclusion

I enjoyed building the game. Hope you enjoy while playing it. Enjoy!
