'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment } from '@react-three/drei';
import { Suspense } from 'react';

function ArcadeModel() {
  const { scene } = useGLTF('/room/arcade.glb');
  return <primitive object={scene} scale={1.5} />;
}

export default function ArcadePage() {
  return (
    <div className="w-full h-screen text-white bg-black">
      <h1 className="absolute z-10 text-2xl font-bold top-4 left-4">🕹️ Arcade Room</h1>

      <div className="absolute left-4 top-16 z-10 max-w-sm rounded-lg border border-white/10 bg-[#111]/90 px-4 py-2 text-sm text-gray-300 backdrop-blur-sm">
        ⚠️ Known issue: the environment lighting (HDRI) loads from a remote CDN with no
        fallback, so this canvas can come up blank/black on load. That&apos;s a known bug, not
        your browser.
      </div>

      <Canvas camera={{ position: [2, 2, 5], fov: 50 }}>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1.5} />
          <Environment preset="sunset" />
          <OrbitControls />
          <ArcadeModel />
        </Suspense>
      </Canvas>
    </div>
  );
}
