import {useRef, useEffect, useState} from 'react'

const Canvas = (props) => {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const [canvasConfig, setConfig] = useState({
    lineCap: 'round',
    strokeStyle: 'black',
    lineWidth: 5
})

  const setContext = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    context.lineCap = canvasConfig.lineCap
    context.strokeStyle = canvasConfig.strokeStyle
    context.lineWidth = canvasConfig.lineWidth
    contextRef.current = context;
  }

  const colorState = (color) => {
    const newState = {...canvasConfig}
    newState.strokeStyle = color;
    setConfig(newState)
    setContext()
  }

  const strokeState = (width) => {
    const newState = {...canvasConfig}
    newState.lineWidth = width;
    setConfig(newState)
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
    context.lineCap = 'round'
    context.strokeStyle = 'black'
    context.lineWidth = 5
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
    colorState()
    strokeState()
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
  }

  return (
      <div className='canvas'>
        <button onClick={() => colorState("red")}>Red Color</button>
        <button onClick={() => colorState("green")}>Green Color</button>
        <button onClick={() => colorState("blue")}>Blue Color</button>
        <button onClick={() => colorState("yellow")}>Yellow Color</button>
        <button onClick={() => strokeState(20)}>Thick</button>
        <button onClick={() => strokeState(5)}>Regular</button>
        <button onClick={() => strokeState(2)}>Thin</button>
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
