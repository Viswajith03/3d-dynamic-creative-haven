
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import FloatingShapes from "./FloatingShapes";
import RotatingLogo from "./RotatingLogo";

type SceneProps = {
  type?: "hero" | "background";
};

const Scene = ({ type = "hero" }: SceneProps) => {
  return (
    <div className="canvas-container">
      <Canvas shadows>
        <Suspense fallback={null}>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} />
          <ambientLight intensity={0.5} />
          <directionalLight 
            position={[10, 10, 5]} 
            intensity={1} 
            castShadow 
            shadow-mapSize-width={1024} 
            shadow-mapSize-height={1024} 
          />
          <spotLight position={[-10, 10, 5]} intensity={0.8} castShadow />
          
          {type === "hero" ? (
            <RotatingLogo position={[0, 0, 0]} />
          ) : (
            <FloatingShapes count={15} />
          )}
          
          <OrbitControls 
            enableZoom={false} 
            enablePan={false} 
            enableRotate={type === "hero"}
            autoRotate={type === "background"}
            autoRotateSpeed={0.5}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default Scene;
