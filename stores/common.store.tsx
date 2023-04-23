import { EGameStates, Game } from "@/components/game-board/game-board";
import { useRouter } from "next/router";
import { ReactNode, createContext, useState } from "react";

export type TPlayerInfo = {
    playerName: string,
    playerId: number,
    score: number,
}

interface ICommonStoreContext {
    gameHistory: Game[];
    setGameHistory: (gameHistory: Game[]) => void;
    players: TPlayerInfo[];
    setPlayers: (players: TPlayerInfo[]) => void;
    startFresh: () => void;
    board: string[][];
    setBoard: (board: string[][]) => void;
    currentPlayer: string;
    setCurrentPlayer: (player: string) => void;
    gameState: EGameStates;
    setGameState: (gameState: EGameStates) => void;
    currentGame: Game;
    setCurrentGame: (game: Game) => void;
    resetRound: () => void;
}

export const CommonStoreContext = createContext<ICommonStoreContext>({
    gameHistory: [],
    setGameHistory: () => { },
    players: [],
    setPlayers: () => { },
    startFresh: () => { },
    board: [],
    setBoard: () => { },
    currentPlayer: '',
    setCurrentPlayer: () => { },
    gameState: EGameStates.PLAYING,
    setGameState: () => { },
    currentGame: {
        result: '',
        winnerId: 0,
        round: 1,
    },
    setCurrentGame: () => { },
    resetRound: () => { },
});

const CommonStoreProvider = ({ children }: { children: ReactNode }) => {
    const route = useRouter();
    const [gameHistory, setGameHistory] = useState<Game[]>([]);
    const [board, setBoard] = useState<string[][]>([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [gameState, setGameState] = useState(EGameStates.PLAYING);
    const [currentGame, setCurrentGame] = useState<Game>({
        result: '',
        winnerId: 0,
        round: 1,
    });
    const [players, setPlayers] = useState<TPlayerInfo[]>([
        {
            playerName: '',
            playerId: 1,
            score: 0,
        },
        {
            playerName: '',
            playerId: 2,
            score: 0,
        }]);
    const startFresh = () => {
        route.push('/');
        setGameHistory([]);
        setPlayers([
            {
                playerName: '',
                playerId: 1,
                score: 0,
            },
            {
                playerName: '',
                playerId: 2,
                score: 0,
            }]
        );
    }
    const resetRound = () => {
        setBoard([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]);
        setCurrentPlayer('X');
        setGameState(EGameStates.PLAYING);
        setCurrentGame({
            result: '',
            winnerId: 0,
            round: currentGame.round + 1,
        });
    }

    const storeProps = {
        gameHistory,
        setGameHistory,
        players,
        setPlayers,
        startFresh,
        board,
        setBoard,
        currentPlayer,
        setCurrentPlayer,
        gameState,
        setGameState,
        currentGame,
        setCurrentGame,
        resetRound,
    };

    return (
        <CommonStoreContext.Provider value={storeProps}>
            {children}
        </CommonStoreContext.Provider>
    );
};

export default CommonStoreProvider;