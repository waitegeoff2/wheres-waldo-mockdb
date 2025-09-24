import { useEffect, useState } from "react";
import './HighScoreList.css'
import { useOutletContext } from "react-router";
import { beachData, beachHighScores, conventionData, conventionHighScores, townData, townHighScores } from '../../db/MockDb';

// THIS NEEDS TO BE LINKED FROM THE GAME PAGE AND DISPLAY SCORES FOR THAT GAME
export default function HighScoreList() {
    const apiUrl = import.meta.env.VITE_API_LINK;
    const [error, setError] = useState()
    const { selectedPhoto } = useOutletContext()
    const { topScores } = useOutletContext()
    const [highScoreData, setHighScoreData] = useState([])

    // useeffect to return all high scores
    // useEffect(() => {
    //     if(selectedPhoto===2) {
    //         setHighScoreData(townHighScores)
    //     } else if(selectedPhoto===3) {
    //         setHighScoreData(beachHighScores)
    //     } else if(selectedPhoto===4) {
    //         setHighScoreData(conventionHighScores)
    //     }
    // }, []);

    console.log(highScoreData)

    return (
        <>
        <div className="high-score-section">
            <h1>High Scores</h1>
            <ol className="high-score-list">
                {/* map the scores */}
                { topScores.map((score, index) => (
                    <b><li className="high-score-list-item">{ score.name }: { score.score } seconds.</li></b> 
                ))}
            </ol>
        </div>
        </>
    )
}