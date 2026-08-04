// React core imports:
// import useState to track changes to data, 
// useEffect to run code that has side effects outside of the app render (such as reading/writing to local storage, APIs, setting timers, etc)
import { useEffect, useState } from "react";

// pass text for all component text fields, pass down isActive to watch between its true and false state and set delay to zero (can be altered) so the effect happens immediately upon isActive being true
function useTypewriter ({ text, isActive, delay = 0 }) {
    // set the initial useState of text to an empty string
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        // if isActive is not true set the setDisplayedText state with the text parameter and exit the useEffect
        if (!isActive) {
            setDisplayedText(text)
            return
        }
        // initialize the setDisplayedText state as an empty string
        setDisplayedText('')
        // initialize a setTimeout function set to a variable of startTimeout
        const startTimeout = setTimeout(() => {
            // intialize a setInterval function set to a variable of interval
            const interval = setInterval(() => {
                // nest the setDisplayedText state passing prev to access the current displayed text to check which character to add next
                setDisplayedText(prev => {
                    // set an if statement to check if prev.length is equal to text.length, nesting a function to clear the interval variable once the if condition is met and return prev as unchanged
                    if (prev.length >= text.length) {
                        clearInterval(interval)
                        return prev
                    }
                    // return a rendered slice of text, adding one to prev.length for each interval
                    return text.slice(0, prev.length + 1)
                })
            }, 50) // interval between each character "being typed"
        // multiply delay by 1000 for the purposes of readability of seconds rather than milli seconds for changing the value in the function signature
        }, delay * 1000)
        // set a cleanup return for startTimeout to avoid setting multiple timeouts when the component unmounts or the effect re-runs
        return () => clearTimeout(startTimeout)
        // watch for changes in isActive, text and delay in the dependency array
        }, [isActive, text, delay])
    // return the displayedText so that the component calling the typewriter hook knows which field the effect is applied to
    return displayedText
}

export default useTypewriter