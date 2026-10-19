'use client';

import { useRef, useState } from 'react';
import GameCanvas, { GameCanvasHandle } from './GameCanvas';

export default function SuikaPage() {
  const gameRef = useRef<GameCanvasHandle>(null);
  const [fruitDropX, setFruitDropX] = useState(200); // default drop x

  const handleCanvasClick = (e: React.MouseEvent) => {
    const rect = (e.target as HTMLCanvasElement).getBoundingClientRect();
    const x = e.clientX - rect.left;
    setFruitDropX(x);
  };

  return (
    <div className="relative w-full min-h-screen overflow-hidden">
      <div className="box absolute left-1/2 top-4 z-30 max-w-md -translate-x-1/2 bg-white text-center text-sm text-black">
        Known issue: fruit can&apos;t currently merge on a straight drop. See{' '}
        <code>todo.md</code>.
      </div>

      <GameCanvas ref={gameRef} fruitDropX={fruitDropX} />

      <div
        className="absolute inset-0 z-10"
        onClick={handleCanvasClick}
      />

      <div className="absolute z-20 flex flex-col gap-3 top-4 right-4">
        <button
          onClick={() => gameRef.current?.dropFruit()}
          className="btn"
        >
          Drop Fruit
        </button>
        <button
          onClick={() => gameRef.current?.reset()}
          className="btn"
        >
          Reset
        </button>
      </div>
    </div>
  );
}
