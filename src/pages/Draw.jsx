import {useRef, useEffect, useState} from 'react'
import Canvas from '../components/Canvas'

const Draw = (props) => {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  // Canvas config states
  const [lineConfig, setLine] = useState({lineCap: 'round'})
  const [strokeConfig, setStroke] = useState({strokeStyle: 'black'})
  const [widthConfig, setWidth] = useState({lineWidth: 5})



  const colorLine = (color) => {
    setStroke({
      strokeStyle: color
    })
  }

  const blueLine = () => {
    setStroke({
      strokeStyle: 'blue',
    })
  }

  
  return (
      <Canvas lineConfig={lineConfig} widthConfig={widthConfig} strokeConfig={strokeConfig} colorLine={colorLine} blueLine={blueLine} setStroke={setStroke}/>
  );
}


export default Draw;
