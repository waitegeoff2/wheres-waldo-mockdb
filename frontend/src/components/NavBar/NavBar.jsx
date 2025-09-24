import './NavBar.css'
import { Link } from 'react-router-dom'
import waldoImg from '../../assets/waldo-logo.png'

export default function NavBar({ stopTimer }) {

    return (
        <>
            <div className="nav-bar">
                <div className="nav-links">
                    <div className="left-links">
                        {/* add if necessary */}
                    </div>
                    <div className="main-title">
                        <Link to='/' onClick={stopTimer}><img className='waldo-img' src={waldoImg} alt="Logo for Where's Waldo game" /></Link>
                    </div>
                    <div className="right-links">
                        {/* add if necessary */}
                    </div>
                </div>
            </div>
        </>
    )
}