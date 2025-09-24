import { useEffect, useState } from "react";
import './HighScoreList.css'
import { useOutletContext } from "react-router";

// THIS NEEDS TO BE LINKED FROM THE GAME PAGE AND DISPLAY SCORES FOR THAT GAME
export default function HighScoreList() {
    const apiUrl = import.meta.env.VITE_API_LINK;
    const [error, setError] = useState()
    const { selectedPhoto } = useOutletContext()
    const [highScoreData, setHighScoreData] = useState([])

    // useeffect to return all high scores
    useEffect(() => {
        fetch(`${apiUrl}/score/highscores/${selectedPhoto}`, { 
                method: 'GET',
                })
        .then((response) => {
        if (response.status >= 400) {
            throw new Error("server error");
        }
        return response.json();
        })
        .then((response) => {
            setHighScoreData(response)
        })
        .catch((error) => setError(error))
    }, []);

    console.log(highScoreData)

    return (
        <>
        <div className="high-score-section">
            <h1>High Scores</h1>
            <ol className="high-score-list">
                {/* map the scores */}
                { highScoreData.map((score, index) => (
                    <b><li className="high-score-list-item">{ score.name }: { score.score } seconds.</li></b> 
                ))}
            </ol>
        </div>
        </>
    )
}