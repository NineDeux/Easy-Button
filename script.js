const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the screen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Car properties
const car = {
  x: canvas.width / 2,
  y: canvas.height / 2,
  width: 50,
  height: 30,
  angle: 0,
  speed: 0
};

// Key states
const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false
};

// Event listeners for keypresses
document.addEventListener('keydown', (e) => {
  if (keys[e.key] !== undefined) keys[e.key] = true;
});

document.addEventListener('keyup', (e) => {
  if (keys[e.key] !== undefined) keys[e.key] = false;
});

// Game loop
function gameLoop() {
  update();
  draw();
  requestAnimationFrame(gameLoop);
}

// Update car position and rotation
function update() {
  if (keys.ArrowUp) car.speed = 5;
  else if (keys.ArrowDown) car.speed = -5;
  else car.speed = 0;

  if (keys.ArrowLeft) car.angle -= 0.05;
  if (keys.ArrowRight) car.angle += 0.05;

  // Update car position based on speed and angle
  car.x += Math.cos(car.angle) * car.speed;
  car.y += Math.sin(car.angle) * car.speed;

  // Prevent the car from going off-screen
  car.x = Math.max(0, Math.min(canvas.width, car.x));
  car.y = Math.max(0, Math.min(canvas.height, car.y));
}

// Draw everything on the canvas
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the car
  ctx.save();
  ctx.translate(car.x, car.y);
  ctx.rotate(car.angle);
  ctx.fillStyle = 'red';
  ctx.fillRect(-car.width / 2, -car.height / 2, car.width, car.height);
  ctx.restore();
}

// Start the game
gameLoop();
