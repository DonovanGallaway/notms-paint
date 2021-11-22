import {useRef, useEffect, useState} from 'react'

// For use in converting hex to rgb for fill
// I didn't write this. I found it on Stack Overflow.
// https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
const hexToRgb = hex =>
hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i
          ,(m, r, g, b) => '#' + r + r + g + g + b + b)
  .substring(1).match(/.{2}/g)
  .map(x => parseInt(x, 16))

const Canvas = (props) => {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [currentTool, setTool] = useState({tool: 'draw'})

  const [penColor, setPenColor] = useState("#000000")
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
    clearCanvas()
  }, [])

  const startDrawing = ({nativeEvent}) => {
    if (currentTool.tool==='draw'){
    setIsDrawing(true)
    const {offsetX, offsetY} = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    } else if (currentTool.tool==='fill'){
      
      ///////////////////////////////////////////////////////////////////////////////////////
      // Fill Tool 
      ///////////////////////////////////////////////////////////////////////////////////////
      const targetColor = hexToRgb(canvasConfig.strokeStyle) // Convert hex to rgb to interact with bitmap
      // console.log('hex color is', canvasConfig.strokeStyle)
      // console.log('targetColor is', targetColor)
      const fillR = targetColor[0]
      const fillG = targetColor[1]
      const fillB = targetColor[2]
      const canvas = canvasRef.current // gets the current canvas
      const context = canvas.getContext('2d') // accesses the context object
      var imgData = context.getImageData(0,0,canvas.width, canvas.height) // calls get image data method, renders an array of every pixel represented as an array where every four indices is an rgba value of a pixel
      // console.log(imgData)
      const {offsetX, offsetY} = nativeEvent // get mouse click
      // console.log(offsetX, offsetY)
      const pixelStack = [[offsetX, offsetY]] // set up an array with the starting pixel
      
      //////////////////////////////////////////////////////////
      // Function to match color
      //////////////////////////////////////////////////////////
      const matchStartColor = (pixelPos,testPos) => // where pixelPos is the array index of the currently selected pixel
        {
          const startR = imgData.data[pixelPos] // Starting R value
          const startG = imgData.data[pixelPos+1] // Starting G value
          const startB = imgData.data[pixelPos+2] // Starting B value

          // Iterates over the aray, going through the entirety of the width * 4 (due to each pixel being represented by 4 values [rgba])

          // Tests if next line up is the same color
          const r = imgData.data[testPos];	
          const g = imgData.data[testPos+1];	
          const b = imgData.data[testPos+2];

          // console.log(`startR is ${startR}, r is ${r}, and the boolean is ${startR===r}`)
          // console.log(`startG is ${startG}, g is ${g}, and the boolean is ${startG===g}`)
          // console.log(`startB is ${startB}, b is ${b}, and the boolean is ${startB===b}`)
          
          return (r === startR && g === startG && b === startB);
        }

        const matchTargetColor = (pixelPos) => {
          const startR = imgData.data[pixelPos]
          const startG = imgData.data[pixelPos+1]
          const startB = imgData.data[pixelPos+2]

          return (startR === fillR && startG === fillG && startB === fillB)
        }
        //////////////////////////////////////////////////////////
        // Function to change color
        //////////////////////////////////////////////////////////
        const colorPixel = (pixelPos) => {
          imgData.data[pixelPos] = fillR
          imgData.data[pixelPos+1] = fillG
          imgData.data[pixelPos+2] = fillB
          imgData.data[pixelPos+3] = 255
        }
        //////////////////////////////////////////////////////////
        // Body of Function
        //////////////////////////////////////////////////////////
        console.log('working')
        while(pixelStack.length) // while loop and this pop is a clever way of iterating over an unknown number of items
        {
          var newPos, x, y, pixelPos, reachLeft, reachRight
          newPos = pixelStack.pop();
          x = newPos[0]
          y = newPos[1]
          // console.log(x,y)

          pixelPos = (y*canvas.width + x) * 4
          while(y-- >= 0 && matchStartColor(pixelPos, pixelPos - canvas.width * 4) && !matchTargetColor(pixelPos))
          {
            pixelPos -= canvas.width * 4;
          }
          pixelPos += canvas.width * 4;
          ++y;
          

          reachLeft = false;
          reachRight = false;
          while (y++ < canvas.height -1 && matchStartColor(pixelPos, pixelPos + canvas.width * 4) && !matchTargetColor(pixelPos)){
            colorPixel(pixelPos)
            if (x < canvas.width){
              if(!matchStartColor(pixelPos, pixelPos+4)){
                  pixelStack.push([x+1, y])
            }
            if (x>0){
              if(!matchStartColor(pixelPos, pixelPos-4)){
                pixelStack.push([x-1, y])
            
              }  
            }
          }      
            pixelPos += canvas.width * 4          
        }
        

    }
    context.putImageData(imgData, 0,0)
        console.log('all done')
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


  //////////////////////////////////////////////////////////////////
  // Circle Tool
  //////////////////////////////////////////////////////////////////

  return (
      <div className='canvas'>
        <button onClick={() => toolState('fill')}>Fill</button>
        <button onClick={() => toolState('draw')}>Back to Draw</button>
        <input type="color" onInput={(event) => {colorState(event.target.value)}}/>
        <input type="range" min="2" max="75" defaultValue="5" onChange={(event) => strokeState(event.target.value)}/>
        <button onClick={clearCanvas}>Clear</button>
      {currentTool.tool === 'fill'
      ? <canvas onClick={startDrawing} ref={canvasRef}/>
      : <canvas
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      ref={canvasRef}
    />
      }
      </div>
  );
}

export default Canvas
