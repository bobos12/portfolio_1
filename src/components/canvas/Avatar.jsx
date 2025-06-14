import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useTexture } from "@react-three/drei";
import CanvasLoader from "../Loader";

const PhotoPlane = ({ isMobile }) => {
  const photoRef = useRef();
  const texture = useTexture("/avatar/avatar.png");

  useFrame(({ clock }) => {
    if (photoRef.current) {
      // Gentle floating animation
      photoRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
      photoRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });

  return (
    <group ref={photoRef}>
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <spotLight
        position={[-5, 5, 0]}
        intensity={0.8}
        angle={0.3}
        penumbra={1}
      />

      {/* Photo plane */}
      <mesh position={[0, 0, 0]} scale={isMobile ? 2 : 3}>
        <planeGeometry args={[1, 1]} />
        <meshStandardMaterial 
          map={texture}
          transparent
          opacity={1}
          side={2} // Render both sides
        />
      </mesh>
    </group>
  );
};

const AvatarCanvas = () => {
  const [isMobile, setIsMobile] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 500px)");
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);
    return () => mediaQuery.removeEventListener("change", handleMediaQueryChange);
  }, []);

  return (
    <div className="w-full h-[60vh]">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: isMobile ? 75 : 60,
          near: 0.1,
          far: 1000
        }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            enableDamping
            dampingFactor={0.05}
            rotateSpeed={0.3}
          />
          <PhotoPlane isMobile={isMobile} />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default AvatarCanvas;