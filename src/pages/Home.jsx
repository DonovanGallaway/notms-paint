import { Link } from "react-router-dom"

const Home = (props) => {
    return <div className="landing">
        {/* Description */}
        <div>
            <h1>Drawing App</h1>
            <p>Express yourself with the draw app and create your very own masterpiece.</p>
        </div>

        {/* Features */}
        <div>
            <h2>Features</h2>
            <ul>
                <li>Adjust the color and width of your brush</li>
                <li>Use the fill tool to fill spaces with color.</li>
                <li>Refresh the canvas with the clear button.</li>
            </ul>
        </div>
        {/* Demo Video */}
        {/* Tutorial */}
        <h2>How to Use</h2>
        {/* Link to live app */}
        <div>
            <p>So, are you feeling creative?</p>
            <Link to="/draw">
                <button>Start Drawing</button>
            </Link>
        </div>
        {/* Meet the Engineers */}
        <div className="engineers-container">
            <h2>Meet the Engineers</h2>
            <div className="engineer">
                <h4>Donovan Gallaway</h4>
            </div>
            <div className="engineer">
                <h4>Sarah Carter</h4>
            </div>
        </div>

    </div>
}

export default Home