// import styles
import './Header.css'
// import hooks
import useStaticEffect from '../../hooks/useStaticEffect.js'
import useLetterFlicker from '../../hooks/useLetterFlicker.js'

// pass isLoading to the function signature to check for new users
function Header ({ isLoading }) {
    // pass isActive as true and the fieldCount number to useStaticEffect and save it to a variable of StaticEffect 1
    // use the same criteria to save to insatnces of staticEffect in order to create separate timers for each static effect
    const staticEffect1 = useStaticEffect ({ isActive: true, fieldCount: 1 })
    const staticEffect2 = useStaticEffect ({ isActive: true, fieldCount: 1 })
    // set the property of text to Vaulted Games and isActive to true for the useLetterFlicker hook, saving it to a variable of flickerIndex
    const flickerIndex = useLetterFlicker ({ text: 'Vaulted Games', isActive: true })

    return (
        // set a ternary element to append row-flicker to container when isLoading is true else leave is empty string when false and apply animation delay to quickly animate the Header render
        <header className={`container ${isLoading ? 'row-flicker' : ''}`} style={{animationDelay: '0.3s'}}>
            {/* use a template literal to append the css 'static-lines' to 'field-wrapper' when staticEffect1 is equal to true, else leave as an empty string when false
            and append the css 'static-colour' to 'field-wrapper' when static Effect2 is equal to true, else leave as an empty string when false */}
            <div className={`field-wrapper ${staticEffect1 === 0 ? 'static-lines' : ''} ${staticEffect2 === 0 ? 'static-colour' : ''}`}>
                <div className="header__title">
                    <h1 className="header__title-text">
                    {/* use .split on our text, then use .map, passing in each character and index to its argument.
                    Inside it's function we have a span which takes the index numbers as its keys and then when flickerIndex (with all it's instructions) is equal to index we apply css 'letter-dim'
                    to apply the letterFlicker animation else we return an empty string for the css name.
                    If the character render is equal to an empty space we render unicode charcter '\u00A0' (for any text with spaces) else we leave the character as is normally displayed.*/}
                    {'Vaulted Games'.split('').map((char, i) => (
                        <span key={i} className={flickerIndex === i ? 'letter-dim' : ''}>
                        {char === ' ' ? '\u00A0' : char}
                        </span>
                        ))}
                    </h1>
                </div>
            </div>
            <p className="header__description">
                Welcome to 'Vaulted Games'! <br/>The number 1 place to track, organize and store your history of video games that you've played - at any time, on any device, throughout your own gaming adventures!
            </p>
        </header>
    )
}

export default Header;