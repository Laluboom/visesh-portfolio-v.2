export type FruitType = {
  name: string;
  color: string;
  radius: number;
};

export const fruitTypes: FruitType[] = [
  { name: 'Cherry', color: '#ff4d4d', radius: 12 },
  { name: 'Strawberry', color: '#ff7070', radius: 16 },
  { name: 'Orange', color: '#ffa500', radius: 20 },
  { name: 'Apple', color: '#88cc00', radius: 26 },
  { name: 'Melon', color: '#00cc88', radius: 32 },
  { name: 'Watermelon', color: '#00ffff', radius: 40 },
];

export class Fruit {
  x: number;
  y: number;
  vx: number = 0;
  vy: number = 0;
  type: FruitType;
  radius: number;

  constructor(x: number, y: number, typeIndex = 0) {
    this.x = x;
    this.y = y;
    this.type = fruitTypes[typeIndex];
    this.radius = this.type.radius;
  }

  update(dt: number, canvasHeight: number) {
    const gravity = 500; // pixels per second²
    this.vy += gravity * dt;

    this.y += this.vy * dt;

    // Floor collision
    const bottom = canvasHeight - this.radius;
    if (this.y > bottom) {
      this.y = bottom;
      this.vy *= -0.4; // bounce with damping
      if (Math.abs(this.vy) < 5) this.vy = 0; // stop small bounces
    }
    this.x += this.vx * dt;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.fillStyle = this.type.color;
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
  }

  resolveCollision(other: Fruit) {
  const dx = this.x - other.x;
  const dy = this.y - other.y;
  const dist = Math.sqrt(dx * dx + dy * dy);
  const minDist = this.radius + other.radius;

  if (dist < minDist && dist !== 0) {
    const overlap = minDist - dist;
    const nx = dx / dist;
    const ny = dy / dist;

    // Move fruits apart equally
    this.x += (nx * overlap) / 2;
    this.y += (ny * overlap) / 2;
    other.x -= (nx * overlap) / 2;
    other.y -= (ny * overlap) / 2;

    // Basic bounce effect
    const bounceFactor = 0.4;
    const vxTotal = this.vx - other.vx;
    const vyTotal = this.vy - other.vy;

    this.vx -= bounceFactor * vxTotal;
    this.vy -= bounceFactor * vyTotal;
    other.vx += bounceFactor * vxTotal;
    other.vy += bounceFactor * vyTotal;
    }
  }

}
