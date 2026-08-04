// React core imports:
// import useState to track changes to data, 
// useEffect to run code that has side effects outside of the app render (such as reading/writing to local storage, APIs, setting timers, etc)
import { useEffect, useState } from "react";

// set a function that passes down isActive to watch when the state changes between true and false, fieldCount to randomize which field our effect is active on, 
// min and max delays for our time between effects and min and max durations for how long the effect lasts for 
function useStaticEffect({ isActive, fieldCount, minDelay = 20000, maxDelay = 40000, minDuration = 2000, maxDuration = 6000 }) {
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
                // calculate the randomly chosen index number of a field using Math.floor to wrap math.random and multiplying that by our fieldCount
                const randomField = Math.floor(Math.random() * fieldCount)
                // set the setActiveField state to our randomField variable
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
        // watch for changes to isActive in the dependency array
    }, [isActive])

    // return the activeField so that the component calling the static effect hook knows which field the effect is applied to
    return activeField
}

export default useStaticEffect