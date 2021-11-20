import {useRef, useEffect, useState} from 'react'

const Canvas = (props) => {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setTool] = useState({tool: 'draw'})

  const [penColor, setPenColor] = useState("black")
  const [penWidth, setPenWidth] = useState(5)

  const [canvasConfig, setConfig] = useState({
    lineCap: 'round',
    strokeStyle: penColor,
    lineWidth: penWidth
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

  const toolState = (tool) => {
    const newState = {...currentTool}
    newState.tool = tool
    setTool(newState)
  }

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    context.fillStyle = "rgb(236, 236, 236)"
    context.fillRect(0, 0, window.innerWidth - 60, window.innerHeight * 0.8)
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
    if (currentTool.tool==='draw'){
    setIsDrawing(true)
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    } else if (currentTool.tool==='fill'){
      ///////////////////////////////
      // Fill Tool Testing (Dev Only)
      ///////////////////////////////
      const canvas = canvasRef.current // gets the current canvas
      const context = canvas.getContext('2d') // accesses the context object
      var imgData = context.getImageData(0,0,canvas.width, canvas.height) // calls get image data method, renders an array of every pixel represented as an array where every four indices is an rgba value of a pixel
      // console.log(imgData)
      const {offsetX, offsetY} = nativeEvent // get mouse click
      // console.log(offsetX, offsetY)
      const pixelStack = [offsetX, offsetY] // set up an array with the starting pixel
      console.log(pixelStack)
    }
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
        <button onClick={() => toolState('fill')}>Fill Test</button>
        <button onClick={() => toolState('draw')}>Back to Draw</button>
        <input type="color" onInput={(event) => colorState(event.target.value)}/>
        <input type="range" min="2" max="75" defaultValue="5" onChange={(event) => strokeState(event.target.value)}/>
        <button onClick={clearCanvas}>Clear</button>
      <canvas
        //// Working drawing func
        onMouseDown={startDrawing}
        //// Dev func only
        // onMouseDown={fillTest}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
      </div>
  );
}

export default Canvas;
