import { useContext, useEffect, useState } from 'react';
import styles from './game-board.module.scss';
import { PlayerInfo } from '@/pages/game';
import { CommonStoreContext } from '@/stores/common.store';

export enum EGameStates {
    PLAYING = 'PLAYING',
    GAME_OVER = 'GAME_OVER'
}

type GameBoardProps = {
    players: PlayerInfo[]
    setPlayers: (players: PlayerInfo[]) => void;
}

export type Game = {
    result: string;
    winner: string;
    round: number;
}

const GameBoard = ({ players, setPlayers }: GameBoardProps) => {
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
    const { gameHistory, setGameHistory } = useContext(CommonStoreContext);

    useEffect(() => {
        if (gameState === EGameStates.GAME_OVER) {
            const history = gameHistory;

            setGameHistory([
                ...history,
                currentGame,
            ]);
        }
    }, [gameState]);

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
                    },
                    {
                        ...players[1],
                        playerName: players[0].playerName,
                    }
                ]);
            }
        }
    }

    return (
        <>
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
                <h3>Round: {currentGame.round}</h3>
                <h3>Winner: {currentGame.result}</h3>

                {gameState === EGameStates.GAME_OVER && (
                    <button
                        onClick={handleRestartGame}
                    >
                        Restart Game
                    </button>
                )}
            </div>
        </>
    )
}

export default GameBoard;