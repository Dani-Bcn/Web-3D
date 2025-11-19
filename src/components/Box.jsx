import { useRef, useEffect } from "react";
import gsap from "gsap";

export default function BoxComponent(props) {
  const meshRef = useRef();

  useEffect(() => {
    const handleWheel = (e) => {
      if (!meshRef.current) return;

      const speed = 0.0157; // Sensibilidad de la rotación

      // Animar rotación sobre su propio eje (Y)
      gsap.to(meshRef.current.rotation, {
        y: meshRef.current.rotation.y + e.deltaY * speed,
        duration: 0.5,
        ease: "power3.out",
      });

      // Si quieres también girar sobre X:
      // gsap.to(meshRef.current.rotation, {
      //   x: meshRef.current.rotation.x + e.deltaY * speed,
      //   duration: 0.5,
      //   ease: "power3.out",
      // });
    };

    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <mesh ref={meshRef} {...props  } position={[0,0,10]} >
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}
