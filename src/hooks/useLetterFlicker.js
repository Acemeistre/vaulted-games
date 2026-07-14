import { useEffect, useState } from "react";

function useLetterFlicker({ text, isActive }) {
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        if (!isActive) return

        let timeout
    
        const cycle = () => {
            
        const randomDelay = (Math.random() * 3000) + 500
        const randomDuration = (Math.random() * 500) + 75
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
    }, [isActive])

    return activeField
}

export default useLetterFlicker