import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Cubo_1_blue(props) {
 const { nodes, materials } = useGLTF('/lata_1_blue.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.cubo.geometry}
        material={materials['Mat.1']}
        position={[0, 64.4, 0]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.pintura_1.geometry}
        material={materials.Mat}
        position={[-0.011, 114.288, 1.378]}
        scale={[1.14, 3.72, 1]}
      />
    </group>
  )
}

useGLTF.preload('/lata_1_blue.gltf')
