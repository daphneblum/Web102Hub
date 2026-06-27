import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import "./PlanetDisplay.css";

function RotatingPlanet({ color, emissive, scale}) {
    const meshRef = useRef();
    const atmosphereRef = useRef();

    const geometry = useMemo(() => {
        const noise3D = createNoise3D();
        const geo = new THREE.SphereGeometry(1, 128, 128);
        const positions = geo.attributes.position;

        for (let i = 0; i < positions.count; i++) {
            const x = positions.getX(i);
            const y = positions.getY(i);
            const z = positions.getZ(i);

            const length = Math.sqrt(x * x + y * y + z * z);
            const nx = x / length;
            const ny = y / length;
            const nz = z / length;

            const noiseValue = noise3D(nx * 3, ny * 3, nz * 3);
            const displacement = 1 + noiseValue * 0.08;

            positions.setXYZ(i, nx * displacement, ny * displacement, nz * displacement);
        }

        geo.computeVertexNormals();
        return geo;
    }, []);

    useFrame(({ clock }) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += 0.003;
        }
        if (atmosphereRef.current) {
            atmosphereRef.current.rotation.y += 0.001;
        }
    });

    const atmosphereColor = useMemo(() => {
        const c = new THREE.Color(color);
        c.lerp(new THREE.Color("#88ccff"), 0.3);
        return c;
    }, [color]);

    return (
        <group scale={scale}>
            <mesh ref={meshRef} geometry={geometry}>
                <meshPhysicalMaterial
                    color={color}
                    emissive={emissive === 0 ? "black" : color}
                    emissiveIntensity={emissive}
                    roughness={0.8}
                    metalness={0.1}
                    clearcoat={0.2}
                    clearcoatRoughness={0.8}
                />
            </mesh>

            <mesh ref={atmosphereRef} scale={1.06}>
            <sphereGeometry args={[1, 64, 64]} />
                <meshPhysicalMaterial
                    color={atmosphereColor}
                    transparent={true}
                    opacity={0.15}
                    roughness={1}
                    metalness={0}
                    depthWrite={false}
                />
            </mesh>
        </group>
        
    );
}

function PlanetDisplay({ color, emissive, scale }) {

    const safeColor = color || "#888888";
    const safeEmissive = emissive ?? 0;
    const safeScale = scale || 1;
    const rimColor = "#4488ff"

    return (
        <div className="planet-canvas-container">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                style={{ width: "100%", height: "100%" }}
            >
                <ambientLight intensity={0.1} />
                <directionalLight
                    position={[5, 3, 5]}
                    intensity={2}
                    color="#fff5e0"
                />
                <pointLight
                    position={[-4, -1, -4]}
                    intensity={3}
                    color={rimColor}
                    distance={20}
                />
                <pointLight
                    position={[0, -5, 2]}
                    intensity={0.3}
                    color="#221133"
                    distance={15}
                />
                <RotatingPlanet
                    color={safeColor}
                    emissive={safeEmissive}
                    scale={safeScale}
                />
            </Canvas>
        </div>
    );
}

export default PlanetDisplay;