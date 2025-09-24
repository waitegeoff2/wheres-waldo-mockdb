import waldoIcon from '../../assets/waldo-icon.png'
import wandaIcon from '../../assets/wanda-icon.jpg'
import wizardIcon from '../../assets/wizard-icon.jpg'
import odlawIcon from '../../assets/odlaw-icon.webp'
import checkMark from '../../assets/check-bold.svg'

export default function CharacterList({ characterData, waldoFound, wandaFound, wizFound, odlawFound }) {

    return (
        <div className="character-score">
            {/* put images of characters to find, and grey them out once they're found */}
            <div><b>Characters to find:</b></div>
            {/* map the character data and add icons for each character */}
            {characterData.map((data, index) => {
                if(data.character == "Waldo") {
                    return (
                        <div key={index} className="char-icon" id='waldo-icon'>
                            {/* ISVISIBLESTATE waldoicon show checkmark */}
                            <img className='char-pic' src={waldoIcon} alt="Icon of Waldo from Where's Waldo" />
                            <span>Waldo</span>
                            { waldoFound && <img className='check-mark' src={checkMark} alt="A check mark." /> }
                        </div>
                    )
                } else if(data.character == "Wanda") {
                    return (
                        <div key={index} className="char-icon" id='wanda-icon'>
                            <img className='char-pic' src={wandaIcon} alt="Icon of Wanda from Where's Waldo" />
                            <span>Wanda</span>
                            { wandaFound && <img className='check-mark' src={checkMark} alt="A check mark." /> }
                        </div>
                    )
                } else if(data.character == "Wizard") {
                    return (
                        <div key={index} className="char-icon" id='wizard-icon'>
                            <img className='char-pic' src={wizardIcon} alt="Icon of Wizard from Where's Waldo" />
                            <span>Wizard</span>
                            { wizFound && <img className='check-mark' src={checkMark} alt="A check mark." /> }
                        </div>
                    )
                } else if(data.character == "Odlaw") {
                    return (
                        <div key={index} className="char-icon" id='odlaw-icon'>
                            <img className='char-pic' src={odlawIcon} alt="Icon of Odlaw from Where's Waldo" />
                            <span>Odlaw</span>
                            { odlawFound && <img className='check-mark' src={checkMark} alt="A check mark." /> }
                        </div>
                    )
                } else {
                    return (
                        <div key={index} className="char-icon">
                            <span>{data.character}</span>
                        </div>
                    )
                }
            }
            )}
        </div>
    )
}