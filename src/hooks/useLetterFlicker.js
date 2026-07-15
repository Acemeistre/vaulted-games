import { useEffect, useState } from "react";

function useLetterFlicker({ text, isActive, minDelay = 4000, maxDelay = 8000 }) {
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        console.log('useLetterFlicker useEffect fired, isActive:', isActive)
        if (!isActive) return

        let timeout
    
        const cycle = () => {
            
        const randomDelay = (Math.random() * (maxDelay - minDelay)) + minDelay
        const randomDuration = (Math.random() * 600) + 100
            timeout = setTimeout(() => {
                console.log('setTimeout fired')
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