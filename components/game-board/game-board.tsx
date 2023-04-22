import { useState } from 'react';
import styles from './game-board.module.scss';
import { PlayerInfo, Players } from '@/pages/game';

export enum EGameStates {
    PLAYING = 'PLAYING',
    GAME_OVER = 'GAME_OVER'
}

type GameBoardProps = {
    players: PlayerInfo[]
}

const GameBoard = ({ players }: GameBoardProps) => {
    const [board, setBoard] = useState<string[][]>([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);
    const [gameState, setGameState] = useState(EGameStates.PLAYING);
    const [currentPlayer, setCurrentPlayer] = useState('X');

    const handleCellClick = () => {
        console.log('Cell clicked');
    }

    return (
        <div className={styles.board}>
            {board.map((row, rowIndex) => (
                <div key={rowIndex} className={styles.row}>
                    {row.map((cell, columnIndex) => (
                        <div
                            key={columnIndex}
                            className={styles.cell}
                            onClick={() => handleCellClick()}
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