import { useEffect, useState } from "react";
import './Timer.css'

export default function Timer({ isRunning, setIsRunning, seconds, setSeconds }) {
    
    useEffect(() => {
        let interval = null;

        if (isRunning) {
        interval = setInterval(() => {
            setSeconds(prevSeconds => prevSeconds + 1);
        }, 1000);
        } else if (!isRunning && seconds !== 0) {
        clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isRunning, seconds]);

    return (
        <div className="timer">
            <h3 className="timer-span">Timer: {seconds}s</h3>
        </div>
    )
}