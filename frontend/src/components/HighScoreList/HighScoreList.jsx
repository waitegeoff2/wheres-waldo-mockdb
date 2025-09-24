import { useEffect, useState } from "react";
import './HighScoreList.css'
import { useOutletContext } from "react-router";
import { beachData, beachHighScores, conventionData, conventionHighScores, townData, townHighScores } from '../../db/MockDb';

// THIS NEEDS TO BE LINKED FROM THE GAME PAGE AND DISPLAY SCORES FOR THAT GAME
export default function HighScoreList() {
    const apiUrl = import.meta.env.VITE_API_LINK;
    const [error, setError] = useState()
    const { selectedPhoto } = useOutletContext()
    const { topScores, topBeachScores, topTownScores, topConventionScores } = useOutletContext()
    const [highScoreData, setHighScoreData] = useState([])

    console.log(highScoreData)

    return (
        <>
        <div className="high-score-section">
            <h1>High Scores</h1>
            <ol className="high-score-list">
                {selectedPhoto===2 && 
                    topTownScores.map((score, index) => (
                    <b><li className="high-score-list-item">{ score.name }: { score.score } seconds.</li></b> 
                    ))
                }
                {selectedPhoto===3 && 
                    topBeachScores.map((score, index) => (
                    <b><li className="high-score-list-item">{ score.name }: { score.score } seconds.</li></b> 
                    ))
                }
                {selectedPhoto===4 && 
                    topConventionScores.map((score, index) => (
                    <b><li className="high-score-list-item">{ score.name }: { score.score } seconds.</li></b> 
                    ))
                }
                {/* map the scores */}
                { topScores.map((score, index) => (
                    <b><li className="high-score-list-item">{ score.name }: { score.score } seconds.</li></b> 
                ))}
            </ol>
        </div>
        </>
    )
}