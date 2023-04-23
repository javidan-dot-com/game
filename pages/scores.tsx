import { useContext } from "react";
import { CommonStoreContext } from '@/stores/common.store';
import { useRouter } from "next/router";

const Scores = () => {
    const { gameHistory, startFresh } = useContext(CommonStoreContext);
    const route = useRouter();

    return (
        <div>
            <h1>Score Board</h1>

            <table>
                <thead>
                    <tr>
                        <th>Round</th>
                        <th>Winner</th>
                        <th>Result</th>
                    </tr>
                </thead>
                <tbody>
                    {gameHistory.map((game, index) => (
                        <tr key={index}>
                            <td>{game.round}</td>
                            <td>{game.winner}</td>
                            <td>{game.result}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button onClick={() => route.back()}>Back to Game</button>
            <button onClick={() => startFresh()}>Start fresh</button>
        </div>
    );
};

export default Scores;