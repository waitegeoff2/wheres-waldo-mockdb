import { useState, useEffect } from "react"
import { Link, useOutletContext } from "react-router"
import './StartScreen.css'
import { useNavigate } from 'react-router'
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'
import { imageData } from '../../db/MockDb'

export default function StartScreen() {

    console.log(imageData)
    const apiUrl = import.meta.env.VITE_API_LINK;
    const { selectedPhoto, setSelectedPhoto } = useOutletContext()
    // const [loading, setLoading] = useState(true)
    //states for managing timer
    const { isRunning, setIsRunning } = useOutletContext()
    const navigate = useNavigate();
    // const [imageData, setImageData] = useState([])
    const { error, setError } = useOutletContext()

    function handlePhotoSelect(id){
        setSelectedPhoto(id)
    }
    
    function handleStart(){
       navigate(`/photos/${selectedPhoto}`)
    }

    console.log(import.meta.env.BASE_URL)

    return (
        <>
            <div className="game-start-page">
                <h3>Choose a photo and find Waldo (and his weird friends)!</h3>
                <div className="photo-selection">
                    {imageData.map((data, index) => (
                        <div key={data.id} className="game-preview">
                        { (selectedPhoto==data.id) ?
                            <img style={{border: '2px solid blue',}} key={data.id} className='game-preview-img' onClick={() => handlePhotoSelect(data.id)} src={data.url} alt="Image preview of a Where's Waldo." />
                            :
                            <img key={data.id} className='game-preview-img' onClick={() => handlePhotoSelect(data.id)} src={data.url} alt="Image preview of a Where's Waldo." />
                        }
                        </div>
                    ))}
                </div>

                {/* FOR MOCK DB VERSION */}
                {/* <div className="photo-selection">
                    <img className='game-preview-img' onClick={() => handlePhotoSelect(2)} src='/src/assets/waldo-1-town.jpeg' alt="Image of a where's waldo game in a town." />
                    <img className='game-preview-img' onClick={() => handlePhotoSelect(3)} src={waldoBeach} alt="Image of a where's waldo game on a beach." />
                    <img className='game-preview-img' onClick={() => handlePhotoSelect(4)} src={waldoConvention} alt="Image of a where's waldo game at a business convention." />
                </div> */}
                <button onClick={handleStart} className="start-button">Start game.</button>
            </div>
        </>
    )
}