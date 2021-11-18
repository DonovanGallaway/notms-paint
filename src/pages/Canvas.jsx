import {useRef, useEffect, useState} from 'react'

const Canvas = (props) => {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)

  const [canvasConfig, setConfig] = useState({
    lineCap: 'round',
    strokeStyle: 'black',
    lineWidth: 5,
    current: ()=>{}
})


  // Color Mods
  const setContext = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d')
    context.lineCap = canvasConfig.lineCap
    context.strokeStyle = canvasConfig.strokeStyle
    context.lineWidth = canvasConfig.lineWidth
    contextRef.current = context;
  }

        const redState = () => {
            setConfig({
            lineCap: 'round',
            strokeStyle: 'red',
            lineWidth: 5,
            current: redState
        })
            setContext()
        }
        const blueState = () => {
            setConfig({
            lineCap: 'round',
            strokeStyle: 'blue',
            lineWidth: 5,
            current: blueState
        })
            setContext()
        }
        const greenState = () => {
            setConfig({
            lineCap: 'round',
            strokeStyle: 'green',
            lineWidth: 5,
            current: greenState
        })
            setContext()
        }
        const blackState = () => {
            setConfig({
            lineCap: 'round',
            strokeStyle: 'black',
            lineWidth: 5,
            current: blackState
        })
            setContext()
        }
        const whiteState = () => {
            setConfig({
            lineCap: 'round',
            strokeStyle: 'white',
            lineWidth: 5,
            current: whiteState
        })
            setContext()
        }
        const grayState = () => {
            setConfig({
            lineCap: 'round',
            strokeStyle: 'gray',
            lineWidth: 5,
            current: grayState
        })
            setContext()
        }


  useEffect(()=>{
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d')
    context.scale(2,2)
    canvasConfig.current()
    setContext()
    canvasConfig.current()
    setContext()
    
  }, [])

  const startDrawing = ({nativeEvent}) => {
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
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

  }
  return (
      <div className='canvas'>
        <button onClick={()=>{redState();redState()}}>Red Color</button>
        <button onClick={()=>blueState()}>Blue Color</button>
        <button onClick={()=>greenState()}>Green Color</button>
        <button onClick={()=>blackState()}>Black Color</button>
        <button onClick={()=>whiteState()}>Erase Color</button>
        <button onClick={()=>grayState()}>Gray Color</button>
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
