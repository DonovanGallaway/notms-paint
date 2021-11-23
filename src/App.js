import Header from './components/Header'
import Canvas from './pages/Canvas'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Community from './pages/Community'
import Footer from './components/Footer'
import {useState} from 'react'
import './App.css'

function App() {

  const URL = 'https://scribble-canvas.herokuapp.com/canvas'
  const [gallery, setGallery] = useState(null)
  const getGallery = async () => {
    const response = await fetch(URL)
    const data = await response.json()
    setGallery(data)
}

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/draw' element={<Canvas URL={URL} getGallery={getGallery}/>}/>
        <Route exact path='/community' element={<Community URL={URL} gallery={gallery} getGallery={getGallery}/>}/>
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
