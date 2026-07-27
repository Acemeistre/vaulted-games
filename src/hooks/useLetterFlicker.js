import { useEffect, useState } from "react";

function useLetterFlicker({ text, isActive, minDelay = 4000, maxDelay = 8000, minDuration = 100, maxDuration = 600 }) {
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        if (!isActive) return

        let timeout
    
        const cycle = () => {
            const randomDelay = (Math.random() * (maxDelay - minDelay)) + minDelay
            const randomDuration = (Math.random() * (maxDuration - minDuration)) + minDuration
            timeout = setTimeout(() => {
                const randomField = Math.floor(Math.random() * text.length)
                setActiveField(randomField)
                setTimeout(() => {
                    setActiveField(null)
                    cycle()
                }, randomDuration)
            }, randomDelay)       
        }
        cycle()
        return () => clearTimeout(timeout)
    }, [])
    return activeField
}

export default useLetterFlicker