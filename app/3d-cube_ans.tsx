"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const CubeComponent = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const [isPlaying, setIsPlaying] = useState(false); // Updated to `isPlaying`

    useEffect(() => {
        if (!mountRef.current) return;

        // Scene setup
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.z = 5;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setClearColor(0x202020); // Background color
        mountRef.current.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // Fetch saved rotation from backend
        const fetchRotation = async () => {
            const response = await fetch('http://localhost:3001/rotation');
            const data = await response.json();
            cube.rotation.set(data.x, data.y, data.z);
            setRotation(data);
        };

        fetchRotation();

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            if (isPlaying) {
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
            }

            setRotation({
                x: cube.rotation.x,
                y: cube.rotation.y,
                z: cube.rotation.z,
            });

            renderer.render(scene, camera);
        };
        animate();

        return () => {
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, [isPlaying]);

    // Save rotation to backend on Play/Pause
    const saveRotation = async () => {
        await fetch('http://localhost:3001/rotation', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(rotation),
        });
    };

    return (
        <div style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }}>
            <div ref={mountRef} style={{ width: '100%', height: '100%' }}></div>
            <div
                style={{
                    position: 'absolute',
                    top: '10px',
                    left: '10px',
                    background: 'rgba(255, 255, 255, 0.8)',
                    padding: '10px',
                    borderRadius: '5px',
                    boxShadow: '0px 0px 10px rgba(0,0,0,0.1)',
                }}
            >
                <h3>Rotation Info</h3>
                <p>X: {rotation.x.toFixed(2)}</p>
                <p>Y: {rotation.y.toFixed(2)}</p>
                <p>Z: {rotation.z.toFixed(2)}</p>
                <button
                    onClick={() => {
                        setIsPlaying(!isPlaying);
                        saveRotation();
                    }}
                >
                    {isPlaying ? "Pause" : "Play"}
                </button>
            </div>
        </div>
    );
};

export default CubeComponent;