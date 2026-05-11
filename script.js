// Initialisation du canvas et du contexte 2D
const canvas = document.getElementById("bg-canvas");
if (!canvas) throw new Error("Canvas #bg-canvas introuvable.");

const ctx = canvas.getContext("2d");
if (!ctx) throw new Error("Contexte 2D non disponible.");

// Ajustement de la taille du canvas à la fenêtre
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Tableau pour stocker les particules
let particlesArray = [];

// Classe représentant une particule animée
class Particle {
  constructor(x, y, directionX, directionY, size) {
    this.x = x;
    this.y = y;
    this.directionX = directionX;
    this.directionY = directionY;
    this.size = size;
  }

  // Méthode pour dessiner la particule
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = "#38bdf8";
    ctx.fill();
  }

  // Méthode pour mettre à jour la position de la particule
  update() {
    // Rebondir sur les bords horizontaux
    if (this.x + this.size > canvas.width || this.x - this.size < 0) this.directionX *= -1;
    // Rebondir sur les bords verticaux
    if (this.y + this.size > canvas.height || this.y - this.size < 0) this.directionY *= -1;

    // Déplacer la particule
    this.x += this.directionX;
    this.y += this.directionY;
    this.draw();
  }
}

// Fonction pour initialiser les particules
function init() {
  particlesArray = [];
  // Calculer le nombre de particules basé sur la taille du canvas
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

// Fonction pour connecter les particules proches avec des lignes
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

// Fonction d'animation principale
function animate() {
  requestAnimationFrame(animate);
  // Effacer le canvas avec la couleur de fond
  ctx.fillStyle = "#0f172a";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Mettre à jour et dessiner chaque particule
  for (let i = 0; i < particlesArray.length; i++) {
    particlesArray[i].update();
  }

  // Dessiner les connexions entre particules
  connect();
}

// Événement pour redimensionner le canvas lors du changement de taille de fenêtre
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init(); // Réinitialiser les particules
});

// Initialisation et démarrage de l'animation
init();
animate();