import {useRef, useEffect, useState} from 'react'
import ReactDOM, { render } from 'react-dom'

const Canvas = (props) => {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const setContext = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    context.lineCap = props.lineConfig.lineCap
    context.strokeStyle = props.strokeConfig.strokeStyle
    context.lineWidth = props.widthConfig.lineWidth
    contextRef.current = context;
  }

  const handleRed = () => {
      props.colorLine('red')
      setContext()
  }

  const handleBlue = () =>{
      props.blueLine()
      setContext()
  }

  useEffect(()=>{
    // variables to store width of canvas
    const width = window.innerWidth - 60;
    const height = window.innerHeight * 0.8;

    const canvas = canvasRef.current;
    canvas.width = width;
    canvas.height = height;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    canvas.style.border = "1px solid black";

    const context = canvas.getContext('2d')
    context.lineCap = props.lineConfig.lineCap
    context.strokeStyle = props.strokeConfig.strokeStyle
    context.lineWidth = props.widthConfig.lineWidth
    contextRef.current = context;
  }, [])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent
    setIsDrawing(true)
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return
    }
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
  }

  
  return (
      <div className='canvas'>
          <button onClick={()=>{props.setStroke({strokeStyle: 'red'})}}>Red Color</button>
          <button onClick={handleBlue}>Blue Color</button>
      <canvas
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      </div>
  );
}

export default Canvas;
