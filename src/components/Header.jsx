import {Link} from 'react-router-dom'

const Header = (props) => {


    const handleClick = () => {
        const nav = document.querySelector('nav')
        if (nav.className === "hide") {
            nav.className = "show";
        }
        else if (nav.className === "show") {
            nav.className = "hide";
        }
    }

    return ( 
    <div className="header">
        <Link to="/">
            <h1 id="title">Scribble.</h1>
        </Link>
        <i className="fas fa-bars" onClick={handleClick}></i>
        <nav className="hide">
            <Link to='/'><div>Home</div></Link>
            <Link to='/draw'><div>App</div></Link>
            <Link to='/community'><div>Community</div></Link>
        </nav>
    </div>
    )
}

export default Header