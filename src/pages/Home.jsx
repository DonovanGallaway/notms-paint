import { Link } from "react-router-dom"
import {Fade} from "react-awesome-reveal"

const Home = (props) => {

    return <div className="landing">
        {/* Description */}
        <Fade>
            <div className="intro">
                <h1>Scribble.</h1>
                <p>Express yourself and create your very own masterpiece.</p>
            </div>
        </Fade>

        {/* Features */}
        <Fade direction="left" delay="100" triggerOnce>
            <div className="features">
                <h2>Features</h2>
                <ul>
                    <li>Adjust the color and width of your brush</li>
                    <li>Use the fill tool to fill spaces with color.</li>
                    <li>Refresh the canvas with the clear button.</li>
                </ul>
            </div>
        </Fade>

        {/* Demo Video */}
        {/* Tutorial */}
        <Fade direction="right" delay="200" triggerOnce>
            <div className="demo">
                <h2>How to Use</h2><br/>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/PUAebzoZHZY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        </Fade>
        
        {/* Link to live app */}
        <Fade direction="left" triggerOnce>
            <div className="start">
                <p>So, are you feeling creative?</p>
                <Link to="/draw">
                    <button style={{fontSize: "36px", fontWeight: "bold"}}>Start Drawing</button>
                </Link>
            </div>
        </Fade>

        {/* Meet the Engineers */}
        <Fade>
        <div className="engineers-container">
            <h2>Meet the Engineers</h2>
            <div className="engineer-flex">
                <div className="engineer">
                    <h4>Donovan Gallaway</h4>
                    <img src="https://i.imgur.com/g1hVCnu.png" alt="donovan gallaway"/>
                    <div className="socials">
                        <a href="https://www.linkedin.com/in/donovan-gallaway/">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/DonovanGallaway">
                            <i class="fab fa-github-square"></i>
                        </a>
                    </div>
                </div>
                <div className="engineer">
                    <h4>Sarah Carter</h4>
                    <img src="https://imgur.com/dlPUNsJ.png" alt="picture of sarah carter" />
                    <div className="socials">
                        <a href="https://www.linkedin.com/in/scarterwebdev/">
                            <i class="fab fa-linkedin"></i>
                        </a>
                        <a href="https://github.com/sarahecarter">
                            <i class="fab fa-github-square"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>
        </Fade>


                {/* Link to Repo */}
        <Fade direction="right" triggerOnce>
           <a href="https://github.com/DonovanGallaway/notms-paint" className="repo-link">Visit the project repo on GitHub <i class="fab fa-github-square"></i></a>
        </Fade>
    </div>
}

export default Home