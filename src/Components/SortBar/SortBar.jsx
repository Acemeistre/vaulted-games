import './SortBar.css'

function SortBar() {
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
        <h2>Rating key</h2>
        
        <select>
            <option value="platform1">Platform 1</option>
            <option value="platform2">Platform 2</option>
        </select>
        <input className="sort-bar__year-row" type="number" placeholder="Year" />
        <button>
            <option className="sort-bar__title-row" type="text" placeholder="A-Z">A-Z</option>
        </button>
        <button>
            <option value="genre1">Z-A</option>
        </button>
        <div>/</div>
        <select>
            <option value="rating1">Rating 1</option>
            <option value="rating2">Rating 2</option>
        </select>
        <select>
            <option value="rank1">Genre 1</option>
            <option value="rank2">Rank 2</option>
        </select>
        
         <button></button>
        </div>    
    </div>
  );
}

export default SortBar;