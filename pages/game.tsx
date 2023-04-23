import { useRouter } from "next/router";
import styles from '../styles/Game.module.scss';
import GameBoard from "@/components/game-board/game-board";
import { useContext, useEffect } from "react";
import ScoreBoard from "@/components/score-board/score-board";
import { CommonStoreContext } from "@/stores/common.store";

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
    const { players, setPlayers } = useContext(CommonStoreContext);

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
                <h3>Player 1: {players[0].playerName}</h3>
                <h3>Player 2: {players[1].playerName}</h3>
            </div>

            <div className={styles.game_board}>
                <GameBoard />
            </div>

            <ScoreBoard players={players} />
        </main>
    )
}

export default Game;