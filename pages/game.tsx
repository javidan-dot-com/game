import { useRouter } from "next/router";
import styles from '../styles/Game.module.scss';
import GameBoard from "@/components/game-board/game-board";
import { useEffect, useState } from "react";

export type Players = {
    firstPlayer: string,
    secondPlayer: string
}

export type PlayerInfo = {
    player: string,
    playerName: string,
    score: number
}

const Game = () => {
    const route = useRouter();
    const { firstPlayer, secondPlayer } = route.query as Players;
    const [players, setPlayers] = useState<PlayerInfo[]>([
        {
            player: "Player 1",
            playerName: '',
            score: 0,
        },
        {
            player: "Player 2",
            playerName: '',
            score: 0,
        }]);

    useEffect(() => {
        setPlayers([
            {
                ...players[0],
                playerName: firstPlayer,
            },
            {
                ...players[1],
                playerName: secondPlayer,
            }
        ]);
    }, [firstPlayer, secondPlayer]);

    return (
        <main className={styles.main}>
            <div className={styles.players_info}>
                <h3>Player 1: {firstPlayer}</h3>
                <h3>Player 2: {secondPlayer}</h3>
            </div>

            <div className={styles.game_board}>
                <GameBoard
                    players={players}
                />
            </div>

            <div className={styles.score_board}></div>
        </main>
    )
}

export default Game;