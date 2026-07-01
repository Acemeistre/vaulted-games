import './EntryBar.css'

function EntryBar() {
  return (
    <div className="entry-bar_container">
        <div className="entry-bar__header">
            <div className="entry-bar__platform-header">
                <h2>Platform</h2>
            </div>
            <div className="entry-bar__year-header">
                <h2>Year</h2>
            </div>
            <div className="entry-bar__title-header">
                <h2>Title</h2>
            </div>
            <div className="entry-bar__genre-header">
                <h2>Genre</h2>
            </div>
            <div className="entry-bar__rating-header">
                <h2>Rating</h2>
            </div>
            <div className="entry-bar__rank-header">
                <h2>Rank</h2>
            </div>
        </div>
        <div className="entry-bar__row">
            <div className="entry-bar__platform-row">
                <select>
                    <option value="platform1">Platform 1</option>
                    <option value="platform2">Platform 2</option>
                </select> 
            </div>
            <div className="entry-bar__year-row">
                <input type="number" placeholder="Year" />
                    <option value="year1">Year 1</option>
                    <option value="year2">Year 2</option>
            </div>
            <input className="entry-bar__title-row" type="text" placeholder="Title" />
            <div className="entry-bar__genre-row">
                <select>
                    <option value="genre1">Genre 1</option>
                    <option value="genre2">Genre 2</option>
                </select>
            </div>
            <div className="entry-bar__rating-row">
                <select>
                    <option value="rating1">Rating 1</option>
                    <option value="rating2">Rating 2</option>
                </select>
            </div>
            <div className="entry-bar__rank-row">
                <select>
                    <option value="rank1">Rank 1</option>
                    <option value="rank2">Rank 2</option>
                </select>
            </div>
            <button className="entry-bar__add-button">Add</button>
        </div>    
    </div>
  );
}

export default EntryBar;