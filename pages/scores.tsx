import { useContext, useEffect } from "react";
import { CommonStoreContext } from '@/stores/common.store';
import { useRouter } from "next/router";
import styles from '../styles/Scores.module.scss';
import { EGameResults } from "@/lib/types";
import Head from "next/head";

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
        <>
            <Head>
                <title>Tic Tac Toe</title>
                <meta name="description" content="Tic Tac Toe" />
                <link rel="icon" href="/logo-icon.ico" />
                <meta name="author" content="wwJavid" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>

            <main className={styles.main}>
                <div className={styles.container}>
                    <table
                        data-test="scores-table"
                    >
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
                                    <td>{game.result === EGameResults.DRAW ? game.result : `${game.result} won`}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    <button
                        onClick={() => route.back()}
                        data-test="back-to-game-button"
                    >Back to Game</button>
                    <button
                        onClick={() => startFresh()}
                        data-test="restart-game-button"
                    >
                        Start fresh
                    </button>
                </div>
            </main>
        </>
    );
};

export default Scores;