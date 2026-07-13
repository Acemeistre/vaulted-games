import './EntryBar.css'
import useStaticEffect from '../../hooks/useStaticEffect'

function EntryBar ({platforms, genres, selectedPlatform, year, title, selectedGenre, selectedRating, selectedRank, onPlatformChange, onYearChange, onTitleChange, onGenreChange, onRankChange, onRatingChange, addGame, isLoading }) {
  
    const isReadyToContinue = selectedPlatform !== null && year !== '' && title !== '' && selectedGenre !== null && (selectedRating === 'Top 10' || selectedRating === 'Top 20' ? selectedRank !== null : true)
    
    const currentYear = new Date().getFullYear()

    const staticEffect1 = useStaticEffect ({ isActive: true, fieldCount: 7 })
    const staticEffect2 = useStaticEffect ({ isActive: true, fieldCount: 7 })

    return (
    <div className={`section-wrapper ${isLoading ? 'row-flicker' : ''}`} style={{animationDelay: '4.3s'}}>
    <h3>Entry</h3>
    <div className="entry-bar_container">
        <h2>Platform</h2>    
        <h2>Year</h2>     
        <h2>Title</h2>        
        <h2>Genre</h2>  
        <h2>Rating</h2>
        <h2>Rank</h2>
        <div></div>

        <div className={`field-wrapper ${staticEffect1 === 0 ? 'static-lines' : ''} ${staticEffect2 === 0 ? 'static-colour' : ''}`}>
        <select className='platform-select' onChange={(e) => onPlatformChange(e.target.value)}>
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
        </div>
        </div>
        
        <div className={`field-wrapper ${staticEffect1 === 1 ? 'static-lines' : ''} ${staticEffect2 === 1 ? 'static-colour' : ''}`}>
        <input className="entry-bar__year-row" min="1970" max={currentYear} type="number" placeholder="Year" onChange={(e) => onYearChange(e.target.value)}/>
        </div>
        
        <div className={`field-wrapper ${staticEffect1 === 2 ? 'static-lines' : ''} ${staticEffect2 === 2 ? 'static-colour' : ''}`}>
        <input className="entry-bar__title-row" type="text" placeholder="Title" onChange={(e) => onTitleChange(e.target.value)}/>
        </div>

        <div className={`field-wrapper ${staticEffect1 === 3 ? 'static-lines' : ''} ${staticEffect2 === 3 ? 'static-colour' : ''}`}>
        <select className='genre-select' onChange={(e) => onGenreChange(e.target.value)}>
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
        </div>
        
        <div className={`field-wrapper ${staticEffect1 === 4 ? 'static-lines' : ''} ${staticEffect2 === 4 ? 'static-colour' : ''}`}>
        <select className='rating-select' onChange={(e) => onRatingChange(e.target.value)}>
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
        
        <div className={`field-wrapper ${staticEffect1 === 5 ? 'static-lines' : ''} ${staticEffect2 === 5 ? 'static-colour' : ''}`}>
        <select
            value={selectedRank ?? ''}  
            className='rank-select'
            disabled={!(selectedRating === 'Top 10' || selectedRating === 'Top 20')} 
            onChange={(e) => onRankChange(e.target.value)}>
        <option value="">-Rank-</option>
            {Array.from({ length: selectedRating === 'Top 10' ? 10 : 20 }, (_, i) => (
        <option key={i + 1} value={i + 1}> {i + 1}</option>
        ))}
        </select>
        </div>

        <div className={`field-wrapper ${staticEffect1 === 6 ? 'static-lines' : ''} ${staticEffect2 === 6 ? 'static-colour' : ''}`}>
        <button 
        className={`continue-btn ${isReadyToContinue ? 'continue-btn--active' : 'continue-btn--disabled'}`}
        onClick={isReadyToContinue ? addGame : null}
            disabled={!isReadyToContinue}
            title={
            !selectedPlatform ? 'Please select a platform first' :
            !year ? 'Please select a year' :
            !title ? 'Please enter a game title' :
            !selectedGenre ? 'Please select a genre' :
            !selectedRating ? 'Please select a rating' :
            (selectedRating === 'Top 10' || selectedRating === 'Top 20') && !selectedRank ? 'Please select a rank ' :
            'Add new game entry'
            }
          >
            +
          </button>
          </div>
        </div>    
  );
}

export default EntryBar;