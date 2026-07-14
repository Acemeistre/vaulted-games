import { useEffect, useState } from "react";

function useTypewriter ({ text, isActive, delay = 0 }) {
    const [displayedText, setDisplayedText] = useState('');


useEffect(() => {
    if (!isActive) {
        setDisplayedText(text)
    return
    }

    setDisplayedText('')
    const startTimeout = setTimeout(() => {
        const interval = setInterval(() => { 
            setDisplayedText(prev => {
                if (prev.length >= text.length) {
                    clearInterval(interval)
                    return prev
                }
                return text.slice(0, prev.length + 1)
            })
        }, 50)
    }, delay * 1000)
    
    return () => clearTimeout(startTimeout)
}, [isActive, text, delay])

    return displayedText
}

export default useTypewriter