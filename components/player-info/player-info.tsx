import { PlayerInfo } from "@/pages/game";

interface PlayerInfoProps {
    players: PlayerInfo[];
}

const PlayerInfo = ({ players }: PlayerInfoProps) => {
    return (
        <div>
            <h3>Player 1: {players[0].playerName}</h3>
            <h3>Player 2: {players[1].playerName}</h3>
        </div>
    )
}

export default PlayerInfo;