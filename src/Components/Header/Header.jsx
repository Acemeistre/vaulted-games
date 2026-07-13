import './Header.css'
import useStaticEffect from '../../hooks/useStaticEffect.js'

function Header ({ isLoading }) {
    const staticEffect1 = useStaticEffect ({ isActive: true, fieldCount: 1 })
    const staticEffect2 = useStaticEffect ({ isActive: true, fieldCount: 1 })

    return (
        <header className={`container ${isLoading ? 'row-flicker' : ''}`} style={{animationDelay: '0.3s'}}>
            <div className={`field-wrapper ${staticEffect1 === 0 ? 'static-lines' : ''} ${staticEffect2 === 0 ? 'static-colour' : ''}`}>
                <div className="header__title">
                    <h1 className="header__title-text">
                    Vaulted Games
                    </h1>
                </div>
            </div>
            <p className="header__description">
                Welcome to 'Vaulted Games'! <br/>The number 1 place to track organize and store your history of video games that you've played - at any time, on any device, throughout your own gaming adventures!
            </p>
        </header> 
    )
}

export default Header;