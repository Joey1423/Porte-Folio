const canvas = document.getElementById("bg-canvas");
if (!canvas) throw new Error("Canvas #bg-canvas introuvable.");

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Contexte 2D non disponible.");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

class Particle {
  constructor(x, y, directionX, directionY, size) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
  }

  update() {
    if (this.x + this.size > canvas.width || this.x - this.size < 0) this.directionX *= -1;
    if (this.y + this.size > canvas.height || this.y - this.size < 0) this.directionY *= -1;

    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

function init() {
  particlesArray = [];
  const numberOfParticles = Math.floor((canvas.width * canvas.height) / 15000);

  for (let i = 0; i < numberOfParticles; i++) {
    const size = Math.random() * 2 + 0.5;
    const x = Math.random() * (canvas.width - size * 2) + size;
    const y = Math.random() * (canvas.height - size * 2) + size;
    const directionX = Math.random() * 0.4 - 0.2;
    const directionY = Math.random() * 0.4 - 0.2;

    particlesArray.push(new Particle(x, y, directionX, directionY, size));
  }
}

function connect() {
  const maxDistance = (canvas.width / 7) * (canvas.height / 7);

  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a + 1; b < particlesArray.length; b++) {
      const dx = particlesArray[a].x - particlesArray[b].x;
      const dy = particlesArray[a].y - particlesArray[b].y;
      const distance = dx * dx + dy * dy;

      if (distance < maxDistance) {
        ctx.strokeStyle = "rgba(56, 189, 248, 0.05)";
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  requestAnimationFrame(animate);
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }

  connect();
}

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

init();
animate();