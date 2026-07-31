// React core imports:
// import useState to track changes to data, 
// useEffect to run code that has side effects outside of the app render (such as reading/writing to local storage, APIs, setting timers, etc)
import { useEffect, useState } from "react";

// set a function that passes down isActive to watch when the state changes between true and false, text to pass down its length, when animating a randomly chosen character within a component's field, 
// min and max delays for our time between effects and min and max durations for how long the effect lasts for 
function useLetterFlicker({ text, isActive, minDelay = 4000, maxDelay = 8000, minDuration = 100, maxDuration = 600 }) {
    // set the intial data of the active field state to empty (null)
    const [activeField, setActiveField] = useState(null);

    useEffect(() => {
        // if isActive is not true exit the useEffect (isActive is determined within each component's associated derived variables)
        if (!isActive) return
        // declare a let variable here so it's outside the scope of the cycle function, but can be assigned both in its nested function and its cleanup function
        let timeout
    
        const cycle = () => {
            // use math.random to set a random integer (between 0 and 1), and multiplying that by the calculated range of taking minDelay from maxDelay, ensuring the minDelay is adhered to
            const randomDelay = (Math.random() * (maxDelay - minDelay)) + minDelay
            // use math.random to set a random integer (between 0 and 1), and multiplying that by the calculated range of taking minDuration from maxDuration, ensuring the minDuration is adhered to
            const randomDuration = (Math.random() * (maxDuration - minDuration)) + minDuration
            timeout = setTimeout(() => {
                // calculate the randomly chosen index number of a field using Math.floor to wrap math.random and multiplying that by our the length of the text
                const randomField = Math.floor(Math.random() * text.length)
                setActiveField(randomField)
                setTimeout(() => {
                    // nest another setTimeout function with setActiveField called to null, with our cycle function called to create a continuous loop
                    setActiveField(null)
                    cycle()
                // set variable randomDuration to let the nested function know how long each static effect lasts
                }, randomDuration)
            // set variable randomDelay to let the nested function know how long to wait between cycles 
            }, randomDelay)       
        }
        // call cycle to complete the nested loop
        cycle()
        // set a cleanup return for timeout avoid setting multiple timeouts when the component unmounts or the effect re-runs
        return () => clearTimeout(timeout)
    }, [])
    // return the activeField so that the component calling the letter flicker hook knows which field the effect is applied to
    return activeField
}

export default useLetterFlicker