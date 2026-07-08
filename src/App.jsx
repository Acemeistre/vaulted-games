import { useState, useEffect } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import EntryBar from './Components/EntryBar/EntryBar'
import SortBar from './Components/SortBar/SortBar'
import platforms from './Data/platforms.js'
import genres from './Data/genres.js'
import gameData from './Data/gameData.json'
import GameList from './Components/GameList/GameList'

function App() {
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [year, setYear] = useState('');
    const [title, setTitle] = useState ('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedRank, setSelectedRank] = useState(null);

    const [sortPlatform, setSortPlatform] = useState(null);
    const [sortYear, setSortYear] = useState(null);
    const [sortTitle, setSortTitle] = useState(null);
    const [sortGenre, setSortGenre] = useState(null);
    const [sortRating, setSortRating] = useState(null);

    const [editingId, setEditingId] = useState(null);

    const [games, setGames] = useState(() => {
      const saved = localStorage.getItem('games')
      return saved ? JSON.parse(saved) :gameData
    });

    const savedPlatforms = Array.from(new Set(games.map(game => game.platform)));
    const savedGenres = Array.from(new Set(games.map(game => game.genre)));
    const savedRatings = Array.from(new Set(games.map(game => game.rating)));
    const savedYears = Array.from(new Set(games.map(game => game.year)));

    useEffect(() => {
      localStorage.setItem('games', JSON.stringify(games))
    }, [games])

    const filteredGames = games.filter(game => {
      return (sortPlatform === null ? true : sortPlatform === game.platform) && 
             (sortYear === null ? true : Number(sortYear) === game.year) && 
             (sortGenre === null ? true : sortGenre === game.genre) && 
             (sortRating === null ? true : (sortRating === 'Top 20' ? game.rating === 'Top 20' || game.rating === 'Top 10' : sortRating === game.rating))
          }) 
        .sort((a, b) => {
        if (sortTitle === 'a-z') return a.title.localeCompare(b.title)
        if (sortTitle === 'z-a') return b.title.localeCompare(a.title)
      return 0
    })

    const saveEdit = (updatedGame) => {
        setGames(games.map(game => game.id === updatedGame.id ? updatedGame : game))
      setEditingId(null)
    }

    const addGame = () => {
      const newGame = {
        id: Date.now(),
        platform: selectedPlatform,
        year: year,
        title: title,
        genre: selectedGenre,
        rating: selectedRating,
        rank: (selectedRating === 'Top 10' || selectedRating === 'Top 20' ? selectedRank : null)
        }
      setGames(prev => ([...prev, newGame]))
      console.log(newGame)
    }

    const removeGame = (id) => {
      const confirmed = window.confirm("Are you certain? This will permenantly delete this game from your library")
      if (!confirmed) return
      setGames(prev => prev.filter(game => game.id !== id))
    }

    const handleRatingChange = (rating) => {
      setSelectedRating(rating);
        if (rating !== 'Top 10' && rating !== 'Top 20') {
      setSelectedRank(null);
    }
  }


 return (
  <div className="App">
    <Header />
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
      savedRatings={savedRatings}
    />
    <GameList
    platforms={platforms}
    genres={genres}
    games={filteredGames}
    removeGame={removeGame}
    editingId={editingId}
    setEditingId={setEditingId}
    saveEdit={saveEdit}
    />
  </div>
 )
}

export default App
