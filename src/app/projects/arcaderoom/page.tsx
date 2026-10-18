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
      <h1 className="box absolute z-10 bg-white text-2xl font-bold text-black top-4 left-4">🕹️ Arcade Room</h1>

      <div className="box absolute left-4 top-16 z-10 max-w-sm bg-white text-sm text-black">
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
