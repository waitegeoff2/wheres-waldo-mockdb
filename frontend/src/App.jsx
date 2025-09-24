import { useState } from 'react'
import './App.css'
import { Outlet } from 'react-router-dom'
import NavBar from './components/NavBar/NavBar'
import Footer from './components/Footer/Footer'
import Timer from './components/Timer/Timer'

function App() {
  const [selectedPhoto, setSelectedPhoto] = useState(2)
  //keep timer variables up here so they aren't messed with by other renders
  const [isRunning, setIsRunning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [error, setError] = useState()
  const [topScores, setTopScores] = useState([])
  

  function stopTimer(){
        setIsRunning(false)
        setSeconds(0)
  }

  return (
    <>
      <NavBar setIsRunning={setIsRunning} setSeconds={setSeconds} stopTimer={stopTimer}/>
      <Outlet context={{selectedPhoto, setSelectedPhoto, isRunning, setIsRunning, error, setError, seconds, setSeconds, topScores, setTopScores}} />
      <Footer />
    </>
  )
}

export default App
