// Description: This file contains all the types used in the application

export enum EGameStates {
    PLAYING = 'PLAYING',
    GAME_OVER = 'GAME_OVER',
}

export enum EGameResults {
    DRAW = 'DRAW',
}

export type TGame = {
    result: string;
    winnerId: number;
    round: number;
}

export type TPlayer = {
    playerName: string,
    playerId: number,
    score: number,
}
