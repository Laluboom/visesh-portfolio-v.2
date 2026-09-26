'use client';

import { useRef, useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { Fruit, fruitTypes } from './Fruits';

export type GameCanvasHandle = {
  dropFruit: () => void;
  reset: () => void;
};

type Props = {
  fruitDropX: number;
};

const GameCanvas = forwardRef<GameCanvasHandle, Props>(({ fruitDropX }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fruitsRef = useRef<Fruit[]>([]);
  const [mouseX, setMouseX] = useState<number | null>(null);


  const dropFruit = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const x = Math.max(30, Math.min(canvas.width - 30, fruitDropX)); // prevent drop at edge
    const y = 50;
    const newFruit = new Fruit(x, y, 0);
    fruitsRef.current.push(newFruit);
  };

  const reset = () => {
    fruitsRef.current = [];
  };

  useImperativeHandle(ref, () => ({
    dropFruit,
    reset
  }));

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const handleMouseMove = (e: MouseEvent) => {
    const rect = canvas.getBoundingClientRect();
    setMouseX(e.clientX - rect.left);
  };

  const resizeCanvas = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  };

  resizeCanvas(); // Initial call
  window.addEventListener('resize', resizeCanvas);
  canvas.addEventListener('mousemove', handleMouseMove);

  let lastTime = performance.now();

  const draw = (time: number) => {
    const dt = (time - lastTime) / 1000;
    lastTime = time;

    const fruits = fruitsRef.current;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (mouseX !== null) {
      const previewFruit = new Fruit(mouseX, 50, 0);
      ctx.globalAlpha = 0.4;
      previewFruit.draw(ctx);
      ctx.globalAlpha = 1.0;
    }

    fruits.forEach(f => f.update(dt, canvas.height));
    for (let i = 0; i < fruits.length; i++) {
      for (let j = i + 1; j < fruits.length; j++) {
        fruits[i].resolveCollision(fruits[j]);
      }
    }

    const mergedIndices = new Set<number>();
    const newFruits: Fruit[] = [];

    for (let i = 0; i < fruits.length; i++) {
      for (let j = i + 1; j < fruits.length; j++) {
        const a = fruits[i], b = fruits[j];
        if (a.type === b.type && !mergedIndices.has(i) && !mergedIndices.has(j)) {
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          const minDist = a.radius + b.radius;

          if (dist < minDist + 0.5) {
            const nextIndex = fruitTypes.findIndex(f => f.name === a.type.name) + 1;
            if (nextIndex < fruitTypes.length) {
              mergedIndices.add(i);
              mergedIndices.add(j);

              const merged = new Fruit((a.x + b.x) / 2, (a.y + b.y) / 2 - 10, nextIndex);
              merged.vy = -200;
              newFruits.push(merged);
            }
          }
        }
      }
    }

    const remaining = fruits.filter((_, idx) => !mergedIndices.has(idx));
    fruitsRef.current = [...remaining, ...newFruits];
    fruitsRef.current.forEach(f => f.draw(ctx));

    requestAnimationFrame(draw);
  };

  draw(lastTime); // 🔁 Start loop

  return () => {
    window.removeEventListener('resize', resizeCanvas);
    canvas.removeEventListener('mousemove', handleMouseMove);
  };
}, [mouseX]);

  return (
  <div className="flex items-center justify-center min-h-screen p-4 bg-black">
    <canvas ref={canvasRef} className="w-[90vw] h-[90vh] max-w-[800px] max-h-[90vh] border-4 border-white rounded-lg shadow-lg"/>
  </div>
  );
});

export default GameCanvas;