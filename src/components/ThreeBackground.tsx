import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  interactive?: boolean;
}

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

export const ThreeBackground: React.FC<ThreeBackgroundProps> = ({ interactive = true }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    if (!isWebGLAvailable()) {
      setWebGlSupported(false);
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number | null = null;
    let geometry: THREE.BufferGeometry | null = null;
    let particleMaterial: THREE.PointsMaterial | null = null;
    let coreGeometry: THREE.IcosahedronGeometry | null = null;
    let coreMaterial: THREE.MeshBasicMaterial | null = null;
    let innerGeometry: THREE.OctahedronGeometry | null = null;
    let innerMaterial: THREE.MeshBasicMaterial | null = null;
    let ringGeometry: THREE.TorusGeometry | null = null;
    let ringMaterial: THREE.MeshBasicMaterial | null = null;

    try {
      // Scene, Camera, Renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        60,
        container.clientWidth / container.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 18;

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false, failIfMajorPerformanceCaveat: false });
      renderer.setSize(container.clientWidth, container.clientHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
      container.appendChild(renderer.domElement);

      const handleContextLost = (event: Event) => {
        event.preventDefault();
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }
        setWebGlSupported(false);
      };
      renderer.domElement.addEventListener("webglcontextlost", handleContextLost, false);

      // Group for objects
      const mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // 1. Gold Particles Geometry
      const particleCount = 180;
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 45;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      // Particle Texture/Material - Gold tone (#D4AF37)
      particleMaterial = new THREE.PointsMaterial({
        color: new THREE.Color("#D4AF37"),
        size: 0.25,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, particleMaterial);
      mainGroup.add(particles);

      // 2. Centerpiece: 3D Holographic Wireframe Geometric Core
      coreGeometry = new THREE.IcosahedronGeometry(4.5, 1);
      coreMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#B8860B"),
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
      mainGroup.add(coreMesh);

      // Inner Gold Solid Core
      innerGeometry = new THREE.OctahedronGeometry(2.2, 0);
      innerMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#D4AF37"),
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
      mainGroup.add(innerMesh);

      // Floating Ring
      ringGeometry = new THREE.TorusGeometry(6.5, 0.04, 16, 80);
      ringMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#D4AF37"),
        transparent: true,
        opacity: 0.3,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = Math.PI / 3;
      mainGroup.add(ringMesh);

      // Mouse Interaction
      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        if (!interactive) return;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        mouseX = (event.clientX - windowHalfX) * 0.0008;
        mouseY = (event.clientY - windowHalfY) * 0.0008;
      };

      window.addEventListener("mousemove", handleMouseMove);

      // Resize Handler
      const handleResize = () => {
        if (!container || !renderer) return;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
      };

      window.addEventListener("resize", handleResize);

      // Animation Loop
      const clock = new THREE.Clock();

      const animate = () => {
        if (!renderer) return;
        const elapsedTime = clock.getElapsedTime();

        // Smooth mouse follow (lerp)
        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        mainGroup.rotation.y = targetX + elapsedTime * 0.08;
        mainGroup.rotation.x = targetY + Math.sin(elapsedTime * 0.2) * 0.1;

        coreMesh.rotation.x = elapsedTime * 0.15;
        coreMesh.rotation.y = elapsedTime * 0.22;

        innerMesh.rotation.x = -elapsedTime * 0.25;
        innerMesh.rotation.z = elapsedTime * 0.18;

        ringMesh.rotation.z = elapsedTime * 0.12;

        // Animate particles
        if (geometry) {
          const positionsAttr = geometry.attributes.position as THREE.BufferAttribute;
          if (positionsAttr) {
            const array = positionsAttr.array as Float32Array;
            for (let i = 0; i < particleCount; i++) {
              array[i * 3 + 1] += Math.sin(elapsedTime + i) * 0.005;
            }
            positionsAttr.needsUpdate = true;
          }
        }

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      animate();

      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("resize", handleResize);
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
        }

        if (renderer && renderer.domElement) {
          renderer.domElement.removeEventListener("webglcontextlost", handleContextLost);
          if (container.contains(renderer.domElement)) {
            container.removeChild(renderer.domElement);
          }
        }

        geometry?.dispose();
        particleMaterial?.dispose();
        coreGeometry?.dispose();
        coreMaterial?.dispose();
        innerGeometry?.dispose();
        innerMaterial?.dispose();
        ringGeometry?.dispose();
        ringMaterial?.dispose();
        renderer?.dispose();
      };
    } catch (e) {
      console.warn("WebGL initialization failed, falling back to CSS background:", e);
      setWebGlSupported(false);
    }
  }, [interactive]);

  if (!webGlSupported) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-60">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/10 blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] rounded-full bg-[#B8860B]/10 blur-[100px]" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-80"
    />
  );
};

