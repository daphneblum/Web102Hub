import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import "./PlanetDisplay.css";

function RotatingPlanet({ color, emissive, scale}) {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
        }
    });

    return (
        <mesh ref={meshRef} scale={scale}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial
                color={color}
                emissive={emissive === 0 ? "black" : color}
                emissiveIntensity={emissive}
                roughness={0.8}
                metalness={0.1}
            />
        </mesh>
    );
}

function PlanetDisplay({ color, emissive, scale }) {
    return (
        <div className="planet-canvas-container">
            <Canvas
                camera={{ position: [0, 0, 4], fov: 45 }}
                style={{ width: "100%", height: "100%" }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight
                    position={[5, 3, 5]}
                    intensity={1.5}
                    color="#ffffff"
                />
                <pointLight
                    position={[-5, -3. -5]}
                    intensity={0.2}
                    color="#1a1a4e"
                />
                <RotatingPlanet
                    color={color}
                    emissive={emissive}
                    scale={scale}
                />
            </Canvas>
        </div>
    );
}

export default PlanetDisplay;