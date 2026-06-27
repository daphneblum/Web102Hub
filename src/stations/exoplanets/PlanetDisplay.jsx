import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { createNoise3D } from "simplex-noise";
import { Stars } from "@react-three/drei";
import "./PlanetDisplay.css";

function RotatingPlanet({ color, emissive, scale, planetType, planetName }) {
    const meshRef = useRef();

    // Rocky geometry with noise displacement
    const rockyGeometry = useMemo(() => {
        const seed = planetName
            ? planetName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
            : 42;
        const noise3D = createNoise3D(() => (seed * 9301 + 49297) % 233280 / 233280);
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
            const noiseValue = noise3D(nx * 4, ny * 4, nz * 4);
            const displacement = 1 + noiseValue * 0.04;
            positions.setXYZ(i, nx * displacement, ny * displacement, nz * displacement);
        }
        geo.computeVertexNormals();
        return geo;
    }, [planetName]);


    const gasGeometry = useMemo(() => {
        const seed = planetName
            ? planetName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)
            : 42;
        const noise3D = createNoise3D(() => (seed * 9301 + 49297) % 233280 / 233280);
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
            // Band noise — only varies along Y, creating horizontal stripes
            const noiseValue = noise3D(nx * 0.5, ny * 6, nz * 0.5);
            const displacement = 1 + noiseValue * 0.02;
            positions.setXYZ(i, nx * displacement, ny * displacement, nz * displacement);
        }
        geo.computeVertexNormals();
        return geo;
    }, [planetName]);
    const isGas = planetType === "gas-giant" || planetType === "ice-giant";

    const hasRings = useMemo(() => {
        if (!isGas) return false;
        const seed = planetName
            ? planetName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) : 0;
        return seed % 3 === 0;
    },[planetName, isGas]);

    const bandColor = useMemo(() => {
        const base = new THREE.Color(color);

        if (planetType === "gas-giant") {
            return base.clone().lerp(new THREE.Color("#f0d7a0"), 0.35);
        }
        if (planetType === "ice-giant") {
            return base.clone().lerp(new THREE.Color("#b8e8ff"), 0.35);
        }
        return base.clone().lerp(new THREE.Color("#2a1a14"), 0.25);
    }, [color, planetType]);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.y += planetType === "gas-giant" ? 0.01 : 0.003;
        }
    });

    const gasBandMaterial = useMemo(() => {
        const base = new THREE.Color(color);
        const light = base.clone().lerp(new THREE.Color("#fff1c8"), 0.18);
        const dark = base.clone().lerp(new THREE.Color("#2a1a14"), 0.18);

        return new THREE.ShaderMaterial({
            uniforms: {
                baseColor: { value: base },
                lightColor: { value: light },
                darkColor: { value: dark },
            },
            vertexShader: `
                varying vec3 vPosition;
                varying vec3 vWorldNormal;

                void main() {
                    vPosition = position;
                    vWorldNormal = normalize(mat3(modelMatrix) * normal);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 baseColor;
                uniform vec3 lightColor;
                uniform vec3 darkColor;

                varying vec3 vPosition;
                varying vec3 vWorldNormal;

                void main() {
                    float bands = sin(vPosition.y * 22.0);
                    float softBands = smoothstep(-0.2, 0.9, bands);

                    vec3 color = mix(baseColor, lightColor, softBands * 0.35);
                    color = mix(color, darkColor, (1.0 - softBands) * 0.22);

                    float smallerBands = sin(vPosition.y * 75.0 + vPosition.x * 4.0);
                    color += smallerBands * 0.015;

                    vec3 lightDirection = normalize(vec3(1.0, 0.4, 1.0));
                    float light = dot(normalize(vWorldNormal), lightDirection);
                    light = clamp(light, 0.25, 1.0);

                    float litBoost = smoothstep(0.25, 1.0, light);
                    vec3 finalColor = color * light;
                    finalColor += color * litBoost * 0.45;

                    gl_FragColor = vec4(finalColor, 1.0);
                }
            `,
        });
    }, [color]);

    


    return (
        <group scale={scale}>
            <mesh ref={meshRef} geometry={isGas ? gasGeometry : rockyGeometry}>
                {isGas ? (
                    <primitive object={gasBandMaterial} attach="material" />
                ) : (
                    <meshPhysicalMaterial
                        color={color}
                        emissive={emissive === 0 ? "black" : color}
                        emissiveIntensity={emissive}
                        roughness={0.85}
                        metalness={0}
                        clearcoat={0.2}
                        clearcoatRoughness={0.8}
                    />
                )}
            </mesh>

            {/* atmosphere effect */}
            <mesh scale={1.07}>
                <sphereGeometry args={[1, 64, 64]} />
                <meshBasicMaterial
                    color={color}
                    transparent
                    opacity={0.09}
                    side={THREE.BackSide}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </mesh>

            {hasRings && (
                <mesh rotation={[Math.PI / 2.3, 0.04, 0]}>
                    <torusGeometry args={[1.3, 0.18, 2.2, 90]} />
                    <meshPhysicalMaterial
                        color={bandColor}
                        transparent={true}
                        opacity={0.8}
                        roughness={.5}
                        metalness={0}
                        emissive={bandColor}
                        emissiveIntensity={0.8}
                    />
                </mesh>
            )}
        </group>
    );
}

function PlanetDisplay({ color, emissive, scale, planetType, atmosphereGlow, planetName }) {
    const safeColor = color || "#888888";
    const safeEmissive = emissive ?? 0;
    const safeScale = scale || 1;
    const safePlanetType = planetType || "rocky";
    const safeAtmosphere = atmosphereGlow || "rgba(100, 150, 255, 0.25)";

    return (
        <div 
            className="planet-canvas-container"
            style={{ boxShadow: `0 0 40px 15px ${safeAtmosphere}, 0 0 80px 30px ${safeAtmosphere.replace('0.25', '0.1').replace('0.3', '0.1').replace('0.4', '0.15').replace('0.35', '0.12').replace('0.45', '0.15').replace('0.5', '0.2')}` }}
        >
            <Canvas
                camera={{ position: [0, 0, 10], fov: 40 }}
                style={{ width: "100%", height: "100%" }}
            >
                <color attach="background" args={["#02040a"]} />
                <Stars
                    radius={100}
                    depth={50}
                    count={1500}
                    factor={4}
                    saturation={0}
                    fade
                    speed={0.5}
                />
                <ambientLight intensity={0.1} />
                <directionalLight
                    position={[11, 3, 5]}
                    intensity={2}
                    color="#fff5e0"
                />
                <pointLight
                    position={[-4, -1, -4]}
                    intensity={12}
                    color="#4488ff"
                    distance={20}
                    decay={0}
                />
                <RotatingPlanet
                    color={safeColor}
                    emissive={safeEmissive}
                    scale={safeScale}
                    planetType={safePlanetType}
                    planetName={planetName}
                />
            </Canvas>
        </div>
    );
}

export default PlanetDisplay;