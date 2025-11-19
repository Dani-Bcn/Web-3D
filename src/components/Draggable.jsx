"use client";
import { useThree } from "@react-three/fiber";
import { useState, useCallback } from "react";
import * as THREE from "three";

export default function Draggable({ children }) {
  const { camera, scene } = useThree();
  const [isDragging, setIsDragging] = useState(false);
  const [plane, setPlane] = useState(null);
  const [offset, setOffset] = useState(new THREE.Vector3());
  const [intersectPoint, setIntersectPoint] = useState(new THREE.Vector3());
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  const onPointerDown = (e) => {
    e.stopPropagation();

    // Crear un plano perpendicular a la cámara pasando por el objeto
    const normal = new THREE.Vector3()
      .subVectors(camera.position, e.object.position)
      .normalize();
    const dragPlane = new THREE.Plane().setFromNormalAndCoplanarPoint(
      normal,
      e.object.position
    );
    setPlane(dragPlane);

    // Calcular punto de intersección en el plano
    raycaster.setFromCamera(e.pointer, camera);
    raycaster.ray.intersectPlane(dragPlane, intersectPoint);

    // Guardar desplazamiento
    setOffset(new THREE.Vector3().subVectors(e.object.position, intersectPoint));

    setIsDragging(true);
  };

  const onPointerMove = (e) => {
    if (!isDragging || !plane) return;
    e.stopPropagation();

    // Ratón normalizado
    mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    if (raycaster.ray.intersectPlane(plane, intersectPoint)) {
      const newPosition = new THREE.Vector3().addVectors(
        intersectPoint,
        offset
      );

      // Mover el objeto
      e.object.position.copy(newPosition);
    }
  };

  const onPointerUp = () => {
    setIsDragging(false);
  };

  return (
    <group
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {children}
    </group>
  );
}
