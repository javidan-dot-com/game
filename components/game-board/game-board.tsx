import { useState } from 'react';
import styles from './game-board.module.scss';
import { PlayerInfo } from '@/pages/game';

export enum EGameStates {
    PLAYING = 'PLAYING',
    GAME_OVER = 'GAME_OVER'
}

type GameBoardProps = {
    players: PlayerInfo[]
}

type Game = {
    result: string;
    winner: string;
    round: number;
}

const GameBoard = ({ players }: GameBoardProps) => {
    const [board, setBoard] = useState<string[][]>([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);
    const [gameState, setGameState] = useState(EGameStates.PLAYING);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [currentGame, setCurrentGame] = useState<Game>({
        result: '',
        winner: '',
        round: 1,
    });

    const handleCellClick = (rowIndex: number, colIndex: number) => {
        if (board[rowIndex][colIndex] !== '') {
            return;
        }

        const newBoard = [...board];
        newBoard[rowIndex][colIndex] = currentPlayer;
        setBoard(newBoard);

        const nextPlayer = currentPlayer === 'X' ? 'O' : 'X';
        setCurrentPlayer(nextPlayer);

        const winner = calculateWinner(newBoard);
        if (winner) {
            setCurrentGame({
                ...currentGame,
                result: winner === 'X' ? `${players[0].playerName} wins` : `${players[1].playerName} wins`,
                winner: winner === 'X' ? players[0].player : players[1].player,
            });
            setGameState(EGameStates.GAME_OVER);
            return;
        }

        if (checkDraw(newBoard)) {
            setCurrentGame({
                ...currentGame,
                result: 'Draw',
                winner: '',
            });
            setGameState(EGameStates.GAME_OVER);
            return;
        }
    }

    const calculateWinner = (board: string[][]) => {
        const possibleWins = [
            [board[0][0], board[0][1], board[0][2]],
            [board[1][0], board[1][1], board[1][2]],
            [board[2][0], board[2][1], board[2][2]],
            [board[0][0], board[1][0], board[2][0]],
            [board[0][1], board[1][1], board[2][1]],
            [board[0][2], board[1][2], board[2][2]],
            [board[0][0], board[1][1], board[2][2]],
            [board[2][0], board[1][1], board[0][2]],
        ];

        for (const cells of possibleWins) {
            if (cells.every(cell => cell !== '' && cell === cells[0])) {
                return cells[0];
            }
        }

        return null;
    };

    const checkDraw = (board: string[][]): boolean => {
        return board.every(row => row.every(cell => cell !== ''));
    }

    return (
        <div className={styles.board}>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                    {row.map((cell, columnIndex) => (
                        <div
                            key={columnIndex}
                            className={styles.cell}
                            onClick={() => handleCellClick(rowIndex, columnIndex)}
                        >
                            {cell}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    )
}

export default GameBoard;