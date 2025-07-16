import { Canvas, useFrame, useThree } from '@react-three/fiber'
import {
  OrbitControls,
  Environment,
  ContactShadows,
  Center
} from '@react-three/drei'
import { Model } from './Shoe'
import Button from './Button'
import { Vector3 } from 'three'

function Rig() {
  const { camera, mouse } = useThree()
  const vec = new Vector3()
  useFrame(() => {
    vec.set(mouse.x, mouse.y, camera.position.z)
    camera.position.lerp(vec, 0.025)
    camera.lookAt(0, 0, 0)
  })
}

export default function App() {
  return (
    <Canvas shadows camera={{ position: [0, 0, 10] }}>
      <Environment preset="forest" background />
      <Center>
        {[...Array(5).keys()].map((x) =>
          [...Array(3).keys()].map((y) => (
            <Button key={x + y * 5} position={[x * 2.5, y * 2.5, 0]} />
          ))
        )}
      </Center>
      <Rig />
    </Canvas>
  )
}
