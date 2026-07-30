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
    
    // for the useTypewriter state set object property text to to a string of each field (platform, year, etc)
    // set isActive to the value of isAnimating or isLoading or isMounted,
    // set the delay of the state to 2 seconds for isNewGame, else use variable rowDelay
    // save these object property values to a variable for the displayed version (not the edit version of our entry fields), incrementing the delay values in order to stagger the delay between each field within the game row
    const displayedPlatform = useTypewriter ({ text: String(game.platform), isActive: isAnimating || isLoading || isMounted, delay: isNewGame ? 2 : rowDelay })
    const displayedYear = useTypewriter ({ text: String(game.year), isActive: isAnimating || isLoading || isMounted, delay: isNewGame ? 3 : rowDelay + 1 })
    const displayedTitle = useTypewriter ({ text: String(game.title), isActive: isAnimating || isLoading || isMounted, delay: isNewGame ? 4 : rowDelay + 2 })
    const displayedGenre = useTypewriter ({ text: String(game.genre), isActive: isAnimating || isLoading || isMounted, delay: isNewGame ? 5.5 : rowDelay + 3.5 })
    const displayedRating = useTypewriter ({ text: String(game.rating), isActive: isAnimating || isLoading || isMounted, delay: isNewGame ? 6.5 : rowDelay + 4.5 })
    // for the text property, if the data rank of a game is not null set the string of the game's rank else set to an empty string
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
        <div 
            // use a template literal for className 'game-row' so the css can apply the animations for 'row-flicker' when either isAnimating, isLoading or isMounted is true
            className={`game-row ${isAnimating || isLoading || isMounted ? 'row-flicker' : ''}`}
            // set the style property to '--rating-colour', using bracket notation on the object ratingColour to look up each game rating, so as to be applied as an inset box shadow on each gamerow field 
            style={{'--rating-colour': ratingColour[game.rating],
            // use a template literal to set the animation delay for isNewGame to 0, then for isLoading an 8 second delay before using index to calculate the row stagger, else just calculate row stagger
            animationDelay: `${isNewGame ? 0 : isLoading ? 8 + ((index + 1) * 0.6) : (index + 1) * 0.6}s`}}>

            {/* if isEditing is true render the edit mode fields (selects, inputs and save/cancel buttons),
            pre-populated with the current game data from editData state*/}   
            {isEditing ? 
            (
            // use a react fragment to wrap multiple elements without having anything additonal to render
            <>    
        
        <select 
            className='platform-select'
            // pre-populate the select value with the current platform value from editData
            value={editData.platform}
            // for the onChange event set the setEditData state to spread all existing editData values along with targeting the platform value to update it to our selected platform 
            onChange={(e) => setEditData({...editData, platform: e.target.value})}
            >
            <option value="">-Platform-</option>
            {/* map each brand in platforms to render a optgroup, with a nested map to go through each console to render an option */} 
            {platforms.map(item => (
            <optgroup
                label={item.brand}
                key={item.brand} // needed to let React know which item to re-render for brand optgroups when a user interacts with the list
                >
                {/* map each console in brands to render each option */}  
                {item.consoles.map(i => (
                <option 
                    value={i}
                    key={i} // needed to let React know which item to re-render for console options when a user interacts with the list
                >
                    {i} {/* renders the text value of each mapped item */}
                </option>
                ))}
            </optgroup>    
            ))}
        </select>

        {/* year, title, genre and rating fields follow the same pattern as platform above:
        - value pre-populated from editData
        - onChange spreads existing editData and updates only the changed field
        - mapped options use key for React tracking */}

        <input className="entry-bar__year-row" type="number" min="1970" max={currentYear} placeholder="Year" value={editData.year} onChange={(e) => setEditData({...editData, year: Number(e.target.value)})}/>
        
        <input className="entry-bar__title-row" type="text" maxLength={50} placeholder="Title" value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})}/>
    
        <select 
            className='genre-select' 
            value={editData.genre} 
            onChange={(e) => setEditData({...editData, genre: e.target.value})}
            >
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
                >
                    {i}
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
            value={editData.rank ?? ''} // use a nullish coalescing operator to set value to the rank of editData or an empty string if rank is null
            className='rank-select'
            disabled={!(editData.rating === 'Top 10' || editData.rating === 'Top 20')} // field remains disabled if rating is not equal to top 10 or top 20
            onChange={(e) => setEditData({...editData, rank: e.target.value})}> {/* spread all existing editData values along with targeting the value of the rank property to update it to our selected rank */}
                <option value="">-Rank-</option>
                    {/* use a ternary operator to take an array from the length property of the rating in editData if it's equal to 'top 10' to create 10 items else creat 20 items,
                    call this with _ convention (to discard the parameter) and its index */}
                    {Array.from({ length: editData.rating === 'Top 10' ? 10 : 20 }, (_, i) => (
                <option 
                    key={i + 1} // add 1 to index to give the correct representation of our top 10/20 to react
                    value={i + 1} // add 1 to index to give the correct value of our top 10/20
                >
                    {i + 1} {/* add 1 to index to render the correct number of our top 10/20 */}
                </option>
            ))}
        </select>
        
        <button className="game__save" onClick={() => saveEdit(editData)}>✓</button> {/* calls saveEdit with the current editData variable to update the game in games array */}
        <button className="game__cancel" onClick={() => setEditingId(null)}>✗</button> {/* used to set the setEditingId data back to null without saving changes */}
        </>
        ) : (
        <>
            {/* use a ternary element to add the css 'static-lines' to 'game__platform' when staticEffect1 is equal to 0 (0 being the index number of the platform field within each game row), else leave as an empty string. 
            Repeat the same object logic for staticEffect 2 but with 'static-colour for the added css text value */}
            <span className={`game__platform ${staticEffect1 === 0 ? 'static-lines' : ''} ${staticEffect2 === 0 ? 'static-colour' : ''}`}
                  style={{
                    // use bracket notation to match the selection of the game.platform value in brandColours (where the console names are held) to the background colour within the object of platformColours
                    // we chain bg to the end to specify the key-value pair held within platformColours and prefix it with a ? to prevent errors if no matching brand is found
                    backgroundColor: platformColours[brandColours(game.platform)]?.bg,
                    color: platformColours[brandColours(game.platform)]?.text // apply the same logic as above, just with .text to select that key-value pair within platformColours
                }}>
            {displayedPlatform}</span>
            
            {/* see 'game__platform' comment for ternary element logic */}
            <span className={`game__year ${staticEffect1 === 1 ? 'static-lines' : ''} ${staticEffect2 === 1 ? 'static-colour' : ''}`}>
            {displayedYear}</span>
            
            {/* see 'game__platform' comment for ternary element logic */}
            <span className={`game__title ${staticEffect1 === 2 ? 'static-lines' : ''} ${staticEffect2 === 2 ? 'static-colour' : ''}`}>
            {displayedTitle}</span>
            
            {/* see 'game__platform' comment for ternary element logic */}
            <span className={`game__genre ${staticEffect1 === 3 ? 'static-lines' : ''} ${staticEffect2 === 3 ? 'static-colour' : ''}`}>
            {/* only render the genre icon once displayedGenre has started typing (length > 0),
            with onError handling to hide the image if the file fails to load */}
            {displayedGenre.length > 0 && <img src={`/src/assets/${iconFile}.png`} onError={(e) => e.target.style.display = 'none'} />}
            {displayedGenre}</span>
            
            {/* see 'game__platform' comment for ternary element logic */}
            <span className={`game__rating ${staticEffect1 === 4 ? 'static-lines' : ''} ${staticEffect2 === 4 ? 'static-colour' : ''}`}>
            {displayedRating}</span>
            
            {/* see 'game__platform' comment for ternary element logic */}
            <span className={`game__rank ${staticEffect1 === 5 ? 'static-lines' : ''} ${staticEffect2 === 5 ? 'static-colour' : ''}`}>
            {displayedRank}</span>
            
            {/* see 'game__platform' comment for ternary element logic */}
            <button className={`game__edit ${staticEffect1 === 6 ? 'static-lines' : ''} ${staticEffect2 === 6 ? 'static-colour' : ''}`} 
                    title="Edit this game entry" 
                    onClick={() => setEditingId(game.id)}
            >/</button>

            {/* see 'game__platform' comment for ternary element logic */}
            <button className={`game__remove ${staticEffect1 === 7 ? 'static-lines' : ''} ${staticEffect2 === 7 ? 'static-colour' : ''}`} 
                    title="Delete this game entry"
                    // for property onClick call the function removeGame with game.id as its argument 
                    onClick={() => removeGame(game.id)}
            >X</button>
            </>
        )}
        </div>
    )
}

export default GameRow