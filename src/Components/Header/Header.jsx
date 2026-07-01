import './Header.css'

function Header () {
    return (
        <header className="container">
            <div className="header__title">
                <h1 className="header__title-text">
                Vaulted Games
                </h1>
                </div>
            <p className="header__description">
                Welcome to 'Vaulted Games'! <br/>The number 1 place to track organize and store your history of video games that you've played - at any time, on any device, throughout your own gaming adventures!
            </p>
        </header> 
    )
}

export default Header;