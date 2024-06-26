import styles from './score-board.module.scss';
import { useRouter } from 'next/router';
import { CommonStoreContext } from '@/stores/common.store';
import { useContext } from 'react';
import { TPlayer } from '@/lib/types';

const ScoreBoard = () => {
    const route = useRouter();
    const { players, gameHistory } = useContext(CommonStoreContext);

    const sortPlayers = (players: TPlayer[]) => {
        const clonedPlayers = players.slice();
        return clonedPlayers.sort((a, b) => b.score - a.score);
    }
    const sortedList = sortPlayers(players);

    const scoreBoardText = {
        button: 'See previous results',
    }
    const historyIsEmpty = () => {
        if (gameHistory.length === 0) {
            return true;
        }
        return false;
    }
    const handleOnClick = () => {
        if (historyIsEmpty()) {
            return;
        }
        route.push('/scores');
    }

    return (
        <div
            className={styles.score_board}
            data-test={"score-board"}
        >
            <ul
                className={styles.score_board__list}
                data-test={"score-board-list"}
            >
                <h3>Score Board</h3>
                {
                    sortedList.map((player, index) => (
                        <li
                            key={index}
                            data-test={"score-board-list-item"}
                        >
                            <div>
                                <p>{player.playerName}</p>
                            </div>

                            <div>
                                <p>{player.score}</p>
                            </div>
                        </li>
                    ))
                }
                {
                    !historyIsEmpty() && (
                        <button
                            className={styles.score_board__item__button}
                            data-test={"see-pre-results-button"}
                            onClick={handleOnClick}
                        >
                            {scoreBoardText.button}
                        </button>
                    )
                }
            </ul>
        </div>
    )
}

export default ScoreBoard;