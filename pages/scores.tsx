import { useContext, useEffect } from "react";
import { CommonStoreContext } from '@/stores/common.store';
import { useRouter } from "next/router";
import styles from '../styles/Scores.module.scss';

const Scores = () => {
    const { gameHistory, startFresh, players } = useContext(CommonStoreContext);
    const route = useRouter();

    useEffect(() => {
        if (players[0].playerName === '' || players[1].playerName === '') {
            route.replace({
                pathname: '/',
            });
        }
    }, []);

    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <table>
                    <thead>
                        <tr>
                            <th>Round</th>
                            <th>Result</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gameHistory.map((game, index) => (
                            <tr key={index}>
                                <td>{game.round}</td>
                                <td>{game.result === "Draw" ? game.result : `${game.result} won`}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <button onClick={() => route.back()}>Back to Game</button>
                <button onClick={() => startFresh()}>Start fresh</button>
            </div>
        </main>
    );
};

export default Scores;