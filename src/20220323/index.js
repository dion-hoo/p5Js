let snow = [];
let period = 120;

class snowFlower {
    constructor() {
        this.location = createVector(0, random(-50, 0));
        this.angle = random(TWO_PI);
        this.aVelocity = 0.3;
        this.amplitude = sqrt(random(pow(width / 2, 2))); // 진폭
        this.size = random(2, 5);
    }

    update(time) {
        let angle = time * this.aVelocity + this.angle;

        this.location.x = width / 2 + sin(angle) * this.amplitude;
        this.location.y += pow(this.size, 0.5);

        if (this.location.y > height) {
            const index = snow.indexOf(this);
            snow.splice(index, 1);
        }
    }

    draw() {
        ellipse(this.location.x, this.location.y, this.size);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    noStroke();
    fill('#fff');
}

function draw() {
    background('#000');

    for (let i = 0; i < 5; i++) {
        snow.push(new snowFlower());
    }

    for (let s of snow) {
        s.update(frameCount / period);
        s.draw();
    }
}
