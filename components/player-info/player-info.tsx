import { CommonStoreContext } from "@/stores/common.store";
import { useContext } from "react";
import styles from './player-info.module.scss';

export type TPlayerInfo = {
    playerName: string,
    playerId: number,
    score: number,
}

interface PlayerInfoProps {
    players: TPlayerInfo[];
}

const PlayerInfo = ({ players }: PlayerInfoProps) => {
    const { startFresh, resetRound } = useContext(CommonStoreContext);
    const buttonsText = {
        startFresh: 'start from beginning',
        restart: 'restart current round',
    }

    return (
        <div className={styles.player_info}>
            <div className={styles.player_info__details}>
                <h3>Player 1: <span>{players[0].playerName}</span></h3>
                <h3>Player 2: <span>{players[1].playerName}</span></h3>
            </div>

            <div className={styles.player_info__buttons}>
                <button onClick={startFresh}>{buttonsText.startFresh.toUpperCase()}</button>
                <button onClick={resetRound}>{buttonsText.restart.toUpperCase()}</button>
            </div>
        </div>
    )
}

export default PlayerInfo;