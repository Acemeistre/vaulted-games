import RatingsKey from './RatingsKey/RatingsKey';
import './SortBar.css';
import { useState } from 'react';
import useStaticEffect from '../../hooks/useStaticEffect';
import useLetterFlicker from '../../hooks/useLetterFlicker';

function SortBar({savedPlatforms, savedYears, savedGenres, savedRatings, sortPlatform, onSortPlatformChange, sortYear, onSortYearChange, sortTitle, onSortTitleChange, sortGenre, onSortGenreChange, sortRating, onSortRatingChange, isLoading }) {
    
    const currentYear = new Date().getFullYear()
    
    const staticEffect1 = useStaticEffect ({ isActive: true, fieldCount: 6, minDelay: 8000, maxDelay: 16000 })
    const staticEffect2 = useStaticEffect ({ isActive: true, fieldCount: 6, minDelay: 8000, maxDelay: 16000 })
    const flickerPlatform = useLetterFlicker({ text: 'Platform', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerYear = useLetterFlicker({ text: 'Year', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerTitle = useLetterFlicker({ text: 'Title', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerGenre = useLetterFlicker({ text: 'Genre', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerRating = useLetterFlicker({ text: 'Rating', isActive: true, minDelay: 12000, maxDelay: 20000 })
    const flickerRatingsKey = useLetterFlicker({ text: 'Ratings key:', isActive: true, minDelay: 12000, maxDelay: 20000 })

    return (
    <div className={`section-wrapper ${isLoading ? 'row-flicker' : ''}`} style={{animationDelay: '6.3s'}}>
        <h3>Sort</h3>
    <div className="sort-bar_container">
                <h2>
          {'Platform'.split('').map((char, i) => (
            <span key={i} className={flickerPlatform === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>    
                <h2>
          {'Year'.split('').map((char, i) => (
            <span key={i} className={flickerYear === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>     
                <h2>
          {'Title'.split('').map((char, i) => (
            <span key={i} className={flickerTitle === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>        
        <h2 className="sort-bar__hidden-header">Title</h2>
        <h2></h2>  
                <h2>
          {'Genre'.split('').map((char, i) => (
            <span key={i} className={flickerGenre === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>
                <h2>
          {'Rating'.split('').map((char, i) => (
            <span key={i} className={flickerRating === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>
                <h2>
          {'Ratings key:'.split('').map((char, i) => (
            <span key={i} className={flickerRatingsKey === i ? 'letter-dim' : ''}>
                {char === ' ' ? '\u00A0' : char}
            </span>
            ))}
        </h2>
        
        <div className={`field-wrapper ${staticEffect1 === 0 ? 'static-lines' : ''} ${staticEffect2 === 0 ? 'static-colour' : ''}`}>
        <select className='platform-select' onChange={(e) => onSortPlatformChange(e.target.value === '' ? null : e.target.value)}>
            <option value="">-Platform-</option>
                {savedPlatforms.map(platform => (
            <option key={platform} value={platform}>{platform}</option>
            ))}
        </select>
        </div>

        <div className={`field-wrapper ${staticEffect1 === 1 ? 'static-lines' : ''} ${staticEffect2 === 1 ? 'static-colour' : ''}`}>
        <select className='year-select' onChange={(e) => onSortYearChange(e.target.value === '' ? null : Number(e.target.value))}>
            <option value="">-Year-</option>
                {savedYears.map(year => (
            <option key={year} value={year}>{year}</option>
            ))}
        </select>
        </div>

        <div className={`field-wrapper ${staticEffect1 === 2 ? 'static-lines' : ''} ${staticEffect2 === 2 ? 'static-colour' : ''}`}>
        <button className='alphabet-sort' onClick={() => onSortTitleChange('a-z')}>
            A-Z
        </button>
        </div>

        <div className={`field-wrapper ${staticEffect1 === 3 ? 'static-lines' : ''} ${staticEffect2 === 3 ? 'static-colour' : ''}`}>
        <button className='alphabet-sort' value="alphabet-sort__reverse" onClick={() => onSortTitleChange('z-a')}>
            Z-A
        </button>
        </div>


        <div>/</div>
        <div className={`field-wrapper ${staticEffect1 === 4 ? 'static-lines' : ''} ${staticEffect2 === 4 ? 'static-colour' : ''}`}>
        <select className='genre-select' onChange={(e) => onSortGenreChange(e.target.value === '' ? null : e.target.value)}>
            <option value="">-Genre-</option>
                {savedGenres.map(genre => (
            <option key={genre} value={genre}>{genre}</option>
            ))}
        </select>
        </div>
        
        <div className={`field-wrapper ${staticEffect1 === 5 ? 'static-lines' : ''} ${staticEffect2 === 5 ? 'static-colour' : ''}`}>
        <select className='rating-select' onChange={(e) => onSortRatingChange(e.target.value === '' ? null : e.target.value)}>
            <option value="">-Rating-</option> 
            <option value="Top 10">Top 10</option>
            <option value="Top 20">Top 20</option>
            <option value="Amazing">Amazing</option>
            <option value="Great">Great</option>
            <option value="Ok">Ok</option>
            <option value="Meh">Forgettable</option>
            <option value="DNF">DNF</option>
        </select>
        </div>
         <RatingsKey 
         isLoading={isLoading}
         />
        </div>    
    </div>
  );
}

export default SortBar;