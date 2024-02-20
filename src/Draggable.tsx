import { useDraggable } from '@dnd-kit/core'
import { useEffect, useState } from 'react'

const findCircleIntersection = (r: number, x: number, y: number) => {
  let angle = Math.atan2(y, x) // Находим угол между осью x и точкой (x, y)
  let intersectX = r * Math.cos(angle) // Вычисляем x-координату точки на окружности
  let intersectY = r * Math.sin(angle) // Вычисляем y-координату точки на окружности
  return { x: intersectX, y: intersectY }
}

interface DraggableProps {
  JoystickSize: number
}

export function Draggable({ JoystickSize }: DraggableProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: 'draggable',
  })

  const [coordinates, setCoordinates] = useState({
    x: 0,
    y: 0,
  })

  useEffect(() => {
    let x = transform?.x
    let y = transform?.y
    if (x && y) {
      if (Math.sqrt(x * x + y * y) < JoystickSize / 2) {
        setCoordinates({ x, y })
      } else {
        setCoordinates(findCircleIntersection(JoystickSize / 2, x, y))
      }
    }
  }, [transform])

  useEffect(() => {
    if (!isDragging) {
      setCoordinates({ x: 0, y: 0 })
    }
  }, [isDragging])

  return (
    <div
      ref={setNodeRef}
      style={{
        transform: `translate3d(${coordinates.x}px, ${coordinates.y}px, 0)`,
        backgroundColor: '#FA5352',
        width: `${JoystickSize / 2}px`,
        height: `${JoystickSize / 2}px`,
        borderRadius: '50%',
        translate: '50% 50%',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      {...listeners}
      {...attributes}
    >
      {Math.round(coordinates.x)}, {Math.round(coordinates.y)}
    </div>
  )
}
