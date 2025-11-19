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
          position={[0, 1.5, 0]}
        >
          <planeGeometry args={[30, 15]} />
          <MeshReflectorMaterial          
            blur={[350, 250]} // Menos blur → reflejos más definidos
            resolution={2048}
            mixBlur={100} // Reduce cuánto mezcla el blur con el reflejo
            mixStrength={6} // Aumenta la fuerza del reflejo
            roughness={0.5} // Superficie casi pulida
            depthScale={1.2} // Controla deformación; más bajo = reflejo más limpio
            minDepthThreshold={1.8}
            maxDepthThreshold={2.9}
            map={imageTexture}
            metalness={0.1} // Mucho más metal, más brillo
          />
        </mesh>
        <mesh
          receiveShadow
          castShadow
          rotation={[-Math.PI / 2, 0, 3.1]}
          position={[0, -1, -5.5]}
        >
          <planeGeometry args={[30, 20]} />
          <MeshReflectorMaterial
            blur={[550, 250]} // Menos blur → reflejos más definidos
            resolution={2048}
            mixBlur={50} // Reduce cuánto mezcla el blur con el reflejo
            mixStrength={20} // Aumenta la fuerza del reflejo
            roughness={0.9} // Superficie casi pulida
            depthScale={1.2} // Controla deformación; más bajo = reflejo más limpio
            minDepthThreshold={0.8}
            maxDepthThreshold={1.1}
           map={imageTexture2}
            metalness={0.2} // Mucho más metal, más brillo
          />
        </mesh>
    </>
  );
}
