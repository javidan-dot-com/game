import { Game } from "@/components/game-board/game-board";
import { TPlayerInfo } from "@/components/player-info/player-info";
import { useRouter } from "next/router";
import { ReactNode, createContext, useState } from "react";

interface ICommonStoreContext {
    gameHistory: Game[];
    setGameHistory: (gameHistory: Game[]) => void;
    players: TPlayerInfo[];
    setPlayers: (players: TPlayerInfo[]) => void;
    startFresh: () => void;
}

export const CommonStoreContext = createContext<ICommonStoreContext>({
    gameHistory: [],
    setGameHistory: () => { },
    players: [],
    setPlayers: () => { },
    startFresh: () => { },
});

const CommonStoreProvider = ({ children }: { children: ReactNode }) => {
    const route = useRouter();
    const [gameHistory, setGameHistory] = useState<Game[]>([]);
    const [players, setPlayers] = useState<TPlayerInfo[]>([
        {
            player: "Player 1",
            playerName: '',
            score: 0,
        },
        {
            player: "Player 2",
            playerName: '',
            score: 0,
        }]);
    const startFresh = () => {
        route.push('/');
        setGameHistory([]);
        setPlayers([
            {
                player: "Player 1",
                playerName: '',
                score: 0,
            },
            {
                player: "Player 2",
                playerName: '',
                score: 0,
            }]
        );
    }

    return (
        <CommonStoreContext.Provider value={{ gameHistory, setGameHistory, players, setPlayers, startFresh }}>
            {children}
        </CommonStoreContext.Provider>
    );
};

export default CommonStoreProvider;