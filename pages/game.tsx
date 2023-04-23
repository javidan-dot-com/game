import { useRouter } from "next/router";
import styles from '../styles/Game.module.scss';
import GameBoard from "@/components/game-board/game-board";
import { useContext, useEffect } from "react";
import ScoreBoard from "@/components/score-board/score-board";
import { CommonStoreContext } from "@/stores/common.store";
import PlayerInfo from "@/components/player-info/player-info";

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
            <PlayerInfo players={players} />

            <GameBoard />

            <ScoreBoard />
        </main>
    )
}

export default Game;