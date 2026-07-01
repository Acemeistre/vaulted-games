import { useState } from 'react'
import './App.css'
import Header from './Components/Header/Header'
import EntryBar from './Components/EntryBar/EntryBar'

const GameData = [
  {
    id: 1,
    platform: 'Nintendo 64',
    year: 1998,
    title: 'The Legend of Zelda: Ocarina of Time',
    genre: 'Action-adventure',
    rating: 'Top 10',
    rank: 5
  },
]

function App() {
 return (
  <div className="App">
    <Header />
    <EntryBar />
  </div>
 )
}

export default App
