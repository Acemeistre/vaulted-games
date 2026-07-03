import './EntryBar.css'
import { useState } from 'react';



function EntryBar ({platforms, genres, selectedRating, selectedRank, onPlatformChange, onYearChange, onTitleChange, onGenreChange, onRankChange, onRatingChange}) {
  return (
    <div className='section-wrapper'>
    <h3>Entry</h3>
    <div className="entry-bar_container">
        <h2>Platform</h2>    
        <h2>Year</h2>     
        <h2>Title</h2>        
        <h2>Genre</h2>  
        <h2>Rating</h2>
        <h2>Rank</h2>
        <div></div>
        <select className='platform-select'>
            <option value="">Select Platform</option>
            {platforms.map(item => (
                <optgroup 
                    label={item.brand}
                    key={item.brand}
                    >
                    {item.consoles.map(i => (
                        <option 
                            value={i}
                            key={i}
                            onChange={(e) => onPlatformChange(e.target.value)}
                            >{i}
                        </option>
                    ))}
                </optgroup>    
                ))}
        </select>
        <input className="entry-bar__year-row" min="1970" max="2026" type="number" placeholder="Year" onChange={(e) => onYearChange(e.target.value)}/>
        <input className="entry-bar__title-row" type="text" placeholder="Title" onChange={(e) => onTitleChange(e.target.value)}/>
        <select className='genre-select'>
            <option value="">Select Genre</option>
            {genres.map(item => (
                <optgroup 
                    label={item.category}
                    key={item.category}
                    >
                    {item.subgenres.map(i => (
                        <option 
                            value={i}
                            key={i}
                            onChange={(e) => onGenreChange(e.target.value)}
                            >{i}
                        </option>
                    ))}
                </optgroup>    
                ))}
        </select>
        <select className='rating-select' onChange={(e) => onRatingChange(e.target.value)}>
            <option value="">Select Rating</option> 
            <option value="Top 10">Top 10</option>
            <option value="Top 20">Top 20</option>
            <option value="Amazing">Amazing</option>
            <option value="Great">Great</option>
            <option value="Ok">Ok</option>
            <option value="Forgettable">Forgettable</option>
            <option value="DNF">DNF</option>
        </select>

        
        <select
            value={selectedRank ?? ''}  
            className='rank-select'
            disabled={!(selectedRating === 'Top 10' || selectedRating === 'Top 20')} 
            onChange={(e) => onRankChange(e.target.value)}>
        <option value="">Select Rank</option>
            {Array.from({ length: selectedRating === 'Top 10' ? 10 : 20 }, (_, i) => (
        <option key={i + 1} value={i + 1}> {i + 1}</option>
        ))}
        </select>
            

        <button className="entry-bar__add-button">+</button>
        </div>    
    </div>
  );
}

export default EntryBar;