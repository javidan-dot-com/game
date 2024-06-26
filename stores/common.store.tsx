import { EGameStates, TGame, TPlayer } from "@/lib/types";
import { useRouter } from "next/router";
import { ReactNode, createContext, useState } from "react";

interface ICommonStoreContext {
    gameHistory: TGame[];
    setGameHistory: (gameHistory: TGame[]) => void;
    players: TPlayer[];
    setPlayers: (players: TPlayer[]) => void;
    startFresh: () => void;
    board: string[][];
    setBoard: (board: string[][]) => void;
    currentPlayer: string;
    setCurrentPlayer: (player: string) => void;
    gameState: EGameStates;
    setGameState: (gameState: EGameStates) => void;
    currentGame: TGame;
    setCurrentGame: (game: TGame) => void;
    nextRound: () => void;
    restartRound: () => void;
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
    nextRound: () => { },
    restartRound: () => { },
});

const CommonStoreProvider = ({ children }: { children: ReactNode }) => {
    const route = useRouter();
    const [gameHistory, setGameHistory] = useState<TGame[]>([]);
    const [board, setBoard] = useState<string[][]>([
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]);
    const [currentPlayer, setCurrentPlayer] = useState('X');
    const [gameState, setGameState] = useState(EGameStates.PLAYING);
    const [currentGame, setCurrentGame] = useState<TGame>({
        result: '',
        winnerId: 0,
        round: 1,
    });
    const [players, setPlayers] = useState<TPlayer[]>([
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
        route.replace('/');
        setGameHistory([]);
        setGameState(EGameStates.PLAYING);
        setCurrentGame({
            result: '',
            winnerId: 0,
            round: 1,
        });
        setCurrentPlayer('X');
        setBoard([
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ]);
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
    const restartRound = () => {
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
            round: currentGame.round,
        });
        setGameHistory(gameHistory.slice());
    }
    const nextRound = () => {
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
        const history = gameHistory;

        if (history.length > 0) {
            const previousGame = history[history.length - 1];
            if (previousGame.winnerId === players[1].playerId) {
                setPlayers([
                    {
                        ...players[1],
                    },
                    {
                        ...players[0],
                    }
                ]);
            }
        }
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
        nextRound,
        restartRound,
    };

    return (
        <CommonStoreContext.Provider value={storeProps}>
            {children}
        </CommonStoreContext.Provider>
    );
};

export default CommonStoreProvider;