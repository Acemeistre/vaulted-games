import './RatingsKey.css'
import useStaticEffect from '../../../hooks/useStaticEffect'

function RatingsKey  ({ isLoading }) {

    const staticEffect1 = useStaticEffect ({ isActive: true, fieldCount: 1 })
    const staticEffect2 = useStaticEffect ({ isActive: true, fieldCount: 1 })
    return (
        <div className={`ratings-key__wrapper ${isLoading ? 'row-flicker' : ''}`} title="Guide for the colours chosen by ratings select and used on gamerows" style={{animationDelay: '6.3s'}}>
            <div className={`field-wrapper ${staticEffect1 === 0 ? 'static-lines' : ''} ${staticEffect2 === 0 ? 'static-colour' : ''}`}>
            <div className="ratings-key__names">
                <div className='ratings-key__row'><p>Top 10</p><div className="purple rating-swatch"></div></div>
                <div className='ratings-key__row'><p>Top 20</p><div className="blue rating-swatch"></div></div>
                <div className='ratings-key__row'><p>Amazing</p><div className="green rating-swatch"></div></div>
                <div className='ratings-key__row'><p>Great</p><div className="lime rating-swatch"></div></div>
                <div className='ratings-key__row'><p>Ok</p><div className="yellow rating-swatch"></div></div>
                <div className='ratings-key__row'><p>Meh..</p><div className="orange rating-swatch"></div></div>
                <div className='ratings-key__row'><p>DNF</p><div className="red rating-swatch"></div></div>
            </div>
            </div>
        </div>
    )
}

export default RatingsKey