// React core imports:
// import useState to track changes to data, 
// useEffect to run code that has side effects outside of the app render (such as reading/writing to local storage, APIs, setting timers, etc),
// useMemo to both cache calculated values and only recalculate when specific dependencies change, preventing unnecessary re-renders 
// and also recognize when arrays or objects are referenced from the same place in our code's memory to keep array references stable. 
import { useState, useEffect, useMemo } from 'react'

// import styles
import './App.css'

// import components
import Header from './Components/Header/Header'
import EntryBar from './Components/EntryBar/EntryBar'
import SortBar from './Components/SortBar/SortBar'
import GameList from './Components/GameList/GameList'
import MarginDecoration from './Components/MarginDecoration/MarginDecoration.jsx'

// import data
import platforms from './Data/platforms.js'
import genres from './Data/genres.js'
import gameData from './Data/gameData.json'

function App() {
  // Entry form state - track current values of each field used in EntryBar (selectedPlatform, year, title, etc).
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [year, setYear] = useState('');
  const [title, setTitle] = useState('');
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedRank, setSelectedRank] = useState(null);

  // Sort/filter state - tracks currently active sort and filter selections used in SortBar (sortPlatform, sortYear, etc).
  const [sortPlatform, setSortPlatform] = useState(null);
  const [sortYear, setSortYear] = useState(null);
  const [sortTitle, setSortTitle] = useState(null);
  const [sortGenre, setSortGenre] = useState(null);
  const [sortRating, setSortRating] = useState(null);

  // edit state - tracks the editing ID in order to recognize which game to update when editing any game. 
  const [editingId, setEditingId] = useState(null);

  // animating state - triggers and tracks the animation sequence for both row flicker and the typewriter effect, that fires when a sort filter changes. 
  const [isAnimating, setIsAnimating] = useState(false)

  // games state - initialises with data from localStorage if it exists, otherwise falls back to any potential data in gameData.json on first page load.
  const [games, setGames] = useState(() => {
    const saved = localStorage.getItem('games')
    return saved ? JSON.parse(saved) : gameData
  });

  // loading state - intialises as true for first time users (check localStorage is not equal to the string 'hasVisted'),
  // triggering the staggered component flicker for all components on page load of first time users and skips top of page components, but still results in gameRows animating
  const [isLoading, setIsLoading] = useState(() => {
    return !localStorage.getItem('hasVisited')
  })

  // derive unique values (no duplicates) from games data to populate SortBar filter dropdowns, 
  // using the Array.from method from the 'new Set' JS data structure to ensure only platforms/genres/years that exist within the user's library are selectable as filter options for each respective field.
  const savedPlatforms = Array.from(new Set(games.map(game => game.platform)));
  const savedGenres = Array.from(new Set(games.map(game => game.genre)));
  const savedYears = Array.from(new Set(games.map(game => game.year)));

  // set a useEffect block to save games (in the dependancy array) to the local storage, whenever the games state changes, 
  // using the try/catch block to run code for potential errors such as local storage being unavailable/full
  useEffect(() => {
    try {
    localStorage.setItem('games', JSON.stringify(games))
    } catch (e) {
      console.error('localStorage unavailable:', e)
    }
  }, [games])

  // use the useMemo hook to cache the result of filtering and sorting the games array and save it to the variable filteredGames.
  const filteredGames = useMemo(() => games.filter(game => {
    // use the .filter method to return the list based on active platform, year, genre and rating
    return (sortPlatform === null ? true : sortPlatform === game.platform) && 
           (sortYear === null || sortYear === 'newest' || sortYear === 'oldest' ? true : Number(sortYear) === game.year) && 
           (sortGenre === null ? true : sortGenre === game.genre) && 
           (sortRating === null ? true : (sortRating === 'Top 20' ? game.rating === 'Top 20' || game.rating === 'Top 10' : sortRating === game.rating))
        }) 
      // use the .sort method to order the results by title (both A-Z & Z-A) or year (newest first or oldest first)  
      .sort((a, b) => {
      if (sortTitle === 'a-z') return a.title.localeCompare(b.title)
      if (sortTitle === 'z-a') return b.title.localeCompare(a.title)
      if (sortYear === 'newest') return b.year - a.year
      if (sortYear === 'oldest') return a.year - b.year
    // if no sort selected maintain original order
    return 0
    // dependency array - useMemo only recalculates when any of these values change
  }), [games, sortPlatform, sortYear, sortTitle, sortGenre, sortRating])

  // set a useEffect to watch for state changes in sortfilters and set timers for the setIsAnimating state.
  useEffect(() => {
    // if no filters are active (all null), exit early to prevent animation firing on initial mount
    if (sortPlatform === null && sortYear === null && sortTitle === null && sortGenre === null && sortRating === null) return
    // reset animation state before restarting the sequence
    setIsAnimating(false)
    // set a timeout of 50 to ensure React processes our false state before setting setIsAnimating to true
    const startTimeout = setTimeout(() => {
      setIsAnimating(true)
    }, 50)
    // set a call of setTimeout to a variable of endTimeout, calculating the animation duration, 
    // the stagger delay between each row (using filteredGames.length) and a buffer for the typewriter effect to complete across all fields including the field stagger offsets.
    const endTimeout = setTimeout(() => {
      setIsAnimating(false)
    }, 2000 + (filteredGames.length * 600) + 7500)
    // use a cleanup return for startTimeout and endTimeout to avoid setting multiple timeouts when either the component unmounts or when the useEffect re-runs due to a dependancy array change
    return () => { 
      clearTimeout(startTimeout)
      clearTimeout(endTimeout)
    }
    // set the dependancy arrays, that fires when any of their values change
  }, [sortPlatform, sortYear, sortTitle, sortGenre, sortRating])

  // set a useEffect to fire on page mounts
  useEffect(() => {
    // call a timeout if the local storage does not have the item with a value string of 'hasVisited', saving the result to a variable of animatingTimeout and wrapped in a try-catch block. 
    try{
    if (!localStorage.getItem('hasVisited')) {
      const animatingTimeout = setTimeout(() => {
      // set local storage's string value of 'hasVisited' to a value of 'true' and wrap it in another try-catch block, 
      // printing any errors to the console by catching the error and displaying that with the text prefix of 'localStorage unavailable:'  
      try {
      localStorage.setItem('hasVisited', 'true')
      } catch (e) {
        console.error('localStorage unavailable:', e)
        }
        // set setIsAnimating to true and set a calculated delay for the time taken for all components above gameRows to finish their flicker animations.
        setIsAnimating(true)
        }, 6300)
      // call a timeout where we set setIsLoading and setIsAnimating to false saving it to a variable of loadingTimeout and set calculated delays for all component animation durations
      const loadingTimeout = setTimeout(() => {
        setIsLoading(false)
        setIsAnimating(false)
      // set the initial component stagger offset
      // set staggger per game row
      // set values for flicker animation, typewriter and buffer for field stagger within each row
      }, 6300 + (filteredGames.length * 600) + 2000 + 3000 + 2500)
      // set a cleanup block to avoid setting multiple timeouts when the component unmounts or overlaps due to re-runs
      return () => {
        clearTimeout(animatingTimeout)
        clearTimeout(loadingTimeout)
        }
      }
    // close our outer catch block to write to the console if any errors if local storage is unavailable
    } catch (e) {
    console.error('localStorage unavailable:', e)
    }
  // set an empty dependancy array as this useEffect just runs on a pageload and has no arrays to watch 
  }, [])

  // set a function that uses updatedGame as an argument and save it to a variable of saveEdit
  const saveEdit = (updatedGame) => {
    // use the method .map to map over the games array, replacing the game that is equal to updateGame.id, returning all other games unchanged
    setGames(games.map(game => game.id === updatedGame.id ? updatedGame : game))
    // set the editingId back to 'null' to return the gameRow back to its displayed (non-edit) render
    setEditingId(null)
  }

  // set a function for addGame, where we add the values of our editable EntryBar fields for a newGame in a variable of newGame
  const addGame = () => {
    const newGame = {
      id: Date.now(), // use timestamp as unique ID for each new game entry
      platform: selectedPlatform,
      year: year,
      title: title,
      genre: selectedGenre,
      rating: selectedRating,
      rank: (selectedRating === 'Top 10' || selectedRating === 'Top 20' ? selectedRank : null) // only save rank for Top 10 or Top 20 ratings
      }
    // set the setGames state to it's previous array plus the newGame values and set all field states back to their inital "blank" values
    setGames(prev => ([...prev, newGame]))
    setSelectedPlatform(null)
    setYear('')
    setTitle('')
    setSelectedGenre(null)
    setSelectedRating(null)
    setSelectedRank(null)
  }

  // set a function to remove a game with the argument of id
  const removeGame = (id) => {
    // use the window.confirm method to set a message and save it to the variable confirmed
    const confirmed = window.confirm("Are you certain? This will permanently delete this game from your library")
    // exit the function if user does not confirm
    if (!confirmed) return
    // on user confimation use the .filter method to retrun each game who's id is not equal to id and set it to the state setGames
    setGames(prev => prev.filter(game => game.id !== id))
  }

  // set a function to handle a rating change with an argument of rating
  const handleRatingChange = (rating) => {
    // set the state of setSelectedRating to our argument of rating
    setSelectedRating(rating);
    // if the rating is not equal to top 10 or top 20 set the state of setSelectedRank to null as rank only applies to those two ratings
    if (rating !== 'Top 10' && rating !== 'Top 20') {
    setSelectedRank(null);
  }
}

 return (
  <div className="App">
    <div className="rotate-prompt">
      <p>Please rotate to landscape view :)</p><br />
      <p>Note: this app is optimised for tablet and desktop use only.</p>
    </div>
  <div className="app-content">
    <Header 
      isLoading={isLoading}
    />
    <EntryBar 
      selectedPlatform={selectedPlatform}
      onPlatformChange={setSelectedPlatform}
      year={year}
      onYearChange={setYear}
      title={title}
      onTitleChange={setTitle}
      selectedGenre={selectedGenre}
      onGenreChange={setSelectedGenre}
      selectedRating={selectedRating}
      onRatingChange={handleRatingChange}
      selectedRank={selectedRank}
      onRankChange={setSelectedRank}
      platforms={platforms}
      genres={genres}
      addGame={addGame}
      isLoading={isLoading}
    />
    <SortBar 
      sortPlatform={sortPlatform}
      onSortPlatformChange={setSortPlatform}
      sortYear={sortYear}
      onSortYearChange={setSortYear}
      sortTitle={sortTitle}
      onSortTitleChange={setSortTitle}
      sortGenre={sortGenre}
      onSortGenreChange={setSortGenre}
      sortRating={sortRating}
      onSortRatingChange={setSortRating}
      savedPlatforms={savedPlatforms}
      savedYears={savedYears}
      savedGenres={savedGenres}
      isLoading={isLoading}
    />
    <GameList
      platforms={platforms}
      genres={genres}
      games={filteredGames}
      removeGame={removeGame}
      editingId={editingId}
      setEditingId={setEditingId}
      saveEdit={saveEdit}
      isAnimating={isAnimating}
      isLoading={isLoading}
      totalGames={games.length}
    />
    <MarginDecoration 
      games={filteredGames.length}
    />
  </div>
    <footer>
      <div className="footer">
        <span className='footer__version'>v1.1</span>
          <p className="footer__credit">Designed and coded by Glenn Niblett (aka Acemeistre)</p>          
        <span className="footer__pixel-art">Pixel Art courtesy of <a href="https://kenney.nl/assets/input-prompts">kenney.nl/assets/input-prompts</a></span>
      </div>
    </footer>
    
  </div>
 )
}

export default App
