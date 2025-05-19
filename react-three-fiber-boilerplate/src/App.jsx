import {
  Stats,
  OrbitControls,
  Circle,
  Environment,
  Sphere,
  ContactShadows
} from '@react-three/drei'
import { Canvas, useLoader } from '@react-three/fiber'
import { Leva, useControls } from 'leva'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader'

function Env() {
  const { height, radius, scale, offset } = useControls('Ground', {
    height: { value: 10, min: 0, max: 100, step: 1 },
    radius: { value: 36, min: 0, max: 1000, step: 1 },
    scale: { value: 349, min: 0, max: 1000, step: 1 }
    // offset: { value: 0, min: -10, max: 10 }
  })
  return (
    <Environment
      files={['/img/little_paris_eiffel_tower_1k.hdr']}
      background
      ground={{
        height: height,
        radius: radius,
        scale: scale
        // offset: offset
      }}
    />
  )
}

function Model({ gltf }) {
  const {
    x,
    y,
    z,
    visible,
    color,
    metalness,
    roughness,
    clearcoat,
    clearcoatRoughness,
    transmission,
    ior,
    thickness
  } = useControls('Suzanne', {
    x: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    y: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    z: { value: 0, min: 0, max: Math.PI * 2, step: 0.01 },
    visible: true,
    color: { value: '#ffbc85' },
    metalness: { value: 0, min: 0, max: 1, step: 0.01 },
    roughness: { value: 0, min: 0, max: 1, step: 0.01 },
    clearcoat: { value: 1, min: 0, max: 1, step: 0.01 },
    clearcoatRoughness: { value: 0, min: 0, max: 1, step: 0.01 },
    transmission: { value: 1, min: 0, max: 1, step: 0.01 },
    ior: { value: 1.5, min: 0, max: 2, step: 0.01 },
    thickness: { value: 0.1, min: 0, max: 1, step: 0.01 }
  })

  return (
    <primitive
      object={gltf.scene}
      children-0-castShadow
      children-0-rotation={[x, y, z]}
      children-0-visible={visible}
      children-0-material-color={color}
      children-0-material-metalness={metalness}
      children-0-material-roughness={roughness}
      children-0-material-clearcoat={clearcoat}
      children-0-material-clearcoatRoughness={clearcoatRoughness}
      children-0-material-transmission={transmission}
      children-0-material-ior={ior}
      children-0-material-thickness={thickness}
    />
  )
}

function Light() {
  const { x, y, z, intensity, castShadow } = useControls('light', {
    x: { value: 3.3, min: 0, max: 100, step: 0.01 },
    y: { value: 1.0, min: 0, max: 100, step: 0.01 },
    z: { value: 4.4, min: 0, max: 100, step: 0.01 },
    intensity: { value: Math.PI * 4, min: 0, max: 50, step: 0.1 },
    castShadow: true
  })
  return (
    <directionalLight
      position={[x, y, z]}
      castShadow={castShadow}
      intensity={intensity}>
      <Sphere args={[0.25]} position={[x, y, z]}></Sphere>
    </directionalLight>
  )
}

export default function App() {
  const gltf = useLoader(GLTFLoader, '/models/my-scene.glb')

  return (
    <>
      <Canvas camera={{ position: [-8, 5, 8] }}>
        <Env />
        {/* <Light /> */}
        <Model gltf={gltf} />
        <ContactShadows
          scale={150}
          position={[0.33, -0.33, 0.33]}
          opacity={1.5}
        />
        <OrbitControls target={[0, 1, 0]} maxPolarAngle={Math.PI / 2} />
        <axesHelper args={[5]} />
        <Stats />
      </Canvas>
      <Leva collapsed />
    </>
  )
}
