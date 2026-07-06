import RatingsKey from './RatingsKey/RatingsKey';
import './SortBar.css';
import { useState } from 'react';

function SortBar({platforms, genres, sortPlatform, onSortPlatformChange, sortYear, onSortYearChange, sortTitle, onSortTitleChange, sortGenre, onSortGenreChange, sortRating, onSortRatingChange}) {
    
    const keyDown = (e) => {
        if (e.key === 'Enter')
        onSortYearChange (e.target.value)
    };
    
    return (
    <div className='section-wrapper'>
        <h3>Sort</h3>
    <div className="sort-bar_container">
        <h2>Platform</h2>    
        <h2>Year</h2>     
        <h2>Title</h2>        
        <h2></h2>
        <div></div>  
        <h2>Genre</h2>
        <h2>Rating</h2>
        <h2>Ratings key:</h2>
        
        <select className='platform-select' onChange={(e) => onSortPlatformChange(e.target.value)}>
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
        <div className="year-enter">
            <input min="1970" max="2026" type="number" placeholder="Year" onKeyDown={keyDown}/>
        </div>
        <button className='alphabet-sort' onClick={() => onSortTitleChange('a-z')}>
            A-Z
        </button>
        <button value="alphabet-sort__reverse" onClick={() => onSortTitleChange('z-a')}>
            Z-A
        </button>
        <div>/</div>
        <select className='genre-select' onChange={(e) => onSortGenreChange(e.target.value)}>
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
        <select className='rating-select' onChange={(e) => onSortRatingChange(e.target.value)}>
            <option value="">-Rating-</option> 
            <option value="Top 10">Top 10</option>
            <option value="Top 20">Top 20</option>
            <option value="Amazing">Amazing</option>
            <option value="Great">Great</option>
            <option value="Ok">Ok</option>
            <option value="Forgettable">Forgettable</option>
            <option value="DNF">DNF</option>
        </select>
         <RatingsKey />
        </div>    
    </div>
  );
}

export default SortBar;