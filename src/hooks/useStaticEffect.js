import { useEffect, useState } from "react";

function useStaticEffect({ isActive, fieldCount, minDelay = 20000, maxDelay = 40000, minDuration = 2000, maxDuration = 6000 }) {
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        if (!isActive) return

        let timeout
    
        const cycle = () => {
            const randomDelay = (Math.random() * (maxDelay - minDelay)) + minDelay
            const randomDuration = (Math.random() * (maxDuration - minDuration)) + minDuration
            timeout = setTimeout(() => {
                const randomField = Math.floor(Math.random() * fieldCount)
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

export default useStaticEffect