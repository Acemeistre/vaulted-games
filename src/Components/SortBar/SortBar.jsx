// import child component RatingsKey
import RatingsKey from './RatingsKey/RatingsKey';
// import styles
import './SortBar.css';
// import hooks
import useStaticEffect from '../../hooks/useStaticEffect';
import useLetterFlicker from '../../hooks/useLetterFlicker';

// Function signature:
// saved Platforms, years, genres and ratings for the games that have used those values.
// sort Platform, year, title, genre, rating to filter games by those values.
// onsortChange for Platform, year, title, genre, rating to detect when those fields are chosen.
// pass in isLoading to check for first time users
function SortBar({savedPlatforms, savedYears, savedGenres, sortPlatform, onSortPlatformChange, sortYear, onSortYearChange, sortTitle, onSortTitleChange, sortGenre, onSortGenreChange, sortRating, onSortRatingChange, isLoading }) {
    // set isActive to true, the fieldCount number of our SortBar fields and the min and max delays for the hook animation of useStaticEffect, 
    // saving it to two variable instances of staticEffect (1 & 2) in order for each effect to run indepenently with their own random timers
    const staticEffect1 = useStaticEffect ({ isActive: true, fieldCount: 6, minDelay: 8000, maxDelay: 16000 })
    const staticEffect2 = useStaticEffect ({ isActive: true, fieldCount: 6, minDelay: 8000, maxDelay: 16000 })
    // set text to the name of each SortBar value, isActive to true and the min and max delays for the hook animation of useLetterFlicker 
    const flickerPlatform = useLetterFlicker ({ text: 'Platform', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerYear = useLetterFlicker ({ text: 'Year', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerTitle = useLetterFlicker ({ text: 'Title', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerGenre = useLetterFlicker ({ text: 'Genre', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerRating = useLetterFlicker ({ text: 'Rating', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerRatingsKey = useLetterFlicker ({ text: 'Ratings key:', isActive: true, minDelay: 12000, maxDelay: 20000 })

    return (
    // set a ternary element to append row-flicker to section-wrapper when isLoading is true else leave is empty string when false
    // and apply animation delay for the style property to allow Header and EntryBar to animate
    <div className={`section-wrapper ${isLoading ? 'row-flicker' : ''}`} style={{animationDelay: '6.3s'}}>
        <h3>Sort</h3>
        <div className="sort-bar_container">
            {/* use .split on our text, then use .map so that each character has an index to it - pass in char and i for the name and index to the argument of the function.
            Inside it's function we have a span which takes the index numbers as its keys and then when flickerPlatform (with all it's instructions) is equal to index we apply css 'letter-dim'
            to apply the letterFlicker animation else we return an empty string for the css name.
            For the render, if a character render is an empty space we render unicode charcter '\u00A0' (for any text with spaces) else we leave the character as is normally displayed.*/}
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
            {/* Hidden header maintains grid alignment for Z-A button column */}        
            <h2 className="sort-bar__hidden-header">Title</h2>
        
            {/* Grid spacer */}
            <h2></h2>  
    
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
                {'Ratings key:'.split('').map((char, i) => (
                <span key={i} className={flickerRatingsKey === i ? 'letter-dim' : ''}>
                    {char === ' ' ? '\u00A0' : char}
                </span>
                ))}
            </h2>
        
        {/* set a ternary element to append static-lines to field-wrapper when staticEffect1 is equal to zero else leave as empty string when false 
        and append static-colour when staticEffect2 is equal to zero else leave as an empty string when false */}    
        <div className={`field-wrapper ${staticEffect1 === 0 ? 'static-lines' : ''} ${staticEffect2 === 0 ? 'static-colour' : ''}`}>
            {/* for the onChange set the event to target the onPlatformChange state value to update it to null if our selected platform string is empty else set it to our selected platform */}
            <select className='platform-select' onChange={(e) => onSortPlatformChange(e.target.value === '' ? null : e.target.value)}>
                <option value="">-Platform-</option>
                {/* map each console in platforms to render our sort options, passing in its key and value */}
                    {savedPlatforms.map(platform => (
                <option key={platform} value={platform}>{platform}</option>
                ))}
            </select>
        </div>

        {/* see field-wrapper for staticEffect code logic */}
        <div className={`field-wrapper ${staticEffect1 === 1 ? 'static-lines' : ''} ${staticEffect2 === 1 ? 'static-colour' : ''}`}>
            {/* set onChange to target the event of each option */}
            <select className='year-select' onChange={(e) => {
                // set the event target value to a variable named val
                const val = e.target.value
                // if val's equal to an empty string set the state of onSortYear to null
                if (val === '') onSortYearChange(null)
                // if val's equal to 'newest' or 'oldest' call the state and pass in val as its value
                else if (val === 'newest' || val === 'oldest') onSortYearChange(val)
                // else pass in number value to the state, using val as its value
                else onSortYearChange (Number(val))
            }}>
                <option value="">-Year-</option>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                    {/* see savedPlatforms.map for our .map code logic */}
                    {savedYears.map(year => (
                <option key={year} value={year}>{year}</option>
            ))}
            </select>
        </div>
        
        {/* see field-wrapper for staticEffect code logic */}
        <div className={`field-wrapper ${staticEffect1 === 2 ? 'static-lines' : ''} ${staticEffect2 === 2 ? 'static-colour' : ''}`}>
            <button className='alphabet-sort' onClick={() => onSortTitleChange('a-z')}> {/* sorts our titles alphabetically */}
                A-Z
            </button>
        </div>
        
        {/* see field-wrapper for staticEffect code logic */}
        <div className={`field-wrapper ${staticEffect1 === 3 ? 'static-lines' : ''} ${staticEffect2 === 3 ? 'static-colour' : ''}`}>
            <button className='alphabet-sort' onClick={() => onSortTitleChange('z-a')}> {/* sorts our titles in reverse alphabet */}
                Z-A
            </button>
        </div>
        
        {/* Grid spacer between A-Z/Z-A buttons and Genre dropdown */}
        <div>/</div>
        
        {/* see field-wrapper for staticEffect code logic */}
        {/* see platform-select for our onSortChange code logic */}
        <div className={`field-wrapper ${staticEffect1 === 4 ? 'static-lines' : ''} ${staticEffect2 === 4 ? 'static-colour' : ''}`}>
            <select className='genre-select' onChange={(e) => onSortGenreChange(e.target.value === '' ? null : e.target.value)}>
                <option value="">-Genre-</option>
                    {/* see savedPlatforms.map for our .map code logic */}
                    {savedGenres.map(genre => (
                <option key={genre} value={genre}>{genre}</option>
                ))}
            </select>
        </div>
        
        {/* see field-wrapper for staticEffect code logic */}
        {/* see platform-select for our onSortChange code logic */}
        <div className={`field-wrapper ${staticEffect1 === 5 ? 'static-lines' : ''} ${staticEffect2 === 5 ? 'static-colour' : ''}`}>
            <select className='rating-select' onChange={(e) => onSortRatingChange(e.target.value === '' ? null : e.target.value)}>
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

        <RatingsKey
        // pass in isLoading to check for first time users 
        isLoading={isLoading}
        />
        
        </div>    
    </div>
  );
}

export default SortBar;