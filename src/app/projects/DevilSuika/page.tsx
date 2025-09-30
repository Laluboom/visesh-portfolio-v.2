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
      <GameCanvas ref={gameRef} fruitDropX={fruitDropX} />

      <div
        className="absolute inset-0 z-10"
        onClick={handleCanvasClick}
      />

      <div className="absolute z-20 flex flex-col gap-3 top-4 right-4">
        <button
          onClick={() => gameRef.current?.dropFruit()}
          className="px-4 py-2 text-white bg-green-600 rounded-md shadow hover:bg-green-700"
        >
          🍒 Drop Fruit
        </button>
        <button
          onClick={() => gameRef.current?.reset()}
          className="px-4 py-2 text-white bg-red-600 rounded-md shadow hover:bg-red-700"
        >
          🔄 Reset
        </button>
      </div>
    </div>
  );
}
