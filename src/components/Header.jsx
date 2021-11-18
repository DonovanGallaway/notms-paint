import {Link} from 'react-router-dom'

const Header = (props) => {
    return (<>
    <h1>Canvas App</h1>
    <nav>
        <Link to='/'><div>Home</div></Link>
        <Link to='/draw'><div>App</div></Link>
        <Link to='/community'><div>Community</div></Link>
    </nav>
    </>)
}

export default Header