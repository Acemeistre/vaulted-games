import { useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import EntryBar from './Components/EntryBar/EntryBar'
import SortBar from './Components/SortBar/SortBar'

function App() {
    const [selectedPlatform, setSelectedPlatform] = useState(null);
    const [year, setYear] = useState('');
    const [title, setTitle] = useState ('');
    const [selectedGenre, setSelectedGenre] = useState(null);
    const [selectedRating, setSelectedRating] = useState(null);
    const [selectedRank, setSelectedRank] = useState(null);



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
      onRatingChange={setSelectedRating}
      selectedRank={selectedRank}
      onRankChange={setSelectedRank}
    />
    <SortBar />
  </div>
 )
}

export default App
