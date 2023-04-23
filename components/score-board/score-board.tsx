import styles from './score-board.module.scss';
import { useRouter } from 'next/router';
import { CommonStoreContext } from '@/stores/common.store';
import { useContext } from 'react';
import { TPlayerInfo } from '../player-info/player-info';

const ScoreBoard = () => {
    const route = useRouter();
    const { players } = useContext(CommonStoreContext);

    const sortPlayers = (players: TPlayerInfo[]) => {
        return players.sort((a, b) => b.score - a.score);
    }
    const sortedList = sortPlayers(players);

    return (
        <div className={styles.score_board}>
            <h3>Score Board</h3>

            <ul className={styles.score_board__item}>
                {
                    sortedList.map((player, index) => (
                        <li key={index}>
                            <div>
                                <p>{player.playerName}</p>
                            </div>

                            <div>
                                <p>{player.score}</p>
                            </div>
                        </li>
                    ))
                }

                <button
                    className={styles.score_board__item__button}
                    onClick={() => route.push('/scores')}
                >
                    See previous results
                </button>
            </ul>
        </div>
    )
}

export default ScoreBoard;