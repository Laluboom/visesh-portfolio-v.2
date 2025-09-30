'use client';

export default function GameUI() {
  const handleDrop = () => {
    (window as any).dropFruit?.(); // calls the function we exposed
  };

  return (
    <div className="absolute left-0 right-0 flex justify-center gap-4 bottom-4">
      <button
        onClick={handleDrop}
        className="px-4 py-2 font-semibold text-white transition-all bg-green-500 rounded shadow hover:bg-green-600"
      >
        Drop Fruit 🍏
      </button>
      <button
        className="px-4 py-2 font-semibold text-white transition-all bg-red-500 rounded shadow hover:bg-red-600"
      >
        Reset 🔁
      </button>
    </div>
  );
}
