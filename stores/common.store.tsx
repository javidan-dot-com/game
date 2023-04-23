import { Game } from "@/components/game-board/game-board";
import { ReactNode, createContext, useState } from "react";

interface ICommonStoreContext {
    gameHistory: Game[];
    setGameHistory: (gameHistory: Game[]) => void;
}

export const CommonStoreContext = createContext<ICommonStoreContext>({
    gameHistory: [],
    setGameHistory: () => { },
});

const CommonStoreProvider = ({ children }: { children: ReactNode }) => {
    const [gameHistory, setGameHistory] = useState<Game[]>([]);

    return (
        <CommonStoreContext.Provider value={{ gameHistory, setGameHistory }}>
            {children}
        </CommonStoreContext.Provider>
    );
};

export default CommonStoreProvider;