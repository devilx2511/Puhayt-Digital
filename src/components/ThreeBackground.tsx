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
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(() =>
    typeof window !== "undefined" && window.matchMedia
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false
  );

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || prefersReducedMotion) return;

    if (!isWebGLAvailable()) {
      setWebGlSupported(false);
      return;
    }

    let renderer: THREE.WebGLRenderer | null = null;
    let animationFrameId: number | null = null;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    let geometry: THREE.BufferGeometry | null = null;
    let particleMaterial: THREE.PointsMaterial | null = null;
    let coreGeometry: THREE.IcosahedronGeometry | null = null;
    let coreMaterial: THREE.MeshBasicMaterial | null = null;
    let innerGeometry: THREE.OctahedronGeometry | null = null;
    let innerMaterial: THREE.MeshBasicMaterial | null = null;
    let ringGeometry: THREE.TorusGeometry | null = null;
    let ringMaterial: THREE.MeshBasicMaterial | null = null;

    try {
      const width = Math.max(container.clientWidth, 320);
      const height = Math.max(container.clientHeight, 320);
      const isMobile = window.innerWidth < 768;

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
      camera.position.z = 18;

      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "low-power",
        failIfMajorPerformanceCaveat: false,
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5));
      container.appendChild(renderer.domElement);

      const handleContextLost = (event: Event) => {
        event.preventDefault();
        if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
        setWebGlSupported(false);
      };
      renderer.domElement.addEventListener("webglcontextlost", handleContextLost, false);

      const mainGroup = new THREE.Group();
      scene.add(mainGroup);

      // Adaptive particle count for mobile vs desktop to keep main-thread work near 0ms
      const particleCount = isMobile ? 75 : 140;
      geometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 45;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
      }

      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

      particleMaterial = new THREE.PointsMaterial({
        color: new THREE.Color("#D4AF37"),
        size: 0.25,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geometry, particleMaterial);
      mainGroup.add(particles);

      coreGeometry = new THREE.IcosahedronGeometry(4.5, 1);
      coreMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#B8860B"),
        wireframe: true,
        transparent: true,
        opacity: 0.22,
      });
      const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
      mainGroup.add(coreMesh);

      innerGeometry = new THREE.OctahedronGeometry(2.2, 0);
      innerMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#D4AF37"),
        wireframe: true,
        transparent: true,
        opacity: 0.45,
      });
      const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
      mainGroup.add(innerMesh);

      ringGeometry = new THREE.TorusGeometry(6.5, 0.04, 12, 60);
      ringMaterial = new THREE.MeshBasicMaterial({
        color: new THREE.Color("#D4AF37"),
        transparent: true,
        opacity: 0.3,
      });
      const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      ringMesh.rotation.x = Math.PI / 3;
      mainGroup.add(ringMesh);

      let mouseX = 0;
      let mouseY = 0;
      let targetX = 0;
      let targetY = 0;

      const handleMouseMove = (event: MouseEvent) => {
        if (!interactive || isMobile) return;
        const windowHalfX = window.innerWidth / 2;
        const windowHalfY = window.innerHeight / 2;
        mouseX = (event.clientX - windowHalfX) * 0.0008;
        mouseY = (event.clientY - windowHalfY) * 0.0008;
      };

      if (interactive && !isMobile) {
        window.addEventListener("mousemove", handleMouseMove, { passive: true });
      }

      const handleResize = () => {
        if (!container || !renderer) return;
        const w = Math.max(container.clientWidth, 320);
        const h = Math.max(container.clientHeight, 320);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      };

      window.addEventListener("resize", handleResize, { passive: true });

      const clock = new THREE.Clock();

      const animate = () => {
        if (!renderer || !isVisible || !isPageVisible) {
          animationFrameId = null;
          return;
        }
        const elapsedTime = clock.getElapsedTime();

        targetX += (mouseX - targetX) * 0.05;
        targetY += (mouseY - targetY) * 0.05;

        mainGroup.rotation.y = targetX + elapsedTime * 0.08;
        mainGroup.rotation.x = targetY + Math.sin(elapsedTime * 0.2) * 0.1;

        coreMesh.rotation.x = elapsedTime * 0.15;
        coreMesh.rotation.y = elapsedTime * 0.22;

        innerMesh.rotation.x = -elapsedTime * 0.25;
        innerMesh.rotation.z = elapsedTime * 0.18;

        ringMesh.rotation.z = elapsedTime * 0.12;

        renderer.render(scene, camera);
        animationFrameId = requestAnimationFrame(animate);
      };

      const startLoopIfActive = () => {
        if (isVisible && isPageVisible && animationFrameId === null) {
          clock.start();
          animate();
        }
      };

      const handleVisibilityChange = () => {
        isPageVisible = !document.hidden;
        if (isPageVisible) {
          startLoopIfActive();
        } else if (animationFrameId !== null) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      };
      document.addEventListener("visibilitychange", handleVisibilityChange);

      const observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible) {
            startLoopIfActive();
          } else if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        },
        { rootMargin: "100px" }
      );
      observer.observe(container);

      animate();

      return () => {
        observer.disconnect();
        document.removeEventListener("visibilitychange", handleVisibilityChange);
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
      console.warn("WebGL initialization fallback:", e);
      setWebGlSupported(false);
    }
  }, [interactive, prefersReducedMotion]);

  if (!webGlSupported || prefersReducedMotion) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-60" aria-hidden="true">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[90vw] sm:max-w-[600px] h-[350px] sm:h-[600px] rounded-full bg-[#D4AF37]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 left-1/3 w-full max-w-[80vw] sm:max-w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#B8860B]/10 blur-[100px]" />
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      aria-hidden="true"
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-80"
    />
  );
};

export default ThreeBackground;
