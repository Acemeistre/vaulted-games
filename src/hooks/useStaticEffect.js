import { useEffect, useState } from "react";

function useStaticEffect({ isActive }) {
    const [staticEffect, setStaticEffect] = useState(false);

    useEffect(() => {
        if (!isActive) return

        let timeout
    
        const cycle = () => {
        const randomDelay = (Math.random() * 40000) + 20000
        const randomDuration = (Math.random() * 4000) + 2000
            timeout = setTimeout(() => {
                setStaticEffect(true)
                setTimeout(() => {
                    setStaticEffect(false)
                    cycle()
                }, randomDuration)
            }, randomDelay)       
        }
        cycle()
    
        return () => clearTimeout(timeout)
    }, [isActive])

    return staticEffect
}

export default useStaticEffect