import Header from './components/Header'
import Canvas from './pages/Canvas'
import {Routes, Route} from 'react-router-dom'
import Home from './pages/Home'
import Community from './pages/Community'
import './App.css'

function App() {

  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/draw' element={<Canvas/>}/>
        <Route exact path='/community' element={<Community/>}/>
      </Routes>
      <h1>Footer</h1>
    </div>
  );
}

export default App;
