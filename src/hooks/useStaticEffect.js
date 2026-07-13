import { useEffect, useState } from "react";

function useStaticEffect({ isActive, fieldCount, minDelay = 20000, maxDelay = 40000 }) {
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        if (!isActive) return

        let timeout
    
        const cycle = () => {
            console.log('cycle firing in useStaticEffect')
        const randomDelay = (Math.random() * (maxDelay - minDelay)) + minDelay
        const randomDuration = (Math.random() * 4000) + 2000
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