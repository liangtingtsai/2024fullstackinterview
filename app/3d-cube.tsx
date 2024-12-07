"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const CubeComponent = () => {
    const mountRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

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

        // Cube setup
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        // Add lighting
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const pointLight = new THREE.PointLight(0xffffff, 1);
        pointLight.position.set(5, 5, 5);
        scene.add(pointLight);

        // TODO: Fetch rotation values from backend and apply them to the cube

        // Animation loop
        const animate = () => {
            requestAnimationFrame(animate);

            // TODO: Update rotation state

            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            mountRef.current?.removeChild(renderer.domElement);
        };
    }, [isPlaying]);

    // TODO: Save rotation values to backend when button is pressed

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
		            
		        {/* TODO: Show rotation information  */}
		        {/* TODO: Create Play/Pause Button */}
		            
            </div>
        </div>
    );
};

export default CubeComponent;