import { useRouter } from "next/router";
import { useState } from "react";
import styles from './starting-form.module.scss';

const StartingForm = () => {
    const [firstPlayer, setFirstPlayer] = useState<string>('');
    const [secondPlayer, setSecondPlayer] = useState<string>('');
    const route = useRouter();

    const handleFirstPlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFirstPlayer(event.target.value);
    }

    const handleSecondPlayerNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSecondPlayer(event.target.value);
    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        route.push({
            pathname: '/game',
            query: {
                firstPlayer,
                secondPlayer
            }
        });
    }

    const errorMessageTexts = {
        empty: 'Please enter a valid name.',
        same: 'Please enter different names.'
    }

    const validateForm = () => {
        if (firstPlayer.trim() === '' || secondPlayer.trim() === '') {
            alert(errorMessageTexts.empty);
            return false;
        } else if (firstPlayer === secondPlayer) {
            alert(errorMessageTexts.same)
            return false;
        } else {
            return true;
        }
    }

    return (
        <form
            onSubmit={handleSubmit}
            className={styles.form}
        >
            <div className={styles.form__item}>
                <label htmlFor="first-player-name">First Player: </label>
                <input
                    type="text"
                    id="first-player-name"
                    name="first-player-name"
                    value={firstPlayer}
                    onChange={handleFirstPlayerNameChange}
                    className={styles.first_name}
                    required
                />
            </div>

            <div className={styles.form__item}>
                <label htmlFor="second-player-name">Second Player: </label>
                <input
                    type="text"
                    id="second-player-name"
                    name="second-player-name"
                    value={secondPlayer}
                    onChange={handleSecondPlayerNameChange}
                    required
                />
            </div>

            <button type="submit">Start Game</button>
        </form>
    )
}

export default StartingForm;