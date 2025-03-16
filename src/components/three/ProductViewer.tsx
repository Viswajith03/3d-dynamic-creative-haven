
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF, Html, Environment, ContactShadows } from "@react-three/drei";
import { Group } from "three";
import { motion } from "framer-motion-3d";

interface ProductViewerProps {
  modelPath: string;
  scale?: number;
  position?: [number, number, number];
  autoRotate?: boolean;
  showControls?: boolean;
}

const ProductViewer = ({ 
  modelPath,
  scale = 1,
  position = [0, 0, 0],
  autoRotate = true,
  showControls = true
}: ProductViewerProps) => {
  const group = useRef<Group>(null);
  const { scene, nodes, materials } = useGLTF(modelPath);
  const [rotating, setRotating] = useState(autoRotate);
  const [hovered, setHovered] = useState(false);
  
  // Clone and prepare the model
  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if ('isMesh' in child && child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          if (child.material) {
            child.material.envMapIntensity = 0.8;
          }
        }
      });
    }
  }, [scene]);

  // Animation loop
  useFrame((state) => {
    if (!group.current) return;
    
    // Auto-rotation
    if (rotating) {
      group.current.rotation.y += 0.005;
    }
    
    // Breathing animation
    const breathingScale = 1 + Math.sin(state.clock.elapsedTime) * 0.02;
    if (hovered) {
      group.current.scale.set(
        scale * breathingScale * 1.1,
        scale * breathingScale * 1.1,
        scale * breathingScale * 1.1
      );
    } else {
      group.current.scale.set(
        scale * breathingScale,
        scale * breathingScale,
        scale * breathingScale
      );
    }
  });

  return (
    <>
      <Environment preset="city" />
      <ContactShadows 
        position={[0, -1, 0]} 
        opacity={0.4} 
        scale={5} 
        blur={2.4} 
      />
      
      <motion.group
        ref={group}
        position={position}
        initial={{ scale: 0 }}
        animate={{ scale: scale }}
        transition={{ type: "spring", duration: 1.5 }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <primitive object={scene} />
        
        {showControls && (
          <Html position={[0, -2, 0]}>
            <div className="flex space-x-2">
              <button
                className="bg-nuevanex-red text-white px-2 py-1 rounded text-xs"
                onClick={() => setRotating(!rotating)}
              >
                {rotating ? "Pause" : "Rotate"}
              </button>
              <button
                className="bg-nuevanex-dark text-white px-2 py-1 rounded text-xs"
                onClick={() => {
                  if (group.current) {
                    group.current.rotation.set(0, 0, 0);
                  }
                }}
              >
                Reset
              </button>
            </div>
          </Html>
        )}
      </motion.group>
    </>
  );
};

export default ProductViewer;
