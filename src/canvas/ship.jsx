import { Suspense, useEffect, useState, useRef, forwardRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Preload, useGLTF } from '@react-three/drei';


function CameraSetup() {
    const { camera } = useThree();
    useEffect(() => {
        camera.lookAt(34.48, 7.71, 3.67);
    }, []);
    return null;
}
// This function is for debugging purposes, allowing me to log the camera's position to decide on the final camera angles.
// function CameraLogger() {
//   const { camera, controls } = useThree();
  
//   useEffect(() => {
//     const logCamera = () => {
//       console.log('position:', camera.position);
//       console.log('target:', controls?.target);
//     };
//     window.addEventListener('keydown', (e) => {
//       if (e.key === 'l') logCamera(); // press L to log
//     });
//   }, [camera, controls]);

//   return null;
// }

function Enterprise() {
    const { scene } = useGLTF("/enterprise-codepath.glb");
    return <primitive object={scene} scale={0.1} />;
}

function ShipCanvas() {
    return (
        <Canvas 
            camera={{ position: [34.13, 7.75, 3.61], fov: 60, near: 0.01, far: 10000 }}
            style={{ width: "100vw", height: "100vh" }}
            >
            <CameraSetup />
            <ambientLight intensity={0.4} />
            <pointLight position={[26, 12, 10]} intensity={6} color="#ff6b9d" distance={18} decay={0} />
            <pointLight position={[43, 12, -3]} intensity={6} color="#9d4edd" distance={15} decay={0} />
            <pointLight position={[34.5, 14, 12]} intensity={5} color="#ffc857" distance={15} decay={0} />

            <mesh>
            <boxGeometry />
            <meshStandardMaterial />
            </mesh>
            <Suspense fallback={null}>
                <Enterprise />
            </Suspense>
            {/* Orbit Controls allow movement around the scene. This feature will be added at a later date for a larger project. */}
            {/* <OrbitControls makeDefault minDistance={0.1} maxDistance={1000}  /> */}
            {/* <CameraLogger /> */}
            <Preload all />
        </Canvas>
    );
}


    export default ShipCanvas;