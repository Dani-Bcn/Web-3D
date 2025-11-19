"use client";
import { CanvasTexture } from "three";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
  MeshReflectorMaterial,
  Environment,
} from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import { gsap } from "gsap";

export default function MainScene() {
  const BodyRef = useRef();
  const boxRef = useRef();
   const [rotate, setRotate] = useState(true);
   console.log(rotate)

  const gradientTexture = useMemo(() => {
    if (typeof window === "undefined") return null;

    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1024;
    const ctx = canvas.getContext("2d");

    const gradient = ctx.createLinearGradient(
      canvas.width,
      canvas.height,
      0,
      0
    );
    gradient.addColorStop(0, "lch(30.92% 97.1 301.54)");
    gradient.addColorStop(1, "oklch(43.919% 0.17499 13.805)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return new CanvasTexture(canvas);
  }, []);

  const moveBoxRight = () => {
    if (boxRef.current) {
      gsap.to(boxRef.current.position, {
        x: boxRef.current.position.x + 2,
        duration: 1,
        ease: "power1.inOut",
      });
    }
  };

  const moveBoxLeft = () => {
    if (boxRef.current) {
      gsap.to(boxRef.current.position, {
        x: boxRef.current.position.x - 2,
        duration: 1,
        ease: "power1.inOut",
      });
    }
  }; 

  {
    !rotate
      ? useEffect(() => {
          const handleWheelRotate = (e) => {
            if (!boxRef.current) return;

            const speed = 0.0157; // Sensibilidad de la rotación

            // Animar rotación sobre su propio eje (Y)
            gsap.to(boxRef.current.rotation, {
              y: boxRef.current.rotation.y + e.deltaY * speed,
              duration: 0.5,
              ease: "power3.out",
            });
          };

          window.addEventListener("wheel", handleWheelRotate);
          return () => window.removeEventListener("wheel", handleWheelRotate);
        }, [rotate])
      : useEffect(() => {
          const handleWheelPosition = (e) => {
            if (!boxRef.current) return;

            const speed = 0.0157; // Sensibilidad del movimiento Z

            // Animar movimiento Z
            gsap.to(boxRef.current.position, {
              z: boxRef.current.position.z + e.deltaY * speed,
              duration: 0.5,
              ease: "power3.out",
            });
          };

          window.addEventListener("wheel", handleWheelPosition);
          return () => window.removeEventListener("wheel", handleWheelPosition);
        }, [rotate]);
  }

  return (
    <div className="w-screen h-screen flex justify-center" ref={BodyRef}>
      <div className="absolute top-4 z-10 w-full flex  justify-around">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={moveBoxRight}
        >
          Move box to left
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={()=>setRotate(!rotate)}
        >
          Rotate or move
        </button>
        <button
          onClick={moveBoxLeft}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Move Box Right
        </button>
      </div>
      <Canvas className="bg-red-200 z-0" shadows>
        <PerspectiveCamera makeDefault fov={10} position={[0, 2, -50]} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={true}
        />
        <Environment preset="city" />
      
        <spotLight position={[-2, 5, 20]} intensity={5} castShadow receiveShadow />
        <spotLight position={[2, 5, 20]} intensity={5} castShadow receiveShadow />
        <RoundedBox
          position={[0, 0, 0]}
          ref={boxRef}
          args={[2, 2, 2]}
          radius={0.1} // radio de la esquina
          smoothness={20} // suavizado
        >
          <meshStandardMaterial
            color="#102050"
            metalness={0.6}
            roughness={0.1}
          />
        </RoundedBox>

        <mesh
          receiveShadow
          castShadow
          rotation={[-Math.PI / 1, 0, 0]}
          position={[0, 0, 2]}
        >
          <planeGeometry args={[500, 500]} />
          <MeshReflectorMaterial
            blur={[350, 250]} // Menos blur → reflejos más definidos
            resolution={2048}
            mixBlur={2} // Reduce cuánto mezcla el blur con el reflejo
            mixStrength={3} // Aumenta la fuerza del reflejo
            roughness={2} // Superficie casi pulida
            depthScale={1.2} // Controla deformación; más bajo = reflejo más limpio
            minDepthThreshold={1.2}
            maxDepthThreshold={1.8}
            map={gradientTexture}
            metalness={0.2} // Mucho más metal, más brillo
          />
        </mesh>
        <mesh
          receiveShadow
          castShadow
          rotation={[-Math.PI / 2, 0, 0]}
          position={[0, -0.999, 2]}
        >
          <planeGeometry args={[500, 500]} />
          <MeshReflectorMaterial
            blur={[350, 50]} // Menos blur → reflejos más definidos
            resolution={2048}
            mixBlur={8} // Reduce cuánto mezcla el blur con el reflejo
            mixStrength={9} // Aumenta la fuerza del reflejo
            roughness={0.7} // Superficie casi pulida
            depthScale={1.2} // Controla deformación; más bajo = reflejo más limpio
            minDepthThreshold={0.4}
            maxDepthThreshold={1.8}
            map={gradientTexture}
            metalness={0.9} // Mucho más metal, más brillo
          />
        </mesh>
      </Canvas>
    </div>
  );
}
