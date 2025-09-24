import { useState } from "react";
import './HighScoreList.css'
import { useOutletContext } from "react-router";

export default function HighScoreList() {
    const { selectedPhoto } = useOutletContext()
    const { topScores, topBeachScores, topTownScores, topConventionScores } = useOutletContext()
    const [highScoreData, setHighScoreData] = useState([])

    console.log(highScoreData)

    //sorting the arrays by lowest score first
    const sortedTownArray = topTownScores.sort((a, b) => (a.score - b.score))
    const sortedBeachArray = topBeachScores.sort((a, b) => (a.score - b.score))
    const sortedConventionArray = topConventionScores.sort((a, b) => (a.score - b.score))
    console.log(sortedBeachArray)


    return (
        // run it on the sorted arrays above
        <>
        <div className="high-score-section">
            <h1>High Scores</h1>
            <ol className="high-score-list">
                {selectedPhoto===2 && 
                    sortedTownArray.map((score, index) => (
                    <b><li className="high-score-list-item">{ score.name }: { score.score } seconds.</li></b> 
                    ))
                }
                {selectedPhoto===3 && 
                    sortedBeachArray.map((score, index) => (
                    <b><li className="high-score-list-item">{ score.name }: { score.score } seconds.</li></b> 
                    ))
                }
                {selectedPhoto===4 && 
                    sortedConventionArray.map((score, index) => (
                    <b><li className="high-score-list-item">{ score.name }: { score.score } seconds.</li></b> 
                    ))
                }
            </ol>
        </div>
        </>
    )
}