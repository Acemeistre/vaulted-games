import './GameRow.css'

function GameRow ({game, removeGame}) {
    return (
        <div className="game-row">
            <span className="game__platform">{game.platform}</span>
            <span className="game__year">{game.year}</span>
            <span className="game__title">{game.title}</span>
            <span className="game__genre">{game.genre}</span>
            <span className="game__rating">{game.rating}</span>
            <span className="game__rank">{game.rank}</span>
            <button className="game__edit">{game.edit}</button>
            <button className="game__remove" onClick={() => removeGame(game.id)}>X</button>
        </div>
    )
}

export default GameRow