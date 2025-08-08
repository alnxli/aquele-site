const canvas = document.getElementById("heartCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const messageEl = document.getElementById("message");

function heartFunction(t) {
  const x = 16 * Math.pow(Math.sin(t), 3);
  const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
  return { x, y };
}

function getRandomEdgePosition() {
  const edge = Math.floor(Math.random() * 4);
  switch (edge) {
    case 0: return { x: Math.random() * canvas.width, y: 0 }; // Top
    case 1: return { x: canvas.width, y: Math.random() * canvas.height }; // Right
    case 2: return { x: Math.random() * canvas.width, y: canvas.height }; // Bottom
    case 3: return { x: 0, y: Math.random() * canvas.height }; // Left
  }
}

for (let i = 0; i < 500; i++) {
  const t = Math.random() * Math.PI * 2;
  const heart = heartFunction(t);
  const targetX = canvas.width / 2 + heart.x * 15;
  const targetY = canvas.height / 2 - heart.y * 15;
  const start = getRandomEdgePosition();

  particles.push({
    x: start.x,
    y: start.y,
    dx: targetX,
    dy: targetY,
    size: 2,
    alpha: 0
  });
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let allArrived = true;

  for (let p of particles) {
    const dx = (p.dx - p.x) * 0.05;
    const dy = (p.dy - p.y) * 0.05;

    if (Math.abs(dx) > 0.1 || Math.abs(dy) > 0.1) {
      p.x += dx;
      p.y += dy;
      p.alpha = Math.min(p.alpha + 0.03, 1);
      allArrived = false;
    }

    ctx.fillStyle = `rgba(255, 0, 0, ${p.alpha})`;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!allArrived) {
    requestAnimationFrame(animate);
  } else {
    showMessage();
  }
}

function showMessage() {
  const messages = [
    "Oi, Luisa, meu amor",
    "Esse é meu jeito de dizer",
    "TE AMO!!!",
    "Obrigado por estar comigo sempre",
    "Você é luz.",
    "Você é incrível, obrigado por existir",
    "Obrigado por você ser sempre você, meu bem", 
  ];

  let index = 0;

  function showNext() {
    if (index < messages.length) {
      messageEl.textContent = messages[index];
      messageEl.style.opacity = 1;

      setTimeout(() => {
        messageEl.style.opacity = 0;
        index++;
        setTimeout(showNext, 2000);
      }, 3000);
    }
  }

  showNext();
}

animate();
