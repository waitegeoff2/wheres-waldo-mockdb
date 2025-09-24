import './Photo.css'
import React, { useState, useEffect, useRef } from 'react';
import { useOutletContext } from 'react-router'
import Timer from '../Timer/Timer'
import CharacterList from '../CharacterList/CharacterList'
import HighScoreModal from '../HighScoreModal/HighScoreModal'
import { Ring } from 'ldrs/react'
import { useNavigate } from 'react-router'
import 'ldrs/react/Ring.css'
import TargetSelection from '../TargetSelection/TargetSelection';
import { Link } from 'react-router';
import { beachData, beachHighScores, conventionData, conventionHighScores, townData, townHighScores } from '../../db/MockDb';

// if mock db
// import waldoEasy from '../../assets/waldo-1-town.jpeg'
// import waldoBeach from '../../assets/waldo-2-beach.jpg'
// import waldoConvention from '../../assets/waldo-3-convention.jpeg'

export default function Photo() {
    const navigate = useNavigate()
    const apiUrl = import.meta.env.VITE_API_LINK;

    const { selectedPhoto, seconds, setSeconds } = useOutletContext()
    //data about selected image will be stored here (names, coordinates, etc.)
    const [photoData, setPhotoData] = useState()
    const [characterData, setCharacterData] = useState([])
    //character search states
    const [selectedPosition, setSelectedPosition] = useState({ x: 0, y: 0 })
    const [found, setFound] = useState([])
    const [showFoundMsg, setShowFoundMsg] = useState(false)
    const [showGuessAgain, setShowGuessAgain] = useState(false)
    const [compareScore, setCompareScore] = useState(false)
    //found characters(display checkmarks)
    const [waldoFound, setWaldoFound] = useState(false)
    const [wizFound, setWizFound] = useState(false)
    const [wandaFound, setWandaFound] = useState(false)
    const [odlawFound, setOdlawFound] = useState(false)

    //for style items, etc.
    const [loading, setLoading] = useState(true)
    const { error, setError } = useOutletContext()
    const [isBoxVisible, setIsBoxVisible] = useState(false)
    const [boxPosition, setBoxPosition] = useState({ x: 0, y: 0 })
    const { isRunning, setIsRunning } = useOutletContext()
    //high score/timer states
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [content, setContent] = useState('');
    const { topScores, setTopScores } = useOutletContext()
    const [gameStarted, setGameStarted] = useState(false)
    const [startTime, setStartTime] = useState(0);
    const [win, setWin] = useState(false)
    const [totalTime, setTotalTime] = useState(0)

    //grab photo details and actual coordinates of waldo, etc. reset state variables
    useEffect(() => {
        //set photo data
        if(selectedPhoto===2) {
            setPhotoData(townData)
        } else if(selectedPhoto===3) {
            setPhotoData(beachData)
        } else if(selectedPhoto===4) {
            setPhotoData(conventionData)
        }

        //set character data
        if(selectedPhoto===2) {
            let charArray = townData.character
            let newArray = []
            charArray.map(data => {
                let newItem = data
                newArray.push(newItem)
            })
            setCharacterData(newArray)
        } else if(selectedPhoto===3) {
            let charArray = beachData.character
            let newArray = []
            charArray.map(data => {
                let newItem = data
                newArray.push(newItem)
            })
            setCharacterData(newArray)
        } else if(selectedPhoto===4) {
            let charArray = conventionData.character
            let newArray = []
            charArray.map(data => {
                let newItem = data
                newArray.push(newItem)
            })
            setCharacterData(newArray)
        }

        // fetch(`${apiUrl}/photo/${selectedPhoto}`, { 
        //         method: 'GET',
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },       
        // })
        // .then((response) => {
        // if (response.status >= 400) {
        //     throw new Error("server error");
        // }
        // return response.json();
        // })
        // .then((response) => {
            // setPhotoData(response)
            // //map the characters into an array so you can use it to set radio buttons
            // let charArray = response.character
            // let newArray = []
            // charArray.map(data => {
            //     let newItem = data
            //     newArray.push(newItem)
            // })
            // setCharacterData(newArray)
            // // reset state variables
            setFound([]) 
            setLoading(false)
            setIsRunning(true)
            setWin(false)
            setIsModalOpen(false)
            setCompareScore(false)
            setGameStarted(true)
        // })
        // .catch((error) => setError(error))
    }, []);
    

    //pull top 10 highscores and setHighScores (to compare user's score to top 10)
    useEffect(() => {
        if(selectedPhoto===2) {
            setTopScores(townHighScores)
        } else if(selectedPhoto===3) {
            setTopScores(beachHighScores)
        } else if(selectedPhoto===4) {
            setTopScores(conventionHighScores)
        }

    }, []);

    //record the start after picture loads
    useEffect(() => {
            const startObject = new Date()
            setStartTime(startObject)
    }, [gameStarted]);

    //once start and end time are set, compare against top 10 scores, bring up high score modal if you qualify
    function compareScores(totalTime) {
        console.log('comparing score')
        //if there are less than 10 high scores or user is in top 10
        if((topScores.length < 10 || (totalTime < topScores[9].score)) && (totalTime > 0.2)) {
            setIsModalOpen(true)
        }
    }

    function checkWin(foundLength) {
        if(foundLength>0 && (foundLength === characterData.length)) {
            console.log('you win')
            setShowFoundMsg(false)
            setIsRunning(false)
            setWin(true)
            const endObject = new Date()
            const totalTime = (endObject - startTime)/1000;
            setTotalTime(totalTime)
            console.log(totalTime)
            compareScores(totalTime)
        } else {
            console.log('no win')
        }
    }

    function imageClick(e) {
        setShowFoundMsg(false)
        setShowGuessAgain(false)

        var rect = e.target.getBoundingClientRect();

        //actual position of mouse click inside the photo
        let xAxis = e.nativeEvent.offsetX;
        let yAxis = e.nativeEvent.offsetY;

        //normalizing to 900 and 600 (same as in db) just in case the image size gets changed
        //gives a consistent pixel location no matter the image size
        const length = rect.right - rect.left;
        const height = rect.bottom - rect.top;
        //divide position of click by size of image and multiply by db dimensions
        let adjustedX = Math.round((xAxis/length) * 960)
        let adjustedY = Math.round((yAxis/height) * 640)

        //make box show up on screen using clientX which shows actual screen position
        setBoxPosition({ x: e.clientX, y: e.clientY });
        setIsBoxVisible(true)

        //update selection variables
        setSelectedPosition({
            x: adjustedX,
            y: adjustedY,
        })
    }

    //high score modal
    const closeModal = () => setIsModalOpen(false);

    async function handleScoreSubmit(e){
        e.preventDefault();
        const newData = { name: content, score: totalTime }
        let newArray = [...topScores, newData]
        setTopScores(newArray)
        navigate('/highscores')
    }

    console.log(topScores)
    return (
        <>
        <div className="photo-page">
            <div className="game-sidebar">
                <Timer isRunning={isRunning} setIsRunning={setIsRunning} seconds={seconds} setSeconds={setSeconds}/>
                <CharacterList characterData={characterData} waldoFound={waldoFound} wandaFound={wandaFound} wizFound={wizFound} odlawFound={odlawFound} />
            </div>
            {/* CONDITIONAL LOADING STATEMENT, PUT BACK IN WHEN DB FETCH IS FIXED */}
            { loading ?
                <div className="loading-box">
                    <Ring
                    size="40"
                    stroke="5"
                    bgOpacity="0"
                    speed="2"
                    color="black" 
                    /> 
                </div>           
                :
                <>
                <div className="image-stack">
                    <div className="image-box">
                        <img onClick={imageClick} className='main-image' src={photoData.url} alt="Image of a Where's Waldo game." />
                        {/* POSITION THIS ABSOLUTELY ON THE IMAGE BOX */}
                        { found.map((data, index) => (
                            <div
                            key={index}
                            className='target-box'
                            style={{
                                position: 'absolute',
                                left: data.x,
                                top: data.y,
                                border: '1px solid green',
                                width: '50px',
                                height: '50px',
                                backgroundColor: 'green',
                                opacity: 0.4,
                                transform: 'translate(-50%, -50%)',
                            }}
                            ></div>
                        ))}
                    </div>
                    { showFoundMsg && <span className='found-msg'>Nice!</span> }
                    { showGuessAgain && <span className='guess-msg'>Sorry, guess again!</span> }
                    { win && <span className='guess-msg'>Congrats, you win!</span> }
                </div>
                </>
            }
            <div className="high-score-link">
                <h2><Link to={`/highscores`}> View High Scores </Link></h2>
            </div>
        </div>
        <TargetSelection isBoxVisible={isBoxVisible} setIsBoxVisible={setIsBoxVisible} characterData={characterData} boxPosition={boxPosition} selectedPosition={selectedPosition} found={found} setFound={setFound} setWaldoFound={setWaldoFound} setWandaFound={setWandaFound} setWizFound={setWizFound} setOdlawFound={setOdlawFound} setShowFoundMsg={setShowFoundMsg} setShowGuessAgain={setShowGuessAgain} checkWin={checkWin} />
        <HighScoreModal isOpen={isModalOpen} onClose={closeModal}>
            <div className="high-score-section">
                <h2>You got a high score! Your time was {totalTime} seconds!</h2>
                <form className="high-score-form" onSubmit={handleScoreSubmit}>
                    <div className="high-score-input">
                        <label htmlFor="name">Your name:</label>
                        <input 
                            type="text"
                            id='content' 
                            name='content'
                            placeholder="Name or nickname."
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                        />
                     </div>
                        {/* <input
                            type="hidden"
                            name="hiddenField"
                            value={user}
                        /> */}
                    <button type="submit">Submit score</button>
                </form>
            </div>
        </HighScoreModal>
        </>
    )
}