import './EntryBar.css'

function EntryBar() {
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
        <select>
            <option value="platform1">Platform 1</option>
            <option value="platform2">Platform 2</option>
        </select>
        <input className="entry-bar__year-row" type="number" placeholder="Year" />
        <input className="entry-bar__title-row" type="text" placeholder="Title" />
        <select>
            <option value="genre1">Genre 1</option>
            <option value="genre2">Genre 2</option>
        </select>
        <select>
            <option value="rating1">Rating 1</option>
            <option value="rating2">Rating 2</option>
        </select>
        <select>
            <option value="rank1">Rank 1</option>
            <option value="rank2">Rank 2</option>
        </select>
        <button className="entry-bar__add-button">+</button>
        </div>    
    </div>
  );
}

export default EntryBar;