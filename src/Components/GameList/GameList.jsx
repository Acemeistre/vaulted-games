import GameRow from './GameRow/GameRow'
import './GameList.css'

function GameList ({games, removeGame}) {

return (
    <div className="games-list__wrapper">
        {games.length === 0 ? <p className='no-results'>No games match the current filter parameters</p> :
        games.map((game) => {
    return (
        <GameRow
            key={game.id}
            game={game}
            removeGame={removeGame} />
            )
        })}
    </div>
)
};

export default GameList
