"use client";
import { CanvasTexture } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  PerspectiveCamera,
  RoundedBox,
  MeshReflectorMaterial,
  Environment,
} from "@react-three/drei";
import { useRef, useMemo, useEffect, useState } from "react";
import { gsap } from "gsap";
import * as THREE from "three";
import SceneContent from "./SceneContent";
import { Cubo_1 } from "./Cubo_1";
import { Cubo_1_blue } from "./Cubo_1_blue";
import { Cubo_1_yellow } from "./Cubo_1_yellow";
import Draggable from "./Draggable";
import { Logo_SF6 } from "./Logo_SF6";

export default function MainScene() {
  const BodyRef = useRef();
  const boxRef = useRef();
  const [rotate, setRotate] = useState(true);
  console.log(rotate);

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
    gradient.addColorStop(0, "orange");
    gradient.addColorStop(1, "blue");

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
  const rotateBoxLeft = () => {
    if (boxRef.current) {
      gsap.to(boxRef.current.rotation, {
        x: boxRef.current.rotation.x - 2,
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
  const controlsRef = useRef();

  const limitLeft = -5;
  const limitRight = 5;

  return (
    <div className="w-screen h-screen flex justify-center" ref={BodyRef}>
      <div className="absolute top-4 z-10 w-full flex  justify-around">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={moveBoxRight}
        >
          Move box to left
        </button>
        <div className="text-white flex flex-col items-center">
          <div>Arriba</div>
          <div>Abajo</div>
          <div>
            <div>Derecha</div>
            <div>Izquierda</div>
          </div>
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => rotateBoxLeft()}
        >
          rotate ⋎
        </button>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setRotate(!rotate)}
        >
          Rotate or move
        </button>
        <button
          onClick={moveBoxLeft}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Move box to Right
        </button>
      </div>
      <Canvas
        className="bg-red-200 z-0"
        shadows={{
          type: THREE.PCFSoftShadowMap,
        }}
      >
       
        <PerspectiveCamera
          makeDefault
          fov={15}
          rotation={[0, 0, 0]}
          position={[0, 9, -45]}
        />
        <OrbitControls
          ref={controlsRef}
          enableZoom={false}
          enablePan={true}
          enableRotate={true}
          minDistance={10}
          maxDistance={50}
          maxPolarAngle={Math.PI / 2.3}
          minPolarAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / -1.02}
          maxAzimuthAngle={Math.PI / -1.02}
        />
        <ambientLight intensity={1} />
        <spotLight
          position={[20, 5, 0]}
          intensity={1500}
          angle={0.5}
          penumbra={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00005}
        />
        <spotLight
          position={[-20, 5, 0]}
          intensity={1500}
          angle={0.5}
          penumbra={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00005}
        />
        <spotLight
          position={[-2, 5, -20]}
          intensity={1500}
          angle={0.5}
          penumbra={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-bias={-0.00005}
        />
        <Logo_SF6
          ref={boxRef}
          scale={[0.007, 0.007, 0.007]}
          position={[0, 2, -5]}
          rotation={[0, 6.3, 0]}
        />

        <Cubo_1 scale={[0.01, 0.01, 0.01]} position={[4.5, -1.1, -2]} />
        <Cubo_1_blue scale={[0.01, 0.01, 0.01]} position={[6, -1.1, -1]} />
        <Cubo_1_yellow scale={[0.01, 0.01, 0.01]} position={[7.5, -1.1, -3]} />
        {/*   <RoundedBox
          castShadow
          position={[0, 0, 0]}
         
          args={[2, 2, 2]}
          radius={0.1} // radio de la esquina
          smoothness={20} // suavizado
        >
          <meshStandardMaterial
            color="#102050"
            metalness={0.6}
            roughness={0.1}
          /> 
        </RoundedBox>*/}
        {/* Coger objetos mouse 
           <Draggable>  
       
        </Draggable> */}
        <SceneContent />
        {/*      <mesh
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
        </mesh>*/}
      </Canvas>
    </div>
  );
}
