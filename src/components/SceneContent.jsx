import { useTexture,MeshReflectorMaterial } from "@react-three/drei";

export default function SceneContent() {
  const imageTexture = useTexture("/SF6_back.png");
  const imageTexture2 = useTexture("/SF6_back_2.png");

  return (
    <>
        <mesh
          receiveShadow
          castShadow
          rotation={[-Math.PI / -1, 0, 3.15]}
          position={[0, 1.2, 2]}
        >
          <planeGeometry args={[25, 16]} />
          <MeshReflectorMaterial          
            blur={[350, 250]} // Menos blur → reflejos más definidos
            resolution={2048}
            mixBlur={100} // Reduce cuánto mezcla el blur con el reflejo
            mixStrength={5} // Aumenta la fuerza del reflejo
            roughness={1} // Superficie casi pulida
            depthScale={1.2} // Controla deformación; más bajo = reflejo más limpio
            minDepthThreshold={1.8}
            maxDepthThreshold={2.5}
            map={imageTexture}
            metalness={0.1} // Mucho más metal, más brillo
          />
        </mesh>
        <mesh
          receiveShadow
          castShadow
          rotation={[-Math.PI / 2, 0, 3.1]}
          position={[0, -1, -5]}
        >
          <planeGeometry args={[25, 20]} />
          <MeshReflectorMaterial
            blur={[550, 250]} // Menos blur → reflejos más definidos
            resolution={2048}
            mixBlur={5} // Reduce cuánto mezcla el blur con el reflejo
            mixStrength={10} // Aumenta la fuerza del reflejo
            roughness={0.9} // Superficie casi pulida
            depthScale={1.2} // Controla deformación; más bajo = reflejo más limpio
            minDepthThreshold={0.4}
            maxDepthThreshold={1.8}
           map={imageTexture2}
            metalness={0.2} // Mucho más metal, más brillo
          />
        </mesh>
    </>
  );
}
