import { useRouter } from "next/router";
import styles from '../styles/Game.module.scss';
import GameBoard from "@/components/game-board/game-board";

const Game = () => {
    const router = useRouter();
    const { firstPlayer, secondPlayer } = router.query;

    return (
        <main className={styles.main}>
            <div className={styles.players_info}>
                <h3>First Player: {firstPlayer}</h3>
                <h3>Second Player: {secondPlayer}</h3>
            </div>

            <div className={styles.game_board}>
                <GameBoard />
            </div>

            <div className={styles.score_board}></div>
        </main>
    )
}

export default Game;