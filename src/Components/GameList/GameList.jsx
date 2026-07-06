import GameRow from './GameRow/GameRow'
import './GameList.css'

function GameList ({games}) {
return (
    <div className="games-list__wrapper">
        {games.map((game) => {
    return (
        <GameRow
            key={game.id}
            game={game} />
            )
        })}
    </div>
)
};

export default GameList