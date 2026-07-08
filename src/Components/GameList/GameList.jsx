import GameRow from './GameRow/GameRow'
import './GameList.css'

function GameList ({ platforms, genres, games, removeGame, editingId, setEditingId, saveEdit}) {

return (
    <div className="games-list__wrapper">
        {games.length === 0 ? <p className='no-results'>No games match the current filter parameters</p> :
        games.map((game) => {
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
            />
            )
        })}
    </div>
)
};

export default GameList
