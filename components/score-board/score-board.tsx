import { PlayerInfo } from '@/pages/game';
import styles from './score-board.module.scss';
import { useRouter } from 'next/router';

interface ScoreBoardProps {
    players: PlayerInfo[];
}

const ScoreBoard = ({ players }: ScoreBoardProps) => {
    const route = useRouter();

    const sortPlayers = (players: PlayerInfo[]) => {
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