import { CommonStoreContext } from "@/stores/common.store";
import { useContext } from "react";

export type TPlayerInfo = {
    player: string,
    playerName: string,
    score: number
}

interface PlayerInfoProps {
    players: TPlayerInfo[];
}

const PlayerInfo = ({ players }: PlayerInfoProps) => {
    const { startFresh } = useContext(CommonStoreContext);

    return (
        <div>
            <h3>Player 1: {players[0].playerName}</h3>
            <h3>Player 2: {players[1].playerName}</h3>

            <button onClick={startFresh}>Start from Fresh</button>
        </div>
    )
}

export default PlayerInfo;