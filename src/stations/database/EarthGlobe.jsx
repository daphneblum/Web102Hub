import { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";

const RADIUS = 1.6;

const CATEGORY_COLORS = {
    Protests: "#ffd700",
    Battles: "#ff2d95", 
    "Explosions/Remote violence": "#ff4d1a",
    "Violence against civilians": "#ff0033",
    "Strategic developments": "#a259ff",
};

const DEFAULT_COLOR = "#a259ff";

//convert lat/lon to 3D coordinates
function latLongToVector3(lat, lon, radius) {
    const phi = (90 - lat) * (Math.PI / 180);
    const theta = (lon + 180) * (Math.PI / 180);

    const x = -radius * Math.sin(phi) * Math.cos(theta);
    const z = radius * Math.sin(phi) * Math.sin(theta);
    const y = radius * Math.cos(phi);

    return new THREE.Vector3(x, y, z);
}

function ConflictMarker({ position, color, size }) {
    return (
        <mesh position={position}>
            <sphereGeometry args={[size, 12, 12]} />
            <meshStandardMaterial color={color} toneMapped={false} />
            <pointLight color={color} intensity={0.6} distance={0.4} />
        </mesh>
    );
}

function EarthGlobe({ events = [] }) {
    const globeRef = useRef();
    const earthMap = useTexture("/assets/earthmap4k.jpg");

    const markers = useMemo(() => {
        return events
        .filter((e) => e.lat != null && e.lng != null)
        .map((e) => {
            const sig = typeof e.sig === "number" ? e.sig : 0.2;
            return {
                position: latLongToVector3(e.lat, e.lng, RADIUS + 0.01),
                color: CATEGORY_COLORS[e.category] || DEFAULT_COLOR,
                size: 0.02 + Math.min(sig, 1) * 0.035,
            };
        });
    }, [events]);

    useFrame((_, delta) => {
        if (globeRef.current) globeRef.current.rotation.y += delta * 0.05;
    });

    return (
        <group ref={globeRef}>
            <mesh>
                <sphereGeometry args={[RADIUS, 96, 96]} />
                <meshStandardMaterial 
                color="#42dfff"
                emissive={"#123f66"}
                emissiveIntensity={0.18}
                roughness={0.75}
                />
            </mesh>
            <mesh>
                <sphereGeometry args={[RADIUS + 0.012, 96, 96]} />
                <meshBasicMaterial
                    map={earthMap}
                    color="#ffffff"
                    transparent
                    opacity={0.75}
                    alphaTest={0.15}
                />
            </mesh>

            <mesh>
                <sphereGeometry args={[RADIUS + 0.018, 32, 32]} />
                <meshBasicMaterial 
                color="#ff2d95"
                wireframe 
                transparent 
                opacity={0.88}
                />
            </mesh>

            {markers.map((m, i) => (
                <ConflictMarker key={i} position={m.position} color={m.color} size={m.size} />
            ))}
        </group>
    );
}

export default EarthGlobe;