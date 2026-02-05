'use client'

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import * as THREE from "three";

const adIslands = [
  { label: "Ad Island A", href: "/contact" },
  { label: "Ad Island B", href: "/contact" },
  { label: "Ad Island C", href: "/contact" },
  { label: "Ad Island D", href: "/contact" }
];

type IslandData = {
  mesh: THREE.Mesh;
  href: string;
};

export default function ShipGamePage() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const islandsRef = useRef<IslandData[]>([]);
  const boatRef = useRef<THREE.Group | null>(null);
  const keysRef = useRef<Record<string, boolean>>({});
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const scoreRef = useRef(0);
  const gameOverRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog("#bfe9ff", 30, 180);

    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 400);
    camera.position.set(0, 8, 18);
    camera.lookAt(0, 2, -10);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor("#bfe9ff", 1);
    rendererRef.current = renderer;
    container.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight("#ffffff", 0.9);
    scene.add(ambient);

    const sun = new THREE.DirectionalLight("#fff6d5", 1.2);
    sun.position.set(30, 40, 20);
    scene.add(sun);

    const oceanGeometry = new THREE.PlaneGeometry(600, 600, 60, 60);
    const oceanMaterial = new THREE.MeshPhongMaterial({
      color: "#4aa3d3",
      flatShading: true,
      shininess: 60
    });
    const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
    ocean.rotation.x = -Math.PI / 2;
    ocean.position.y = -1.5;
    scene.add(ocean);

    const boat = new THREE.Group();
    const hull = new THREE.Mesh(
      new THREE.CylinderGeometry(0.9, 1.4, 4, 20, 1, false),
      new THREE.MeshStandardMaterial({ color: "#1d1d1b", metalness: 0.2, roughness: 0.6 })
    );
    hull.rotation.z = Math.PI / 2;
    hull.position.y = 0.2;
    const mast = new THREE.Mesh(
      new THREE.CylinderGeometry(0.08, 0.1, 3, 10),
      new THREE.MeshStandardMaterial({ color: "#ffffff" })
    );
    mast.position.set(0, 2, 0);
    const sail = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 2.2, 2.2),
      new THREE.MeshStandardMaterial({ color: "#ffffff", transparent: true, opacity: 0.9 })
    );
    sail.position.set(0.6, 1.8, 0);
    boat.add(hull, mast, sail);
    boat.position.set(0, 0, 4);
    scene.add(boat);
    boatRef.current = boat;

    const createIsland = (x: number, z: number, label: string, href: string) => {
      const island = new THREE.Group();
      const base = new THREE.Mesh(
        new THREE.SphereGeometry(2.6, 24, 24),
        new THREE.MeshStandardMaterial({ color: "#f7d7a1", roughness: 0.9 })
      );
      base.scale.set(1.4, 0.55, 1.2);
      base.position.y = -0.3;

      const palm = new THREE.Mesh(
        new THREE.CylinderGeometry(0.1, 0.18, 2.2, 8),
        new THREE.MeshStandardMaterial({ color: "#2f6f45" })
      );
      palm.position.set(-0.4, 1.2, 0);

      const crown = new THREE.Mesh(
        new THREE.SphereGeometry(0.8, 14, 14),
        new THREE.MeshStandardMaterial({ color: "#2bb673" })
      );
      crown.position.set(-0.4, 2.3, 0);

      const sign = new THREE.Mesh(
        new THREE.BoxGeometry(1.2, 0.5, 0.1),
        new THREE.MeshStandardMaterial({ color: "#ffffff" })
      );
      sign.position.set(0.9, 0.6, 0);

      island.add(base, palm, crown, sign);
      island.position.set(x, -0.7, z);
      island.name = label;

      const islandMesh = new THREE.Mesh(
        new THREE.CircleGeometry(2.6, 18),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0 })
      );
      islandMesh.rotation.x = -Math.PI / 2;
      islandMesh.position.y = -0.8;
      islandMesh.name = label;
      islandMesh.userData = { href };

      scene.add(island, islandMesh);
      return islandMesh;
    };

    const islandMeshes: IslandData[] = [];
    const initialPositions = [
      { x: -10, z: -20 },
      { x: 8, z: -35 },
      { x: -6, z: -55 },
      { x: 12, z: -70 }
    ];

    adIslands.forEach((ad, idx) => {
      const pos = initialPositions[idx % initialPositions.length];
      const mesh = createIsland(pos.x, pos.z, ad.label, ad.href);
      islandMeshes.push({ mesh, href: ad.href });
    });

    islandsRef.current = islandMeshes;

    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    const handleClick = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      const intersects = raycaster.intersectObjects(islandsRef.current.map((island) => island.mesh));
      if (intersects.length > 0) {
        const hit = intersects[0].object as THREE.Mesh;
        const href = hit.userData?.href as string | undefined;
        if (href) window.location.href = href;
      }
    };

    renderer.domElement.addEventListener("click", handleClick);

    const resize = () => {
      const width = container.clientWidth;
      const height = Math.min(680, Math.max(520, window.innerHeight * 0.68));
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };

    resize();
    window.addEventListener("resize", resize);

    let frame = 0;
    let localScore = 0;

    const animate = () => {
      frame += 1;

      if (!gameOverRef.current) {
        localScore += 1;
        if (localScore % 20 === 0) {
          scoreRef.current += 10;
          setScore(scoreRef.current);
        }
      }

      const boat = boatRef.current;
      if (boat) {
        const steer = (keysRef.current["ArrowLeft"] || keysRef.current["a"]) ? -1 : (keysRef.current["ArrowRight"] || keysRef.current["d"]) ? 1 : 0;
        const forward = (keysRef.current["ArrowUp"] || keysRef.current["w"]) ? 1 : (keysRef.current["ArrowDown"] || keysRef.current["s"]) ? -1 : 0;
        boat.position.x = THREE.MathUtils.clamp(boat.position.x + steer * 0.35, -12, 12);
        boat.position.z = THREE.MathUtils.clamp(boat.position.z - forward * 0.35, -6, 8);
        boat.rotation.z = steer * -0.18;
        boat.rotation.x = Math.sin(frame * 0.04) * 0.04;
      }

      oceanGeometry.attributes.position.needsUpdate = true;
      const positions = oceanGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < positions.count; i += 1) {
        const y = Math.sin((i + frame) * 0.03) * 0.08;
        positions.setY(i, y);
      }

      islandMeshes.forEach((island, idx) => {
        island.mesh.position.z += 0.25 + idx * 0.02;
        if (island.mesh.position.z > 14) {
          island.mesh.position.z = -90 - Math.random() * 60;
          island.mesh.position.x = -12 + Math.random() * 24;
        }
      });

      if (!gameOverRef.current && boat) {
        for (const island of islandMeshes) {
          const distance = boat.position.distanceTo(island.mesh.position);
          if (distance < 3.2) {
            gameOverRef.current = true;
            setGameOver(true);
            setBest((prev) => Math.max(prev, scoreRef.current));
            break;
          }
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      keysRef.current[event.key] = true;
      if (event.key === " " && gameOverRef.current) {
        gameOverRef.current = false;
        setGameOver(false);
        scoreRef.current = 0;
        setScore(0);
        localScore = 0;
        if (boatRef.current) boatRef.current.position.set(0, 0, 4);
        islandMeshes.forEach((island) => {
          island.mesh.position.z = -20 - Math.random() * 80;
          island.mesh.position.x = -12 + Math.random() * 24;
        });
      }
    };

    const onKeyUp = (event: KeyboardEvent) => {
      keysRef.current[event.key] = false;
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    animate();

    return () => {
      renderer.domElement.removeEventListener("click", handleClick);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#f6fbff] dark:bg-[#0c1416]">
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-widest text-[#4f7a8a] dark:text-[#9bc7d6]">3D ship game</p>
              <h1 className="mt-3 text-4xl md:text-5xl font-semibold text-[#0f2a35] dark:text-white font-display">
                High‑quality Ship Game with ad islands.
              </h1>
              <p className="mt-4 text-lg text-[#35535f] dark:text-[#c7dbe3] max-w-2xl">
                Steer with arrows or WASD. Click islands to open ad links. Press Space to restart after a crash.
              </p>
            </div>
            <div className="flex gap-4">
              <Link
                href="/games"
                className="px-5 py-3 rounded-full border border-[#0f2a35]/20 text-[#0f2a35] font-semibold hover:border-[#0f2a35] hover:bg-white/70 transition dark:text-white dark:border-white/20 dark:hover:bg-white/10"
              >
                Back to Games
              </Link>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="relative rounded-[32px] border border-[#0f2a35]/10 bg-white/70 p-6 shadow-[0_30px_80px_-45px_rgba(10,41,52,0.4)] dark:bg-white/5 dark:border-white/10">
              <div className="absolute left-6 top-6 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#0f2a35] shadow-sm">
                Score: {score}
              </div>
              <div className="absolute right-6 top-6 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#0f2a35] shadow-sm">
                Best: {best}
              </div>

              <div ref={containerRef} className="relative" />

              {gameOver && (
                <div className="absolute inset-0 flex items-center justify-center rounded-[32px] bg-[#0f2a35]/70 text-white">
                  <div className="rounded-3xl bg-[#0f2a35] px-8 py-6 text-center shadow-xl">
                    <h2 className="text-2xl font-semibold">Game Over</h2>
                    <p className="mt-2 text-sm text-[#c7dbe3]">Press Space to restart</p>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-5">
              <div className="rounded-3xl border border-[#0f2a35]/10 bg-white px-6 py-5 shadow-sm dark:bg-white/10 dark:border-white/10">
                <h3 className="text-lg font-semibold text-[#0f2a35] dark:text-white">Ad Islands</h3>
                <p className="mt-2 text-sm text-[#4f7a8a] dark:text-[#b7d6e0]">
                  Each island is clickable in the 3D scene. Replace the links below with your sponsors.
                </p>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  {adIslands.map((slot) => (
                    <Link
                      key={slot.label}
                      href={slot.href}
                      className="rounded-2xl border border-[#0f2a35]/10 bg-[#f6fbff] px-3 py-2 text-xs font-semibold text-[#0f2a35] hover:bg-white transition dark:bg-white/10 dark:text-white"
                    >
                      {slot.label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-3xl border border-[#0f2a35]/10 bg-white px-6 py-5 shadow-sm dark:bg-white/10 dark:border-white/10">
                <h3 className="text-lg font-semibold text-[#0f2a35] dark:text-white">Game Tips</h3>
                <ul className="mt-3 text-sm text-[#4f7a8a] dark:text-[#b7d6e0] space-y-2">
                  <li>Keep your ship centered for a wider view.</li>
                  <li>Click islands in the scene to open ads.</li>
                  <li>Dodge islands to keep your streak going.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
