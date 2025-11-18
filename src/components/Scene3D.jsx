"use client";
import { Model } from "../components/Model";
import { CanvasTexture } from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  MeshReflectorMaterial,
  Box,
  Sphere,
  Torus,
  Cone,
  Cylinder,
  Dodecahedron,
  Stars,
  Grid,
  Float,
  Sparkles,
  Environment,
} from "@react-three/drei";
import { useRef, useState, useMemo, useEffect } from "react";

/* // Componente de caja animada simple
function AnimatedBox(props) {
  const [hovered, setHover] = useState(false);
  const [clicked, setClick] = useState(false);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <Box
      ref={meshRef}
      {...props}
      scale={clicked ? 1.5 : 1}
      onClick={() => setClick(!clicked)}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
    >
      <meshStandardMaterial
        color={hovered ? "hotpink" : "orange"}
        emissive={hovered ? "hotpink" : "orange"}
        emissiveIntensity={0.2}
      />
    </Box>
  );
}

// Esfera flotante simple
function FloatingSphere(props) {
  const [hovered, setHover] = useState(false);

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere
        {...props}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <meshStandardMaterial
          color={hovered ? "cyan" : "blue"}
          wireframe={hovered}
          emissive={hovered ? "cyan" : "blue"}
          emissiveIntensity={0.3}
        />
      </Sphere>
    </Float>
  );
}

// Toro con sparkles simple
function SparklingTorus(props) {
  const [hovered, setHover] = useState(false);

  return (
    <group {...props}>
      <Torus
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        args={[1, 0.4, 16, 100]}
      >
        <meshStandardMaterial
          color={hovered ? "yellow" : "purple"}
          emissive={hovered ? "yellow" : "purple"}
          emissiveIntensity={0.3}
        />
      </Torus>
      {hovered && <Sparkles count={20} scale={[2, 2, 2]} size={4} speed={1} />}
    </group>
  );
}

// Cono simple
function SimpleCone(props) {
  const [hovered, setHover] = useState(false);
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
    }
  });

  return (
    <Cone
      ref={meshRef}
      {...props}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      args={[0.8, 1.5, 8]}
    >
      <meshStandardMaterial
        color={hovered ? "lime" : "green"}
        emissive={hovered ? "lime" : "green"}
        emissiveIntensity={0.3}
      />
    </Cone>
  );
}

// Cilindro simple
function SimpleCylinder(props) {
  const [hovered, setHover] = useState(false);

  return (
    <Cylinder
      {...props}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      args={[0.6, 0.6, 2, 8]}
    >
      <meshStandardMaterial
        color={hovered ? "red" : "darkred"}
        metalness={0.8}
        roughness={0.2}
      />
    </Cylinder>
  );
}

// Dodecaedro simple
function SimpleDodecahedron(props) {
  const [hovered, setHover] = useState(false);

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
      <Dodecahedron
        {...props}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        args={[1.2]}
      >
        <meshStandardMaterial
          color={hovered ? "white" : "gray"}
          metalness={0.9}
          roughness={0.1}
          emissive={hovered ? "white" : "purple"}
          emissiveIntensity={0.3}
        />
      </Dodecahedron>
    </Float>
  );
} */

/* Funcion rotar el escudo */
export function RotatingEscudo({ rotating, ...props }) {
  const ref = useRef();

  useFrame((state, delta) => {
    if (ref.current && rotating) {
      ref.current.rotation.y += delta * 0.8;
    }
  });
 


  return (
    <group ref={ref} {...props}>
      <Model />
    </group>
  );
}
export default function Scene3D() {
  const [rotate, setRotate] = useState(true);
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

  const [shieldScale, setShieldScale] = useState(0.005);
  useEffect(() => {
    function handleWheel(e) {
      setShieldScale((prev) => {
        let newScale = prev + e.deltaY * -0.00001; // sensibilidad del scroll
        newScale = Math.min(Math.max(newScale, 0.002), 0.02); // límites
        return newScale;
      });
    }

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);
  const cameraRef = useRef();

 
  return (
    <div className="w-full h-screen bg-gradient-to-b from-purple-900 via-blue-900 to-black">
      <Canvas
        camera={{ position: [0, 0, 12], fov: 90 }}
        onCreated={(state) => (cameraRef.current = state.camera)}
      >
        {/*  <Environment preset="night" /> */}

        {/* Iluminación básica pero efectiva */}
        <ambientLight intensity={0.4} />
        {/*  <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="cyan" /> */}
        <directionalLight position={[0, 0.5, 8]} intensity={1} castShadow />
        <spotLight
          position={[0, 10, 0]}
          angle={0.3}
          penumbra={1}
          intensity={0.8}
          color="yellow"
        />
        {/*Escudo*/}
        <RotatingEscudo
          rotating={false}
          scale={[shieldScale, shieldScale, shieldScale]}
          position={[0, 0, 8]}
        />

        {/* Estrellas de fondo */}
        <Stars
          radius={100}
          depth={50}
          count={2000}
          factor={4}
          saturation={0}
          fade
          speed={1}
        />

        {/* Objetos 3D simples pero interactivos */}
        <group position={[0, 0, 8]}>
          {/*    <AnimatedBox position={[-5, 2, 0]} rotation={[0.5, 0.5, 0]} />
          <FloatingSphere position={[-2, -2, 0]} />
          <SparklingTorus position={[1, 3, 0]} rotation={[1, 1, 0]} />
          <SimpleCone position={[4, -2, 0]} />
          <SimpleCylinder position={[7, 2, 0]} />
          <SimpleDodecahedron position={[0, 0, -3]} scale={1.2} />
          
          */}
        </group>

        {/* Controles de cámara */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          minDistance={5}
          maxDistance={25}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={-Math.PI / 2}
          enableDamping={true}
          dampingFactor={0.05}
          autoRotate={false}
          autoRotateSpeed={0.5}
        /> 
        <mesh rotation={[-Math.PI / 0.1, 0, 0]} position={[0, 0, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[30, 10]} // Menos blur → reflejos más definidos
            resolution={2048}
            mixBlur={0} // Reduce cuánto mezcla el blur con el reflejo
            mixStrength={0} // Aumenta la fuerza del reflejo
            roughness={1} // Superficie casi pulida
            depthScale={1.2} // Controla deformación; más bajo = reflejo más limpio
            minDepthThreshold={0.4}
            maxDepthThreshold={1.4}
            map={gradientTexture ?? undefined}
            metalness={0.5} // Mucho más metal, más brillo
          />
        </mesh>
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
          <planeGeometry args={[50, 50]} />
          <MeshReflectorMaterial
            blur={[500, 100]} // Menos blur → reflejos más definidos
            resolution={2048}
            mixBlur={3} // Reduce cuánto mezcla el blur con el reflejo
            mixStrength={200} // Aumenta la fuerza del reflejo
            roughness={0.5} // Superficie casi pulida
            depthScale={0.1} // Controla deformación; más bajo = reflejo más limpio
            minDepthThreshold={0.8}
            maxDepthThreshold={5}
            map={gradientTexture ?? undefined}
            metalness={0.9} // Mucho más metal, más brillo
          />
        </mesh>
      </Canvas>

      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white bg-linear-to-r to-[#7c492067]  from-[#207c2f44]   backdrop-blur-sm p-6 rounded-xl max-w-sm">
        <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
          Escena 3D Interactiva
        </h1>
        {/*  <div className="space-y-2 text-sm">
          <p className="opacity-90">
            🎮 <span className="font-semibold">Interacción:</span> Clic y hover
            en objetos
          </p>
          <p className="opacity-90">
            🎥 <span className="font-semibold">Cámara:</span> Arrastra para
            rotar, scroll para zoom
          </p>
          <p className="opacity-90">
            ✨ <span className="font-semibold">Efectos:</span> Animaciones,
            sparkles, float
          </p>
          <p className="opacity-90">
            🌟 <span className="font-semibold">Componentes:</span> 6 objetos 3D
            únicos
          </p>
        </div> */}
        {/*      <button
        onClick={() => setRotate(!rotate)}
        className="mt-3 px-4 py-2 bg-purple-600 hover:bg-purple-700 transition text-white rounded-lg"
      >
        {rotate ? "⏸️ Parar rotación" : "▶️ Activar rotación"}
      </button> */}
      </div>

      {/* Contador de objetos 
      <div className="absolute top-4 right-4 text-white bg-black bg-opacity-60 backdrop-blur-sm p-4 rounded-xl">
        <div className="text-center">
          <div className="text-2xl font-bold text-purple-400">6</div>
          <div className="text-xs opacity-80">Objetos 3D</div>
        </div>
      </div>*/}
    </div>
  );
}
