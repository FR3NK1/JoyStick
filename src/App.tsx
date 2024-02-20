import { DndContext } from '@dnd-kit/core'
import { useState } from 'react'
import { Draggable } from './Draggable'
import './style.css'

const JoystickSize = 200

export default function App() {
  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  })

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        id='adiv'
        style={{
          width: `${JoystickSize}px`,
          height: `${JoystickSize}px`,
          backgroundColor: 'lightgray',
          borderRadius: '10%',
          position: 'relative',
        }}
      >
        <svg
          width='100%'
          height='100%'
          viewBox={`-${JoystickSize / 2} -${JoystickSize / 2} ${JoystickSize} ${JoystickSize}`}
          style={{ position: 'absolute' }}
          xmlns='http://www.w3.org/2000/svg'
        >
          <line
            x1='0'
            y1='0'
            x2={coordinates.x}
            y2={coordinates.y}
            style={{ stroke: 'gray', strokeWidth: (JoystickSize * 16) / 200 }}
          />
        </svg>
        <div
          style={{
            position: 'absolute',
            width: `${JoystickSize / 4}px`,
            height: `${JoystickSize / 4}px`,
            backgroundColor: 'gray',
            translate: '150% 150%',
            borderRadius: '50%',
          }}
        ></div>
        <DndContext
          onDragMove={({ delta }) => setCoordinates({ x: delta.x, y: delta.y })}
          onDragEnd={() => setCoordinates({ x: 0, y: 0 })}
        >
          <Draggable JoystickSize={JoystickSize} />
        </DndContext>
      </div>
    </div>
  )
}
