import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

function PortalShader() {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={meshRef}>
      <circleGeometry args={[2, 64]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertex}
        fragmentShader={fragment}
        uniforms={{
          uTime: { value: 0 },
          uColor: { value: new THREE.Color("#6c00ff") },
        }}
        transparent
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

const vertex = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vec3 pos = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
  }
`;

const fragment = `
  uniform float uTime;
  uniform vec3 uColor;
  varying vec2 vUv;

  void main() {
    float dist = distance(vUv, vec2(0.5));
    float glow = smoothstep(0.3, 0.0, dist);
    float pulse = 0.5 + 0.5 * sin(uTime * 3.0);
    vec3 color = mix(vec3(0.0), uColor, glow * pulse);
    gl_FragColor = vec4(color, glow * pulse);
  }
`;

export default function PortalScene() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.2} />
      <pointLight position={[5, 5, 5]} intensity={1} color={"#00ffe7"} />
      <PortalShader />
    </Canvas>
  );
}
