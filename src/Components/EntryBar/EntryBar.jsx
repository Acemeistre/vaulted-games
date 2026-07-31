// import css and hooks
import './EntryBar.css'
import useStaticEffect from '../../hooks/useStaticEffect'
import useLetterFlicker from '../../hooks/useLetterFlicker'

// Function signature:
// platforms and genre data for dropdowns, 
// selectedPlatform, year, title, selectedGenre, selectedRating, selectedRank — controlled input values (needed to show current state)
// onPlatformChange, onYearChange, onTitleChange, onGenreChange, onRankChange, onRatingChange — handlers to update state in App.jsx
// addGame — the submit function
// isLoading — for the boot-up animation
function EntryBar ({platforms, genres, selectedPlatform, year, title, selectedGenre, selectedRating, selectedRank, onPlatformChange, onYearChange, onTitleChange, onGenreChange, onRankChange, onRatingChange, addGame, isLoading }) {
    
    // call new Date on getFullYear and save to currentYear to set the max year for our year input
    const currentYear = new Date().getFullYear()

    // set a variable to check that ALL EntryBar fields have data entered or selected and save it to isReadyToContinue
    const isReadyToContinue = selectedPlatform !== null && year !== '' && Number(year) >= 1970 && Number(year) <= currentYear && title !== '' && selectedGenre !== null && selectedRating !== null && (selectedRating === 'Top 10' || selectedRating === 'Top 20' ? selectedRank !== null : true)

    // set isActive to true, the fieldCount number of our EntryBar and the min and max delays for the hook animation of useStaticEffect, 
    // saving it to two variable instances of staticEffect (1 & 2) in order for each effect to run indepenently with their own random timers
    const staticEffect1 = useStaticEffect ({ isActive: true, fieldCount: 7, minDelay: 8000, maxDelay: 16000 })
    const staticEffect2 = useStaticEffect ({ isActive: true, fieldCount: 7, minDelay: 8000, maxDelay: 16000 })
    // set text to the name of each EntryBar value, isActive to true and the min and max delays for the hook animation of useLetterFlicker 
    const flickerPlatform = useLetterFlicker ({ text: 'Platform', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerYear = useLetterFlicker ({ text: 'Year', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerTitle = useLetterFlicker ({ text: 'Title', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerGenre = useLetterFlicker ({ text: 'Genre', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerRating = useLetterFlicker ({ text: 'Rating', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerRank = useLetterFlicker ({ text: 'Rank', isActive: true, minDelay: 12000, maxDelay: 20000 })

    return (
    // set a ternary element to append row-flicker to section-wrapper when isLoading is true else leave is empty string when false and apply animation delay to allow Header to animate
    <div className={`section-wrapper ${isLoading ? 'row-flicker' : ''}`} style={{animationDelay: '4.3s'}}>
    <h3>Entry</h3>
    <div className="entry-bar_container">
        {/* use .split on our text, then use.map so that each character has an index to it.
        Inside it's function we have a span which takes the index numbers as its keys and then when flickerPlatform (with all it's instructions) is equal to index we apply css 'letter-dim'
        to apply the letterFlicker animation else we return an empty string for the css name.
        If the character render is an empty space we render unicode charcter '\u00A0' (for any text with spaces) else we leave the character as is normally displayed.*/}
        <h2>
          {'Platform'.split('').map((char, i) => (
            <span key={i} className={flickerPlatform === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>
        {/* see platform h2 for full code breakdown */}    
        <h2>
          {'Year'.split('').map((char, i) => (
            <span key={i} className={flickerYear === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>
        {/* see platform h2 for full code breakdown */}        
        <h2>
          {'Title'.split('').map((char, i) => (
            <span key={i} className={flickerTitle === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>
        {/* see platform h2 for full code breakdown */}   
        <h2>
          {'Genre'.split('').map((char, i) => (
            <span key={i} className={flickerGenre === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>
        {/* see platform h2 for full code breakdown */}   
        <h2>
          {'Rating'.split('').map((char, i) => (
            <span key={i} className={flickerRating === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>
        {/* see platform h2 for full code breakdown */}   
        <h2>
          {'Rank'.split('').map((char, i) => (
            <span key={i} className={flickerRank === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>

        {/* Grid spacer for add button column header */}
        <div></div>

        <div className={`field-wrapper ${staticEffect1 === 0 ? 'static-lines' : ''} ${staticEffect2 === 0 ? 'static-colour' : ''}`}>
            <select className='platform-select' onChange={(e) => onPlatformChange(e.target.value)}>
                <option value="">-Platform-</option>
                {platforms.map(item => (
                    <optgroup 
                        label={item.brand}
                        key={item.brand}
                        >
                        {item.consoles.map(i => (
                        <option 
                            value={i}
                            key={i}
                            >{i}
                        </option>
                        ))}
                    </optgroup>    
                ))}
            </select>
        </div>
        
        <div className={`field-wrapper ${staticEffect1 === 1 ? 'static-lines' : ''} ${staticEffect2 === 1 ? 'static-colour' : ''}`}>
            <input className="entry-bar__year-row" autoComplete="off" min="1970" max={currentYear} type="number" placeholder="Year" onChange={(e) => onYearChange(e.target.value)}/>
        </div>
        
        <div className={`field-wrapper ${staticEffect1 === 2 ? 'static-lines' : ''} ${staticEffect2 === 2 ? 'static-colour' : ''}`}>
            <input className="entry-bar__title-row" autoComplete="off" type="text" maxLength={50} placeholder="Title" onChange={(e) => onTitleChange(e.target.value)}/>
        </div>

        <div className={`field-wrapper ${staticEffect1 === 3 ? 'static-lines' : ''} ${staticEffect2 === 3 ? 'static-colour' : ''}`}>
            <select className='genre-select' onChange={(e) => onGenreChange(e.target.value)}>
                <option value="">-Genre-</option>
                {genres.map(item => (
                <optgroup 
                    label={item.category}
                    key={item.category}
                >
                {item.subgenres.map(i => (
                    <option 
                        value={i}
                        key={i}
                        >{i}
                    </option>
                    ))}
                </optgroup>    
                ))}
            </select>
        </div>
        
        <div className={`field-wrapper ${staticEffect1 === 4 ? 'static-lines' : ''} ${staticEffect2 === 4 ? 'static-colour' : ''}`}>
            <select className='rating-select' onChange={(e) => onRatingChange(e.target.value)}>
                <option value="">-Rating-</option> 
                <option value="Top 10">Top 10</option>
                <option value="Top 20">Top 20</option>
                <option value="Amazing">Amazing</option>
                <option value="Great">Great</option>
                <option value="Ok">Ok</option>
                <option value="Meh">Meh</option>
                <option value="DNF">DNF</option>
            </select>
        </div>
        
        <div className={`field-wrapper ${staticEffect1 === 5 ? 'static-lines' : ''} ${staticEffect2 === 5 ? 'static-colour' : ''}`}>
            <select
                value={selectedRank ?? ''}  
                className='rank-select'
                disabled={!(selectedRating === 'Top 10' || selectedRating === 'Top 20')} 
                onChange={(e) => onRankChange(e.target.value)}>
            <option value="">-Rank-</option>
                {Array.from({ length: selectedRating === 'Top 10' ? 10 : 20 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
            </select>
        </div>
        
        <div className={`field-wrapper ${staticEffect1 === 6 ? 'static-lines' : ''} ${staticEffect2 === 6 ? 'static-colour' : ''}`}>
            <button 
                className={`continue-btn ${isReadyToContinue ? 'continue-btn--active' : 'continue-btn--disabled'}`}
                onClick={isReadyToContinue ? addGame : null}
                disabled={!isReadyToContinue}
                title={
                !selectedPlatform ? 'Please select a platform first' :
                !year ? 'Please select a year' :
                Number(year) < 1970 || Number(year) > currentYear ? 'Please enter a valid year between 1970 and ' + currentYear :
                !title ? 'Please enter a game title' :
                !selectedGenre ? 'Please select a genre' :
                !selectedRating ? 'Please select a rating' :
                (selectedRating === 'Top 10' || selectedRating === 'Top 20') && !selectedRank ? 'Please select a rank' :
                'Add new game entry'
                }
            >
            +
          </button>
          </div>
        </div>
    </div>    
    );
}

export default EntryBar;