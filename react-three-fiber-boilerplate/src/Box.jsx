const Box = ({ position, name }) => {
  return (
    <mesh position={position} name={name}>
      <boxGeometry />
      <meshBasicMaterial color={0x00ff00} wireframe />
    </mesh>
  )
}

export default Box
