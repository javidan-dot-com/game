import { Game } from "@/components/game-board/game-board";
import { PlayerInfo } from "@/pages/game";
import { ReactNode, createContext, useState } from "react";

interface ICommonStoreContext {
    gameHistory: Game[];
    setGameHistory: (gameHistory: Game[]) => void;
    players: PlayerInfo[];
    setPlayers: (players: PlayerInfo[]) => void;
}

export const CommonStoreContext = createContext<ICommonStoreContext>({
    gameHistory: [],
    setGameHistory: () => { },
    players: [],
    setPlayers: () => { },
});

const CommonStoreProvider = ({ children }: { children: ReactNode }) => {
    const [gameHistory, setGameHistory] = useState<Game[]>([]);
    const [players, setPlayers] = useState<PlayerInfo[]>([
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

    return (
        <CommonStoreContext.Provider value={{ gameHistory, setGameHistory, players, setPlayers }}>
            {children}
        </CommonStoreContext.Provider>
    );
};

export default CommonStoreProvider;