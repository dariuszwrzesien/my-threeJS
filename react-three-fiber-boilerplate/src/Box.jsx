import { useFrame } from '@react-three/fiber'
import { useRef, useState } from 'react'

const Box = ({ position, name }) => {
  const ref = useRef()
  const [hovered, setHovered] = useState(false)
  const [rotate, setRotate] = useState(false)

  useFrame((state, delta) => {
    if (rotate) {
      ref.current.rotation.x += 1 * delta
      ref.current.rotation.y += 0.5 * delta
      // ref.current.position.y = Math.sin(state.clock.getElapsedTime()) * 2
    }
  })
  return (
    <mesh
      ref={ref}
      position={position}
      name={name}
      scale={hovered ? [1.1, 1.1, 1.1] : [1, 1, 1]}
      onPointerDown={() => setRotate(true)}
      onPointerUp={() => setRotate(false)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}>
      <boxGeometry />
      <meshBasicMaterial color={hovered ? 0xff0000 : 0x00ff00} wireframe />
    </mesh>
  )
}

export default Box
