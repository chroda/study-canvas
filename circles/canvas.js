var canvas = document.querySelector("canvas");
var c = canvas.getContext("2d");

var settings = {
  mouse: {
    x: undefined,
    y: undefined,
  },
  circleArray: [],
  maxRadius: 50,
  distanceMouse: 50,
  velocity: 1,
  colorArray: ["#F24B99", "#F2DCC9", "#F27F3D", "#D94625", "#8C2E2E"],
};

window.addEventListener("resize", function () {
  init();
});

window.addEventListener("mousemove", function (event) {
  settings.mouse.x = event.x;
  settings.mouse.y = event.y;
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.color =
    settings.colorArray[Math.floor(Math.random() * settings.colorArray.length)];

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    c.fillStyle = this.color;
    c.fill();
    c.stroke();
  };

  this.update = function () {
    if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
      this.dx = -this.dx;
    }
    if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    // interactivity
    if (
      settings.mouse.x - this.x < settings.distanceMouse &&
      settings.mouse.x - this.x > -settings.distanceMouse &&
      settings.mouse.y - this.y < settings.distanceMouse &&
      settings.mouse.y - this.y > -settings.distanceMouse
    ) {
      if (this.radius < settings.maxRadius) {
        this.radius += 1;
      }
    } else if (this.radius > this.minRadius) {
      this.radius -= 1;
    }

    this.draw();
  };
}

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, innerWidth, innerHeight);

  settings.circleArray.map((cicle) => {
    cicle.update();
  });
}

function init() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  settings.circleArray = [];
  for (let i = 0; i < 1000; i++) {
    r = Math.ceil(Math.random() * 9);
    x = Math.random() * (innerWidth - r * 2) + r;
    y = Math.random() * (innerHeight - r * 2) + r;
    dx = (Math.random() - 0.5) * settings.velocity;
    dy = (Math.random() - 0.5) * settings.velocity;

    settings.circleArray.push(new Circle(x, y, dx, dy, r));
  }

  animate();
}

init();
