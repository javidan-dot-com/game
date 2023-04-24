import { CommonStoreContext } from "@/stores/common.store";
import { useContext } from "react";
import styles from './game-info.module.scss';
import { EGameStates } from "@/lib/types";

const GameInfo = () => {
    const { startFresh, nextRound, restartRound, players, currentGame, currentPlayer, gameState } = useContext(CommonStoreContext);
    const buttonsText = {
        startFresh: 'start from beginning',
        restart: 'restart current round',
        nextRound: 'next round',
    }

    return (
        <div
            className={styles.game_info}
            data-test="game-info"
        >
            <div className={styles.game_info__item}>
                <div
                    className={styles.game_info__item__text}
                    data-test="game-info-first-player"
                >
                    <h3>Player 1: </h3> <h3>{players[0].playerName}</h3>
                </div>
                <div
                    className={styles.game_info__item__text}
                    data-test="game-info-second-player"
                >
                    <h3>Player 2: </h3> <h3>{players[1].playerName}</h3>
                </div>
            </div>

            <div className={styles.game_info__item}>
                <div
                    className={styles.game_info__item__text}
                    data-test="game-info-round"
                >
                    <h3>Round: </h3> <h3>{currentGame.round}</h3>
                </div>

                <div
                    className={styles.game_info__item__text}
                    data-test="game-info-status"
                >
                    {
                        gameState === EGameStates.PLAYING ? (
                            <>
                                <h3>Playing: </h3> <h3>{currentPlayer === 'X' ? players[0].playerName : players[1].playerName}</h3>
                            </>
                        ) : (
                            <>
                                <h3>Winner: </h3> <h3>{currentGame.result}</h3>
                            </>
                        )
                    }
                </div>
            </div>

            <div className={styles.game_info__buttons}>
                <button
                    data-test="restart-game-button"
                    onClick={startFresh}
                >
                    {buttonsText.startFresh.toUpperCase()}
                </button>
                {
                    gameState === EGameStates.PLAYING ? (
                        <button
                            onClick={restartRound}
                            data-test="restart-round-button"
                        >
                            {buttonsText.restart.toUpperCase()}
                        </button>
                    ) : (
                        <button
                            data-test="next-round-button"
                            onClick={nextRound}
                        >
                            {buttonsText.nextRound.toUpperCase()}
                        </button>
                    )
                }
            </div>
        </div>
    )
}

export default GameInfo;