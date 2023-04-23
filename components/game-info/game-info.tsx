import { CommonStoreContext } from "@/stores/common.store";
import { useContext } from "react";
import styles from './game-info.module.scss';
import { EGameStates } from "../game-board/game-board";

const GameInfo = () => {
    const { startFresh, resetRound, players, currentGame, currentPlayer, gameState } = useContext(CommonStoreContext);
    const buttonsText = {
        startFresh: 'start from beginning',
        restart: 'restart current round',
    }

    return (
        <div className={styles.game_info}>
            <div className={styles.game_info__item}>
                <div className={styles.game_info__item__text}>
                    <h3>Player 1: </h3> <h3>{players[0].playerName}</h3>
                </div>
                <div className={styles.game_info__item__text}>
                    <h3>Player 2: </h3> <h3>{players[1].playerName}</h3>
                </div>
            </div>

            <div className={styles.game_info__item}>
                <div className={styles.game_info__item__text}>
                    <h3>Round: </h3> <h3>{currentGame.round}</h3>

                </div>
                <div className={styles.game_info__item__text}>
                    {
                        gameState === EGameStates.PLAYING ? (
                            <>
                                <h3>Playing: </h3> <h3>{currentPlayer === 'X' ? players[0].playerName : players[1].playerName}</h3>
                            </>
                        ) : (
                            <>
                                <h3>Winner: </h3> <h3>{currentPlayer === 'X' ? players[0].playerName : players[1].playerName}</h3>
                            </>
                        )
                    }
                </div>
            </div>

            <div className={styles.game_info__buttons}>
                <button onClick={startFresh}>{buttonsText.startFresh.toUpperCase()}</button>
                <button onClick={resetRound}>{buttonsText.restart.toUpperCase()}</button>
            </div>
        </div>
    )
}

export default GameInfo;