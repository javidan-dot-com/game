import { useContext, useEffect } from 'react';
import styles from './game-board.module.scss';
import { CommonStoreContext } from '@/stores/common.store';
import { EGameResults, EGameStates } from '@/lib/types';

const GameBoard = () => {
    const {
        gameHistory,
        setGameHistory,
        players,
        setPlayers,
        board,
        setBoard,
        currentPlayer,
        setCurrentPlayer,
        gameState,
        setGameState,
        currentGame,
        setCurrentGame,
    } = useContext(CommonStoreContext);

    useEffect(() => {
        if (gameState === EGameStates.GAME_OVER) {
            const history = gameHistory;
            const isCurrentGameChanged = currentGame.round !== history[history.length - 1]?.round;

            if (isCurrentGameChanged) {
                setGameHistory([
                    ...history,
                    currentGame,
                ]);

                if (currentGame.result !== EGameResults.DRAW) {
                    const updatedPlayers = players.map(player => {
                        if (player.playerId === currentGame.winnerId) {
                            return {
                                ...player,
                                score: player.score + 1,
                            }
                        }
                        return player;
                    });
                    setPlayers(updatedPlayers);
                }
            };
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
                result: winner === 'X' ? players[0].playerName : players[1].playerName,
                winnerId: winner === 'X' ? players[0].playerId : players[1].playerId,
            });
            setGameState(EGameStates.GAME_OVER);
            return;
        }

        if (checkDraw(newBoard)) {
            setCurrentGame({
                ...currentGame,
                result: EGameResults.DRAW,
                winnerId: 0,
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
        <div className={styles.game_board} data-test="game-board">
            <div className={styles.board} data-test="board">
                {board.map((row, rowIndex) => (
                    <div key={rowIndex} className={styles.row} data-test="row">
                        {row.map((cell, columnIndex) => (
                            <div
                                key={columnIndex}
                                className={styles.cell}
                                onClick={() => gameState === EGameStates.PLAYING && handleCellClick(rowIndex, columnIndex)}
                                data-test={`cell-${rowIndex}-${columnIndex}`}
                            >
                                {cell}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default GameBoard;