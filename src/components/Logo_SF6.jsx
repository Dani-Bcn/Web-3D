import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Logo_SF6(props) {
  const { nodes, materials } = useGLTF('/logo_SF6.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh castShadow receiveShadow geometry={nodes.Extrude_1.geometry} material={materials.Mat} />
    </group>
  )
}

useGLTF.preload('/logo_SF6.gltf')