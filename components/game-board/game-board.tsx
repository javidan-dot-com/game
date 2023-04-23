import { useContext, useEffect, useState } from 'react';
import styles from './game-board.module.scss';
import { PlayerInfo } from '@/pages/game';
import { CommonStoreContext } from '@/stores/common.store';

export enum EGameStates {
    PLAYING = 'PLAYING',
    GAME_OVER = 'GAME_OVER'
}

export type Game = {
    result: string;
    winner: string;
    round: number;
}

const GameBoard = () => {
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
    const { gameHistory, setGameHistory, players, setPlayers } = useContext(CommonStoreContext);

    useEffect(() => {
        if (gameState === EGameStates.GAME_OVER) {
            const history = gameHistory;

            setGameHistory([
                ...history,
                currentGame,
            ]);

            const winner = currentGame.winner;
            if (winner) {
                const newPlayers = players.map(player => {
                    if (player.player === winner) {
                        return {
                            ...player,
                            score: player.score + 1,
                        }
                    }

                    return player;
                });

                setPlayers(newPlayers);
            }
        }
    }, [gameState]);

    useEffect(() => {
        const ifHistoryExists = gameHistory.length > 0;
        if (ifHistoryExists && gameState === EGameStates.PLAYING) {
            const lastGame = gameHistory[gameHistory.length - 1];
            setCurrentGame({
                ...lastGame,
                round: lastGame.round + 1,
            });
        }
    }, [gameHistory]);

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
                result: winner === 'X' ? `${players[0].playerName} won` : `${players[1].playerName} won`,
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

    const handleRestartGame = () => {
        setBoard([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]);
        setCurrentPlayer('X');
        setGameState(EGameStates.PLAYING);
        setCurrentGame({
            result: '',
            winner: '',
            round: currentGame.round + 1,
        });

        const history = gameHistory;

        if (history.length > 0) {
            const previousGame = history[history.length - 1];
            if (previousGame.winner === players[1].player) {
                console.log(history, previousGame, players)
                setPlayers([
                    {
                        ...players[0],
                        playerName: players[1].playerName,
                        score: players[1].score,
                    },
                    {
                        ...players[1],
                        playerName: players[0].playerName,
                        score: players[0].score,
                    }
                ]);
            }
        }
    }

    return (
        <div className={styles.game_board}>
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

            <div>
                <h4>Round: {currentGame.round}</h4>
                {
                    gameState === EGameStates.PLAYING && (
                        <h4>Current Player: {currentPlayer === 'X' ? players[0].playerName : players[1].playerName}</h4>
                    )
                }

                {
                    gameState === EGameStates.GAME_OVER && (
                        <h3>{currentGame.result}</h3>
                    )
                }

                {gameState === EGameStates.GAME_OVER && (
                    <button
                        onClick={handleRestartGame}
                    >
                        Restart Game
                    </button>
                )}
            </div>
        </div>
    )
}

export default GameBoard;