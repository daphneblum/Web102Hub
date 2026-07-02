import { use, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";

const RADIUS = 2;

//convert lat/lon to 3D coordinates
function latLongToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
}

function ConflictMarker({ position, intensity }) {
    //intensity determines color and size of marker
    const color = intensity > 0.66 ? "#ffd700" : intensity > 0.33 ? "#ff2d95" : "#a259ff";
    const size = 0.02 + intensity * 0.035;

    return (
        <mesh position={position}>
            <sphereGeometry args={[size, 12, 12]} />
            <meshStandardMaterial color={color} toneMapped={false} />
            <pointLight color={color} intensity={0.6} distance={0.4} />
        </mesh>
    );
}

function EarthGlobe({ points = [] }) {
    const globeRef = useRef();

    const markers = useMemo(() => {
        if (!points.length) return [];

        const counts = points.map((f) => f.properties?.count ?? 1);
        const max = Math.max(...counts, 1);

        return points.map((featrue) => {
            const [lon, lat] = featrue.geometry.coordinates || [];
            if (lat == null || lon == null) return null;
            const count = featrue.properties?.count ?? 1;
            return {
                position: latLongToVector3(lat, lon, RADIUS + 0.01),
                intensity: count / max,
                name: featrue.properties?.name || "Unknown",
            };
        })
        .filter(Boolean);
    }, [points]);

    useFrame((_, delta) => {
        if (globeRef.current) globeRef.current.rotation.y += delta * 0.05;
    });

    return (
        <group ref={globeRef}>
            <mesh>
                <sphereGeometry args={[RADIUS, 64, 64]} />
                <meshStandardMaterial 
                color="#1a0b2e" 
                emissive={"#3a1a5e"}
                emissiveIntensity={0.15}
                wireframe={false} 
                />
            </mesh>

            <mesh>
                <sphereGeometry args={[RADIUS + 0.005, 32, 32]} />
                <meshBasicMaterial 
                color="#ff2d95"
                wireframe 
                transparent 
                opacity={0.8}
                />
            </mesh>

            {markers.map((m, i) => (
                <ConflictMarker key={i} position={m.position} intensity={m.intensity} />
            ))}
        </group>
    );
}

export default EarthGlobe;