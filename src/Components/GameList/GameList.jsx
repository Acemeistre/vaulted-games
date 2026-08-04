// import child component GameRow 
import GameRow from './GameRow/GameRow'
// import styles
import './GameList.css'

// function signature:
// data sources - platforms, genres and games
// edit parameters - editingId, setEditingId and saveEdit
// states - isAnimating and isLoading
// calculations - totalGames
// actions - removeGame
function GameList ({ platforms, genres, games, removeGame, editingId, setEditingId, saveEdit, isAnimating, isLoading, totalGames }) {

return (
    <div className="games-list__wrapper">
        {/* set a chained ternary object to return messages for when totalGames is equal to zero, or the filter length of games is equal to zero,
        else map all games for the component GameRow, passing in the game and index as its parameter arguments  */}
        {totalGames === 0 
        ? <p className='no-results'>Your library is currently empty — add your first game above :)</p>
        : games.length === 0 
        ? <p className='no-results'>No games match the current filter parameters</p>
        : games.map((game, index) => {
        return (
            // pass down all data sources, edit parameters, states and actions from our function signature to the GameRow component
            <GameRow
                key={game.id} // needed for React to track each game
                game={game} // derived from data source of games
                removeGame={removeGame} 
                editingId={editingId}
                setEditingId={setEditingId}
                saveEdit={saveEdit}
                platforms={platforms}
                genres={genres}
                isAnimating={isAnimating}
                index={index} // needed to track where in the games array game is
                isLoading={isLoading}
            />
            )
        })}
    </div>
    )
};

export default GameList;
