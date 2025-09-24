//IMPORT PHOTO CSS
import { useState, useEffect, useRef } from "react";

export default function TargetSelection({ isBoxVisible, setIsBoxVisible, characterData, boxPosition, selectedPosition, found, setFound, setWaldoFound, setWandaFound, setWizFound, setOdlawFound, setShowFoundMsg, setShowGuessAgain, checkWin }) {
    const [selectedOption, setSelectedOption] = useState('option1');
    const boxRef = useRef(null)

    // Handle clicks on the document to hide the box
    useEffect(() => {
        const handleClickOutside = (event) => {
        // If the box is shown and the click is outside the box, hide it
        if (boxRef.current && !boxRef.current.contains(event.target)) {
            setIsBoxVisible(false);
        }
        };

        document.addEventListener('mousedown', handleClickOutside);

        // Cleanup the event listener when the component unmounts
        return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isBoxVisible]); // Re-run effect if showBox changes
    
    //REMOVE THIS STUFF FROM PHOTO
    function handleRadioChange(e){
        setSelectedOption(e.target.value);
    }

    function compareCoords(selectedX, selectedY, actualX, actualY) {
        //range of acceptable coordinates (bigger to be more forgiving)
        let upperX = selectedX + 60;
        let lowerX = selectedX - 60;
        let upperY = selectedY + 60;
        let lowerY = selectedY - 60;

        if((actualX <= upperX) && (actualX >= lowerX) && (actualY <= upperY) && (actualY >= lowerY)) {
            return true;
            //PLACE MARKER ON PHOTO(selected coords)
        } else {
            return false;
        }
        //if actual is in selectedx + -50 && y +-50
    }

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setIsBoxVisible(false)

        let thisCharacter = selectedOption;
        const coordData = characterData.find(data => data.character == thisCharacter)
        console.log(coordData)

        //actual coordinates and selected coordinates
        const characterX = coordData.xCoord
        const characterY = coordData.yCoord
        const selectedX = selectedPosition.x
        const selectedY = selectedPosition.y
        console.log(characterX, characterY, selectedX, selectedY)
        const result = compareCoords(selectedX, selectedY, characterX, characterY)

        if(result) {
            //***search found array to see if it's there already
            //store the character data in your 'found' state
            const foundData = { character: thisCharacter, x: characterX, y: characterY }
            setFound([...found, foundData])
            setShowFoundMsg(true)
            //add 1 to array length to check win against update state
            const newFoundLength = found.length + 1;
            checkWin(newFoundLength)

            if(thisCharacter=='Waldo'){
                setWaldoFound(true)
            } else if(thisCharacter=='Wanda'){
                setWandaFound(true)
            } else if(thisCharacter=='Wizard'){
                setWizFound(true)
            } else if(thisCharacter=='Odlaw'){
                setOdlawFound(true)
            }
        } else {
            setShowGuessAgain(true)
        }
    }

    return (
        <>
        {isBoxVisible && (
        <>
        {/* SIMILAR TYPE DIV FOR CORRECT GUESS BOX */}
        <div ref={boxRef} className="target-selection-section">
            <div
            
            className='target-box'
            style={{
                position: 'absolute',
                left: boxPosition.x,
                top: boxPosition.y,
                border: '1px solid black',
                width: '50px',
                height: '50px',
                backgroundColor: 'grey',
                opacity: 0.4,
                transform: 'translate(-50%, -50%)',
            }}
            ></div>
            <div
            style={{
                position: 'absolute',
                left: boxPosition.x,
                top: boxPosition.y,
                                
                transform: 'translate(-10px, 30px)', // Center the item on the click
            }} 
            className="arrow"></div>
            <form
            className='waldo-select'
            style={{
                position: 'absolute',
                padding: '3px',
                left: boxPosition.x,
                top: boxPosition.y,
                border: '2px solid black',
                borderRadius: '5px',                 
                transform: 'translate(-60px, 40px)', // Center the item on the click
            }}
            action="submit"
            onSubmit={handleSubmit}>
                <fieldset className='radio-field'>
                    <legend><b>Who's here?</b></legend>
                    {/* MAP THESE FROM DATABASE CHARS LIST */}
                    <div className="radios">
                        {characterData.map((data, index) => (
                            <div key={index} className="radio-Input">
                                <input type="radio" id={data.character} name="wheres_waldo" value={data.character} onChange={handleRadioChange} />
                                <label htmlFor={data.character}>{data.character}</label>
                            </div>
                        ))}
                    </div>
                </fieldset>
                <button type="submit">Find.</button>
            </form>
        </div>
        </>
        )}
        </>
    )
}