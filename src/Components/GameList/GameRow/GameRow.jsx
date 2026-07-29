// React core imports:
// import useState to track changes to data, 
// useEffect to run code that has side effects outside of the app render (such as reading/writing to local storage, APIs, setting timers, etc),
// useMemo to both cache calculated values and only recalculate when specific dependencies change, preventing unnecessary re-renders 
// and also recognize when arrays or objects are referenced from the same place in our code's memory to keep array references stable. 
// import useRef to store the value between page render, without causing re-renders before isLoading sets to true 
import { useState, useEffect, useMemo, useRef } from 'react'

// import styles
import './GameRow.css'

// import custom hooks
import useTypewriter from '../../../hooks/useTypewriter'
import useStaticEffect from '../../../hooks/useStaticEffect'

// set arrays whose values never change between renders
// set the value of each genre category to the name of each pixel art file and save to the object genreIcons
const genreIcons = {
  Action: 'Action_v1_crossed-swords',
  Adventure: 'Adventure_v1_globe',
  Card: 'Cards_v1_cards-of-spade--hearts--diamond--clubs',
  Misc: 'Misc_v1_dice',
  Horror: 'Horror_v1_skull',
  Casual: 'Casual_v1_video-game-controller',
  Racing: 'Racing_v1_f1-car',
  RPG: 'RPG_v1_wizard',
  SciFi: 'SciFi_v1_alien-head',
  Simulation: 'Simulation_v1_crane',
  StoryRich: 'StoryRich_v1_open-book',
  Strategy: 'Strategy_v1_chess-piece',
  Sports: 'Sports_v1_football',
  Shooter: 'Shooter_v1_machine-gun'
}

// set the value of each rating to its gameRow associated colour choices and save it to the object ratingColour
const ratingColour = {
   'Top 10': '#5A1C8F',
   'Top 20': '#2475B7',
    Amazing: '#2A6917',
    Great: '#87C837',
    Ok: '#AFAB26',
    Meh: '#BE7022',
    DNF: '#6C2418'
}

// set the value of the background and text colours of each platform brand and save it to the object platformColours
const platformColours = {
  Nintendo: { bg: '#E4000F', text: '#FFD700' },
  PlayStation: { bg: '#003087', text: '#ffffff' },
  Xbox: { bg: '#107C10', text: '#ffffff' },
  PC: { bg: '#6A0DAD', text: '#ffffff' },
  Sega: { bg: '#2563EB', text: '#ffffff' },
  Atari: { bg: '#FF6B00', text: '#0000FF' },
  Mobile: { bg: '#D3D3D3', text: '#000000' },
  Other: { bg: '#FFD700', text: '#FF0000' }
}

// set the function for gameRow including all states passed from App.jsx in the function signature
function GameRow ({platforms, genres, game, removeGame, editingId, setEditingId, saveEdit, isAnimating, index, isLoading }) {
    // set variable isNewGame to Date.now, checking if game.id was created less than 30 seconds ago
    const isNewGame = Date.now() - game.id < 30000
    // initialise isMounted state with isNewGame as its starting value
    // (see useEffect below and useTypewriter calls for how this is used)
    const [isMounted, setIsMounted] = useState(isNewGame)
    // save the isLoading variable to wasLoading using the useRef hook to prevent re-rendering
    const wasLoading = useRef(isLoading)

    // set a useEffect to set setisMounted to true if not wasLoading.current and not isNewGame - used for return users
    useEffect(() => {
        if (!wasLoading.current && !isNewGame) {
            setIsMounted(true)
        }
    }, [])

    // set a row Delay function and use the useMemo hook to watch for changes in the index, isLoading and isAnimating dependancy arrays
    const rowDelay = useMemo(() => {
        // if isLoading is true return the stagger of each game row, calculating the intial components (header, entrybar, etc) delay, 
        // the stagger delay between rows (using index + 1 for each row) and 2 secs for the flicker animation to complete
        if (isLoading) return (8 + ((index + 1) * 0.6)) + 2
        // if isAnimating is true set the stagger of each game row when calculating the stagger delay between rows (using index + 1 for each row) and 2 secs for the flicker animation to complete
        if (isAnimating) return ((index + 1) * 0.6) + 2
        // else return the stagger of each row
        return (index + 1) * 0.6
    }, [index, isLoading, isAnimating])
    

    const displayedPlatform = useTypewriter ({ text: String(game.platform), isActive: isAnimating || isLoading || isMounted, delay: isNewGame ? 2 : rowDelay })
    const displayedYear = useTypewriter ({ text: String(game.year), isActive: isAnimating || isLoading || isMounted, delay: isNewGame ? 3 : rowDelay + 1 })
    const displayedTitle = useTypewriter ({ text: String(game.title), isActive: isAnimating || isLoading || isMounted, delay: isNewGame ? 4 : rowDelay + 2 })
    const displayedGenre = useTypewriter ({ text: String(game.genre), isActive: isAnimating || isLoading || isMounted, delay: isNewGame ? 5.5 : rowDelay + 3.5 })
    const displayedRating = useTypewriter ({ text: String(game.rating), isActive: isAnimating || isLoading || isMounted, delay: isNewGame ? 6.5 : rowDelay + 4.5 })
    const displayedRank = useTypewriter ({ text: game.rank !== null ? String(game.rank) : '', isActive: isAnimating || isLoading || isMounted, delay: isNewGame ? 7.5 : rowDelay + 5.5 })

    // set new Date using the .getFullYear method and save it to the variable currentYear
    const currentYear = new Date().getFullYear()

    // set a function for genrePixelArt, using subgenre as its argument
    const genrePixelArt = (subgenre) => {
        // use the .find method to go through each genre in genres and use the .includes method to pass through the subgenres, saving it to a variable of matchedCategory     
        const matchedCategory = genres.find(genre => genre.subgenres.includes(subgenre))
        // return each category in matchedCategory using the matchedCategory variable, else return null 
        return matchedCategory ? matchedCategory.category : null
    }

    // set a function for brandColours, using consoles as its argument
    const brandColours = (consoles) => {
        // use the .find method to go through each brand in platforms and use the .includes method to pass through the argument of consoles, saving it to a variable of matchedPlatform  
        const matchedPlatform = platforms.find(brand => brand.consoles.includes(consoles))
        // return each brand in matchedPlatform using the matchedPlatform variable, else return null
        return matchedPlatform ? matchedPlatform.brand : null
    }

    // call the function of the genrePixelArt to get each category name value in subgenre, using game.genre, wrapped with genreIcons to look at the matching pixel art
    // and save it to a variable of iconFile for rendering in the genre field
    const iconFile = genreIcons[genrePixelArt(game.genre)]
    // set a variable to save game.id when it's equal to editingId(set in app.jsx) to isEditing
    const isEditing = editingId === game.id
    // set the appropriate values of the editDate state using the keys and values passed down from the game prop in app.jsx
    const [editData, setEditData] = useState({
        id: game.id,
        platform: game.platform,
        year: game.year,
        title: game.title,
        genre: game.genre,
        rating: game.rating,
        rank: game.rank
    })

    // set isActive to true, the number of fields (using fieldCount), a minDelay and a maxDelay, using the useStaticEffect state and save it to two different variables 
    // - one for each static effect to take effect at different times on different fields
    const staticEffect1 = useStaticEffect ({ isActive: true, fieldCount: 8, minDelay: 40000, maxDelay: 80000 })
    const staticEffect2 = useStaticEffect ({ isActive: true, fieldCount: 8, minDelay: 40000, maxDelay: 80000 })
    
    return (
        <div className={`game-row ${isAnimating || isLoading || isMounted ? 'row-flicker' : ''}`} 
            style={{'--rating-colour': ratingColour[game.rating], 
            animationDelay: `${isNewGame ? 0 : isLoading ? 8 + ((index + 1) * 0.6) : (index + 1) * 0.6}s`}}>
            {isEditing ? 
            (
            <>    
            <select 
            className='platform-select'
            value={editData.platform} 
            onChange={(e) => setEditData({...editData, platform: e.target.value})}
            >
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
                
        <input className="entry-bar__year-row" min="1970" max={currentYear} type="number" placeholder="Year" value={editData.year} onChange={(e) => setEditData({...editData, year: Number(e.target.value)})}/>
        
        <input className="entry-bar__title-row" type="text" maxLength={50} placeholder="Title" value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})}/>
    
        <select className='genre-select' value={editData.genre} onChange={(e) => setEditData({...editData, genre: e.target.value})}>
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
        
        <select className='rating-select' value={editData.rating} onChange={(e) => setEditData({...editData, rating:e.target.value})}>
            <option value="">-Rating-</option> 
            <option value="Top 10">Top 10</option>
            <option value="Top 20">Top 20</option>
            <option value="Amazing">Amazing</option>
            <option value="Great">Great</option>
            <option value="Ok">Ok</option>
            <option value="Meh">Meh</option>
            <option value="DNF">DNF</option>
        </select>

        <select
            value={editData.rank ?? ''}  
            className='rank-select'
            disabled={!(editData.rating === 'Top 10' || editData.rating === 'Top 20')} 
            onChange={(e) => setEditData({...editData, rank: e.target.value})}>
                <option value="">-Rank-</option>
                    {Array.from({ length: editData.rating === 'Top 10' ? 10 : 20 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
        </select>
        
        <button className="game__save" onClick={() => saveEdit(editData)}>✓</button>
        <button className="game__cancel" onClick={() => setEditingId(null)}>✗</button>
        </>
        ) : (
        <>
            <span className={`game__platform ${staticEffect1 === 0 ? 'static-lines' : ''} ${staticEffect2 === 0 ? 'static-colour' : ''}`}
                style={{
                    backgroundColor: platformColours[brandColours(game.platform)]?.bg,
                    color: platformColours[brandColours(game.platform)]?.text
                }}>
            {displayedPlatform}</span>
            
            <span className={`game__year ${staticEffect1 === 1 ? 'static-lines' : ''} ${staticEffect2 === 1 ? 'static-colour' : ''}`}>
            {displayedYear}</span>
            
            <span className={`game__title ${staticEffect1 === 2 ? 'static-lines' : ''} ${staticEffect2 === 2 ? 'static-colour' : ''}`}>
            {displayedTitle}</span>
            
            <span className={`game__genre ${staticEffect1 === 3 ? 'static-lines' : ''} ${staticEffect2 === 3 ? 'static-colour' : ''}`}>
            {displayedGenre.length > 0 && <img src={`/src/assets/${iconFile}.png`} onError={(e) => e.target.style.display = 'none'} />}
            {displayedGenre}</span>
            
            <span className={`game__rating ${staticEffect1 === 4 ? 'static-lines' : ''} ${staticEffect2 === 4 ? 'static-colour' : ''}`}>
            {displayedRating}</span>
            
            <span className={`game__rank ${staticEffect1 === 5 ? 'static-lines' : ''} ${staticEffect2 === 5 ? 'static-colour' : ''}`}>
            {displayedRank}</span>
            
            <button className={`game__edit ${staticEffect1 === 6 ? 'static-lines' : ''} ${staticEffect2 === 6 ? 'static-colour' : ''}`} 
                    title="Edit this game entry" 
                    onClick={() => setEditingId(game.id)}
            >/</button>
            <button className={`game__remove ${staticEffect1 === 7 ? 'static-lines' : ''} ${staticEffect2 === 7 ? 'static-colour' : ''}`} 
                    title="Delete this game entry" 
                    onClick={() => removeGame(game.id)}
            >X</button>
            </>
        )}
        </div>
    )
}

export default GameRow