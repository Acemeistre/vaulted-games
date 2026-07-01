import { useState } from 'react'
import Header from './Components/Header/Header'

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
  <div className="bg-black min-h-screen">
    <Header />
  </div>
 )
}

export default App
