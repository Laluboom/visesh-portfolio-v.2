'use client';

export default function GameUI() {
  const handleDrop = () => {
    (window as any).dropFruit?.(); // calls the function we exposed
  };

  return (
    <div className="absolute left-0 right-0 flex justify-center gap-4 bottom-4">
      <button
        onClick={handleDrop}
        className="btn"
      >
        Drop Fruit 🍏
      </button>
      <button
        className="btn"
      >
        Reset 🔁
      </button>
    </div>
  );
}
