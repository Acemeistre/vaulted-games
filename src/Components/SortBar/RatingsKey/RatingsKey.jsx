// import styles
import './RatingsKey.css'
// import hook
import useStaticEffect from '../../../hooks/useStaticEffect'

// pass in isLoading in order to determine if we should see the row flicker for new users
function RatingsKey  ({ isLoading }) {
    // set isActive as true with a fieldCount number of 1 for our static effect, 
    // saving it to two variable instances of staticEffect (1 & 2) in order for each effect to run independently with their own random timers
    const staticEffect1 = useStaticEffect ({ isActive: true, fieldCount: 1 })
    const staticEffect2 = useStaticEffect ({ isActive: true, fieldCount: 1 })
    return (
        // for className use a template literal to append 'row-flicker' to 'ratings-key__wrapper' if isLoading is true else leave as an empty string if false
        // for the style property add an animation delay that matches SortBar's animation delay
        <div className={`ratings-key__wrapper ${isLoading ? 'row-flicker' : ''}`} title="Guide for the colours chosen by ratings select and used on gamerows" style={{animationDelay: '6.3s'}}>
            {/* set a template literal to append 'static-lines' to 'field-wrapper' if staticEffect1 is equal to zero else leave as an empty string if false 
            and append 'static-colour' to 'field-wrapper' if staticEffect2 is equal to zero else leave as an empty string if false */}
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