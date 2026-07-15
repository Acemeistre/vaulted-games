import './GameRow.css'
import { useState, useEffect, useMemo } from 'react'
import useTypewriter from '../../../hooks/useTypewriter'
import useStaticEffect from '../../../hooks/useStaticEffect'


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

const ratingColour = {
   'Top 10': '#5A1C8F',
   'Top 20': '#2475B7',
    Amazing: '#2A6917',
    Great: '#87C837',
    Ok: '#AFAB26',
    Meh: '#BE7022',
    DNF: '#6C2418'
}

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

function GameRow ({platforms, genres, game, removeGame, editingId, setEditingId, saveEdit, isAnimating, setIsAnimating, index, isLoading }) {

    const [isMounted, setIsMounted] = useState(false)

useEffect(() => {
    setIsMounted(true)
}, [])

   const rowDelay = useMemo(() => {
  if (!isAnimating && !isLoading) return 0
  return isLoading ? (8 + ((index + 1) * 0.6)) + 2 : ((index + 1) * 0.6) + 2
}, [index, isLoading, isAnimating])
    
    
    const displayedPlatform = useTypewriter({ text: String(game.platform), isActive: isAnimating || isLoading || isMounted, delay: rowDelay + (0 * 0.5) })
    const displayedYear = useTypewriter({ text: String(game.year), isActive: isAnimating || isLoading || isMounted, delay: rowDelay + (1 * 0.5)})
    const displayedTitle = useTypewriter({ text: String(game.title), isActive: isAnimating || isLoading || isMounted, delay: rowDelay + (2 * 0.5)})
    const displayedGenre = useTypewriter({ text: String(game.genre), isActive: isAnimating || isLoading || isMounted, delay: rowDelay + (6 * 0.5)})
    const displayedRating = useTypewriter({ text: String(game.rating), isActive: isAnimating || isLoading || isMounted, delay: rowDelay + (7.5 * 0.5)})
    const displayedRank = useTypewriter({ text: game.rank !== null ? String(game.rank) : '', isActive: isAnimating || isLoading || isMounted, delay: rowDelay + (9 * 0.5)})


    const currentYear = new Date().getFullYear()

    const genrePixelArt = (subgenre) => {     
    const matchedCategory = genres.find(genre => genre.subgenres.includes(subgenre)) 
        return matchedCategory ? matchedCategory.category : null
    }

    const brandColours = (consoles) => {
        const matchedPlatform = platforms.find(b => b.consoles.includes(consoles))
        return matchedPlatform ? matchedPlatform.brand : null
    }

    const iconFile = genreIcons[genrePixelArt(game.genre)]

    const isEditing = editingId === game.id
    const [editData, setEditData] = useState({
        id: game.id,
        platform: game.platform,
        year: game.year,
        title: game.title,
        genre: game.genre,
        rating: game.rating,
        rank: game.rank
    })

    const staticEffect1 = useStaticEffect ({ isActive: true, fieldCount: 8, minDelay: 40000, maxDelay: 80000 })
    const staticEffect2 = useStaticEffect ({ isActive: true, fieldCount: 8, minDelay: 40000, maxDelay: 80000 })
    
    return (
        <div className={`game-row ${isAnimating || isLoading ? 'row-flicker' : ''}`} style={{'--rating-colour': ratingColour[game.rating], animationDelay: `${isLoading ? 8 + ((index + 1) * 0.6) : (index + 1) * 0.6}s`}}>
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
                
        <input className="entry-bar__year-row" min="1970" max={currentYear} type="number" placeholder="Year" value={editData.year} onChange={(e) => setEditData({...editData, year:e.target.value})}/>
        
        <input className="entry-bar__title-row" type="text" placeholder="Title" value={editData.title} onChange={(e) => setEditData({...editData, title: e.target.value})}/>
    
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
            <option value="Forgettable">Meh..</option>
            <option value="DNF">DNF</option>
        </select>

        <select
            value={editData.rank ?? ''}  
            className='rank-select'
            disabled={!(editData.rating === 'Top 10' || editData.rating === 'Top 20')} 
            onChange={(e) => setEditData({...editData, rank: e.target.value})}>
        <option value="">-Rank-</option>
            {Array.from({ length: editData.rating === 'Top 10' ? 10 : 20 }, (_, i) => (
        <option key={i + 1} value={i + 1}> {i + 1}</option>
        ))}
        
        </select>
        <button onClick={() => saveEdit(editData)}>✓</button>
        <button onClick={() => setEditingId(null)}>✗</button>
        </>
            ) : (
                <>
            <span className={`game__platform ${staticEffect1 === 0 ? 'static-lines' : ''} ${staticEffect2 === 0 ? 'static-colour' : ''}`}
                style={{
                    backgroundColor: platformColours[brandColours(game.platform)]?.bg,
                    color:platformColours[brandColours(game.platform)]?.text
                    }}
            >{displayedPlatform}</span>
            <span className={`game__year ${staticEffect1 === 1 ? 'static-lines' : ''} ${staticEffect2 === 1 ? 'static-colour' : ''}`}>{displayedYear}</span>
            <span className={`game__title ${staticEffect1 === 2 ? 'static-lines' : ''} ${staticEffect2 === 2 ? 'static-colour' : ''}`}>{displayedTitle}</span>
            <span className={`game__genre ${staticEffect1 === 3 ? 'static-lines' : ''} ${staticEffect2 === 3 ? 'static-colour' : ''}`}>
                {displayedGenre.length > 0 && <img src={`/src/assets/${iconFile}.png`} />}
                {displayedGenre}</span>
            <span className={`game__rating ${staticEffect1 === 4 ? 'static-lines' : ''} ${staticEffect2 === 4 ? 'static-colour' : ''}`}>{displayedRating}</span>
            <span className={`game__rank ${staticEffect1 === 5 ? 'static-lines' : ''} ${staticEffect2 === 5 ? 'static-colour' : ''}`}>{displayedRank}</span>
            <button className={`game__edit ${staticEffect1 === 6 ? 'static-lines' : ''} ${staticEffect2 === 6 ? 'static-colour' : ''}`} onClick={() => setEditingId(game.id)}>/</button>
            <button className={`game__remove ${staticEffect1 === 7 ? 'static-lines' : ''} ${staticEffect2 === 7 ? 'static-colour' : ''}`} onClick={() => removeGame(game.id)}>X</button>
    </>
            )}
            </div>
    )
}

export default GameRow