import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import useKeyboard from './useKeyboard'

export default function Box2(props) {
  const ref = useRef()
  const keyMap = props.keyMap
  const [selected, setSelected] = useState(false)

  useFrame((_, delta) => {
    if (!selected) return

    keyMap['KeyA'] && (ref.current.position.x -= 1 * delta)
    keyMap['KeyD'] && (ref.current.position.x += 1 * delta)
    keyMap['KeyW'] && (ref.current.position.z -= 1 * delta)
    keyMap['KeyS'] && (ref.current.position.z += 1 * delta)
  })

  return (
    <mesh ref={ref} {...props} onClick={() => setSelected(!selected)}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe={!selected} />
    </mesh>
  )
}
