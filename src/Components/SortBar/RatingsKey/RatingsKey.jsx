import './RatingsKey.css'

function RatingsKey  () {
    return (
        <div className='ratings-key__wrapper'>
            <div className="ratings-key__names">
                <div className='ratings-key__row'><p>Top 10</p><div className="purple rating-swatch"></div></div>
                <div className='ratings-key__row'><p>Top 20</p><div className="blue rating-swatch"></div></div>
                <div className='ratings-key__row'><p>Amazing</p><div className="green rating-swatch"></div></div>
                <div className='ratings-key__row'><p>Great</p><div className="lime rating-swatch"></div></div>
                <div className='ratings-key__row'><p>Ok</p><div className="yellow rating-swatch"></div></div>
                <div className='ratings-key__row'><p>Forgettable</p><div className="orange rating-swatch"></div></div>
                <div className='ratings-key__row'><p>DNF</p><div className="red rating-swatch"></div></div>
            </div>
        </div>
    )
}

export default RatingsKey