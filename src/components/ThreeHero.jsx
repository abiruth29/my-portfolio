import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeHero = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // ── Sizing helpers ──────────────────────────────────────────────────
        const parent = () => canvas.parentElement;
        const W = () => parent()?.clientWidth  || window.innerWidth;
        const H = () => parent()?.clientHeight || window.innerHeight;

        // ── Scene, Camera, Renderer ─────────────────────────────────────────
        const scene    = new THREE.Scene();
        const camera   = new THREE.PerspectiveCamera(60, W() / H(), 0.1, 1000);
        camera.position.z = 6;

        const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
        renderer.setSize(W(), H());
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);

        // ── Particle constellation ──────────────────────────────────────────
        const COUNT = 240;
        const pPositions = new Float32Array(COUNT * 3);
        const pVelocities = new Float32Array(COUNT * 3);

        for (let i = 0; i < COUNT; i++) {
            pPositions[i * 3]     = (Math.random() - 0.5) * 24;
            pPositions[i * 3 + 1] = (Math.random() - 0.5) * 15;
            pPositions[i * 3 + 2] = (Math.random() - 0.5) * 8;
            pVelocities[i * 3]     = (Math.random() - 0.5) * 0.0025;
            pVelocities[i * 3 + 1] = (Math.random() - 0.5) * 0.0025;
        }

        const pGeo = new THREE.BufferGeometry();
        pGeo.setAttribute('position', new THREE.BufferAttribute(pPositions, 3));

        // Two layers: violet particles + amber accent particles
        const pMat = new THREE.PointsMaterial({
            size: 0.05,
            color: 0x8B5CF6,
            transparent: true,
            opacity: 0.7,
            sizeAttenuation: true,
        });
        const points = new THREE.Points(pGeo, pMat);
        scene.add(points);

        // Amber accent particles (sparser)
        const ACOUNT = 60;
        const aPositions = new Float32Array(ACOUNT * 3);
        for (let i = 0; i < ACOUNT; i++) {
            aPositions[i * 3]     = (Math.random() - 0.5) * 20;
            aPositions[i * 3 + 1] = (Math.random() - 0.5) * 12;
            aPositions[i * 3 + 2] = (Math.random() - 0.5) * 6;
        }
        const aGeo = new THREE.BufferGeometry();
        aGeo.setAttribute('position', new THREE.BufferAttribute(aPositions, 3));
        const aMat = new THREE.PointsMaterial({
            size: 0.07,
            color: 0xF59E0B,
            transparent: true,
            opacity: 0.45,
            sizeAttenuation: true,
        });
        const amberPoints = new THREE.Points(aGeo, aMat);
        scene.add(amberPoints);

        // ── Wireframe Icosahedron ───────────────────────────────────────────
        const icoGeo = new THREE.IcosahedronGeometry(1.5, 1);
        const icoMat = new THREE.MeshBasicMaterial({
            color: 0x7C3AED,
            wireframe: true,
            transparent: true,
            opacity: 0.20,
        });
        const ico = new THREE.Mesh(icoGeo, icoMat);
        ico.position.set(3.4, 0.9, -1.5);
        scene.add(ico);

        // ── Wireframe Torus ─────────────────────────────────────────────────
        const torGeo = new THREE.TorusGeometry(1.0, 0.38, 10, 38);
        const torMat = new THREE.MeshBasicMaterial({
            color: 0xF59E0B,
            wireframe: true,
            transparent: true,
            opacity: 0.16,
        });
        const tor = new THREE.Mesh(torGeo, torMat);
        tor.position.set(-3.2, -0.9, -0.5);
        scene.add(tor);

        // ── Wireframe TorusKnot (background accent) ─────────────────────────
        const knotGeo = new THREE.TorusKnotGeometry(0.55, 0.16, 64, 8);
        const knotMat = new THREE.MeshBasicMaterial({
            color: 0xEC4899,
            wireframe: true,
            transparent: true,
            opacity: 0.11,
        });
        const knot = new THREE.Mesh(knotGeo, knotMat);
        knot.position.set(-0.5, 2.8, -3.5);
        scene.add(knot);

        // ── Octahedron (small, right-side accent) ───────────────────────────
        const octGeo = new THREE.OctahedronGeometry(0.6, 0);
        const octMat = new THREE.MeshBasicMaterial({
            color: 0xF59E0B,
            wireframe: true,
            transparent: true,
            opacity: 0.22,
        });
        const oct = new THREE.Mesh(octGeo, octMat);
        oct.position.set(3.0, -2.0, 0.5);
        scene.add(oct);

        // ── Mouse tracking ──────────────────────────────────────────────────
        const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
        const onMouseMove = (e) => {
            mouse.tx = (e.clientX / window.innerWidth  - 0.5) * 2;
            mouse.ty = -(e.clientY / window.innerHeight - 0.5) * 2;
        };
        window.addEventListener('mousemove', onMouseMove, { passive: true });

        // ── Resize ──────────────────────────────────────────────────────────
        const onResize = () => {
            const w = W(), h = H();
            camera.aspect = w / h;
            camera.updateProjectionMatrix();
            renderer.setSize(w, h);
        };
        window.addEventListener('resize', onResize, { passive: true });

        // ── Animation loop ───────────────────────────────────────────────────
        let raf;
        const clock = new THREE.Clock();

        const animate = () => {
            raf = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Smooth mouse lerp
            mouse.x += (mouse.tx - mouse.x) * 0.04;
            mouse.y += (mouse.ty - mouse.y) * 0.04;

            // Drift violet particles
            const pp = pGeo.attributes.position.array;
            for (let i = 0; i < COUNT; i++) {
                pp[i * 3]     += pVelocities[i * 3];
                pp[i * 3 + 1] += pVelocities[i * 3 + 1];
                if (pp[i * 3]     >  12) pp[i * 3]     = -12;
                if (pp[i * 3]     < -12) pp[i * 3]     =  12;
                if (pp[i * 3 + 1] >   7.5) pp[i * 3 + 1] = -7.5;
                if (pp[i * 3 + 1] <  -7.5) pp[i * 3 + 1] =  7.5;
            }
            pGeo.attributes.position.needsUpdate = true;

            // Particle cloud tilts with mouse
            points.rotation.y = mouse.x * 0.09;
            points.rotation.x = mouse.y * 0.05;
            amberPoints.rotation.y = -mouse.x * 0.06;
            amberPoints.rotation.x = -mouse.y * 0.04;
            amberPoints.rotation.z = t * 0.015;

            // Icosahedron — slow drift + mouse influence
            ico.rotation.x = t * 0.22 + mouse.y * 0.22;
            ico.rotation.y = t * 0.16 + mouse.x * 0.28;
            ico.position.y = 0.9 + Math.sin(t * 0.48) * 0.38;

            // Torus — counter-rotation
            tor.rotation.x = t * 0.28 + mouse.y * 0.18;
            tor.rotation.y = t * 0.19;
            tor.rotation.z = t * 0.08;
            tor.position.y = -0.9 + Math.cos(t * 0.42) * 0.32;
            tor.position.x = -3.2 + mouse.x * 0.12;

            // TorusKnot — slow background spin
            knot.rotation.x = t * 0.35;
            knot.rotation.y = t * 0.28;

            // Octahedron — fast spin + float
            oct.rotation.x = t * 0.5;
            oct.rotation.y = t * 0.4;
            oct.position.y = -2.0 + Math.sin(t * 0.7 + 1.2) * 0.25;

            renderer.render(scene, camera);
        };
        animate();

        // ── Cleanup ─────────────────────────────────────────────────────────
        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('resize', onResize);
            renderer.dispose();
            [pGeo, aGeo, icoGeo, torGeo, knotGeo, octGeo].forEach(g => g.dispose());
            [pMat, aMat, icoMat, torMat, knotMat, octMat].forEach(m => m.dispose());
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                pointerEvents: 'none',
                zIndex: 0,
            }}
        />
    );
};

export default ThreeHero;
