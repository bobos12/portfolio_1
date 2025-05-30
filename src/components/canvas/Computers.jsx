// ComputersCanvas.jsx
import React, { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF } from "@react-three/drei";
import CanvasLoader from "../Loader";

const Computers = ({ isMobile }) => {
  const computer = useGLTF("/desktop_pc/scene.gltf"); // Absolute path for production

  // Ensure geometry is properly initialized
  useEffect(() => {
    if (computer.scene) {
      computer.scene.traverse((child) => {
        if (child.isMesh) {
          child.geometry.computeBoundingSphere();
          child.geometry.computeBoundingBox();
        }
      });
    }
  }, [computer]);

  // Update transformations each frame
  useFrame(() => {
    if (computer.scene) {
      computer.scene.updateMatrixWorld();
    }
  });

  return (
    <>
      {/* Lights */}
      <hemisphereLight intensity={0.25} groundColor="black" />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1.5}
        castShadow
        shadow-mapSize={1024}
      />
      <pointLight intensity={2} position={[10, 5, 10]} />
      <pointLight intensity={1.5} position={[-10, 5, -10]} />
      <pointLight intensity={1.5} position={[0, 10, 0]} />
      <ambientLight intensity={0.8} />

      {/* 3D Model */}
      <primitive
        object={computer.scene}
        scale={isMobile ? 0.7 : 0.75}
        position={isMobile ? [0, -3, -2.2] : [0, -3.25, -1.5]}
        rotation={[-0.01, -0.2, -0.1]}
      />
    </>
  );
};

const ComputersCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Media query for responsiveness
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set initial state
    setIsMobile(mediaQuery.matches);

    // Listener for changes
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add listener
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Cleanup
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <Canvas
      frameloop="demand"
      shadows
      dpr={[1, 1.5]} // More conservative to help on lower-end mobiles
      camera={{ position: [20, 3, 5], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<CanvasLoader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
          enablePan={false} // optional: restrict panning
        />
        <Computers isMobile={isMobile} />
      </Suspense>
      <Preload all />
    </Canvas>
  );
};

// Preload the model for smoother loading
useGLTF.preload("/desktop_pc/scene.gltf");

export default ComputersCanvas;
