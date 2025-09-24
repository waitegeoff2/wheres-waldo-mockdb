import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Timer from './components/Timer/Timer'
import { beachData, beachHighScores, conventionData, conventionHighScores, townData, townHighScores } from './db/MockDb';
import { useEffect } from 'react'


function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(2)
  //keep timer variables up here so they aren't messed with by other renders
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [error, setError] = useState()
  //high score states to REPLACE mock database (don't need these in real app)
  const [topScores, setTopScores] = useState([])
  const [topTownScores, setTopTownScores] = useState([])
  const [topBeachScores, setTopBeachScores] = useState([])
  const [topConventionScores, setTopConventionScores] = useState([])


  function stopTimer(){
        setIsRunning(false)
        setSeconds(0)
  }

  return (
    <>
      <NavBar setIsRunning={setIsRunning} setSeconds={setSeconds} stopTimer={stopTimer}/>
      <Outlet context={{selectedPhoto, setSelectedPhoto, isRunning, setIsRunning, error, setError, seconds, setSeconds, topScores, setTopScores, topBeachScores, setTopBeachScores, topTownScores, setTopTownScores, topConventionScores, setTopConventionScores}} />
      <Footer />
    </>
  )
}

export default App
