// import child component GameRow 
import GameRow from './GameRow/GameRow'
// import styles
import './GameList.css'


function GameList ({ platforms, genres, games, removeGame, editingId, setEditingId, saveEdit, isAnimating, isLoading, totalGames }) {

return (
    <div className="games-list__wrapper">
        {totalGames === 0 
        ? <p className='no-results'>Your library is currently empty — add your first game above :)</p>
        : games.length === 0 
        ? <p className='no-results'>No games match the current filter parameters</p>
        : games.map((game, index) => {
        return (
            <GameRow
                key={game.id}
                game={game}
                removeGame={removeGame} 
                editingId={editingId}
                setEditingId={setEditingId}
                saveEdit={saveEdit}
                platforms={platforms}
                genres={genres}
                isAnimating={isAnimating}
                index={index}
                isLoading={isLoading}
            />
            )
        })}
    </div>
    )
};

export default GameList;
