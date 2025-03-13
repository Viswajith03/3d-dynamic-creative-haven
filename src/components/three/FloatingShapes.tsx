
import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Sphere, Box, Torus } from "@react-three/drei";
import { Vector3, Mesh, MathUtils } from "three";

interface ShapeProps {
  position: [number, number, number];
  shape: "sphere" | "box" | "torus";
  color: string;
  speed: number;
  rotationSpeed: number;
  scale: number;
}

const Shape = ({ position, shape, color, speed, rotationSpeed, scale }: ShapeProps) => {
  const ref = useRef<Mesh>(null);
  const initialPos = useMemo(() => new Vector3(...position), [position]);
  const randomOffset = useMemo(() => Math.random() * 1000, []);

  useFrame((state) => {
    if (!ref.current) return;
    
    // Floating animation
    const time = state.clock.getElapsedTime();
    ref.current.position.y = initialPos.y + Math.sin(time * speed + randomOffset) * 0.5;
    
    // Rotation
    ref.current.rotation.x += 0.005 * rotationSpeed;
    ref.current.rotation.y += 0.01 * rotationSpeed;
  });

  if (shape === "sphere") {
    return (
      <Sphere ref={ref} args={[scale, 16, 16]} position={position}>
        <meshStandardMaterial color={color} roughness={0.5} metalness={0.8} />
      </Sphere>
    );
  } else if (shape === "box") {
    return (
      <Box ref={ref} args={[scale, scale, scale]} position={position}>
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} />
      </Box>
    );
  } else {
    return (
      <Torus ref={ref} args={[scale * 1.5, scale * 0.5, 16, 32]} position={position}>
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.9} />
      </Torus>
    );
  }
};

interface FloatingShapesProps {
  count?: number;
}

const FloatingShapes = ({ count = 10 }: FloatingShapesProps) => {
  const shapes: ShapeProps[] = useMemo(() => {
    const result: ShapeProps[] = [];
    const shapeTypes: Array<"sphere" | "box" | "torus"> = ["sphere", "box", "torus"];
    const colors = ["#ea384c", "#ffffff", "#1a1a2e", "#c8c8c9"];
    
    for (let i = 0; i < count; i++) {
      result.push({
        position: [
          MathUtils.randFloatSpread(20),
          MathUtils.randFloatSpread(20),
          MathUtils.randFloatSpread(10) - 5
        ],
        shape: shapeTypes[Math.floor(Math.random() * shapeTypes.length)],
        color: colors[Math.floor(Math.random() * colors.length)],
        speed: MathUtils.randFloat(0.1, 0.5),
        rotationSpeed: MathUtils.randFloat(0.5, 2),
        scale: MathUtils.randFloat(0.1, 0.5)
      });
    }
    
    return result;
  }, [count]);

  return (
    <>
      {shapes.map((shapeProps, i) => (
        <Shape key={i} {...shapeProps} />
      ))}
    </>
  );
};

export default FloatingShapes;
