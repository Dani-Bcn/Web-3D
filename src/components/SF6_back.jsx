import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/SF6_back.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Mat}
        position={[0, 75.128, 0]}
      />
    </group>
  )
}

useGLTF.preload('/SF6_back.gltf')