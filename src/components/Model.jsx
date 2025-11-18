import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export function Model(props) {
  const { nodes, materials } = useGLTF('/Escudo_fcb.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube6.geometry}
        material={materials['Mat.2']}
        position={[273.157, -119.734, 44.363]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube3.geometry}
        material={materials['Mat.2']}
        position={[-264.787, -121.582, 44.363]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube5.geometry}
        material={materials['Mat.2']}
        position={[93.1, -160.08, 44.363]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube4.geometry}
        material={materials['Mat.2']}
        position={[-92.621, -160.08, 44.363]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube2.geometry}
        material={materials.Mat}
        position={[179.989, -157.863, 54.45]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube1.geometry}
        material={materials.Mat}
        position={[0.303, -175.971, 54.45]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube.geometry}
        material={materials.Mat}
        position={[-179.384, -160.08, 54.45]}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Sphere.geometry}
        material={materials['Mat.6']}
        position={[0, -165.018, 28.942]}
      />
      <group position={[0, 0, -18.646]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.FCB_extrusion.geometry}
          material={materials['Mat.4']}
        />
        <group position={[0, 0, 142.368]}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Extrude3.geometry}
            material={materials['Mat.4']}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Extrude2.geometry}
            material={materials['Mat.4']}
          />
        </group>
      </group>
      <group position={[110.492, 188.662, 32.113]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube4_1.geometry}
          material={materials.Mat}
          position={[120.244, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube3_1.geometry}
          material={materials.Mat}
          position={[58.413, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube2_1.geometry}
          material={materials.Mat}
          position={[-3.418, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube1_1.geometry}
          material={materials.Mat}
          position={[-64.747, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={materials['Mat.6']}
          position={[-110.492, 0, 0]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube5_1.geometry}
          material={materials['Mat.1']}
          position={[40.996, 0, -19.515]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube6_1.geometry}
          material={nodes.Cube6_1.material}
          position={[-264.749, 3.905, -19.515]}
        />
      </group>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Extrude_1.geometry}
        material={materials.Mat}
        position={[-135.748, 157.397, -40.148]}
      />
      <group position={[0, 0, 95.836]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['Extrude1-Mat6'].geometry}
          material={materials['Mat.6']}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes['Extrude1-Mat4'].geometry}
          material={materials['Mat.4']}
        />
      </group>
      <group position={[0, 0, -194.005]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Extrude1_1.geometry}
          material={materials['Mat.6']}
          position={[0, -155.992, 233.934]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Extrude_2.geometry}
          material={materials['Mat.6']}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/Escudo_fcb.gltf')
