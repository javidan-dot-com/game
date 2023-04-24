import styles from '../styles/Game.module.scss';
import GameBoard from "@/components/game-board/game-board";
import ScoreBoard from "@/components/score-board/score-board";
import GameInfo from "@/components/game-info/game-info";
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';
import { CommonStoreContext } from '@/stores/common.store';

export type Players = {
    firstPlayer: string,
    secondPlayer: string
}

const Game = () => {
    const route = useRouter();
    const { players } = useContext(CommonStoreContext);

    useEffect(() => {
        if (players[0].playerName === '' || players[1].playerName === '') {
            route.replace({
                pathname: '/',
            });
        }
    }, []);

    return (
        <main className={styles.main}>
            <GameInfo />

            <GameBoard />

            <ScoreBoard />
        </main>
    )
}

export default Game;