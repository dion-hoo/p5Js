let snows = [];
let attractor;

class Attractor {
    constructor() {
        this.EARTHMASS = 0.2;
        this.location = createVector(0, height);
    }

    attract(mover) {
        const G = 1;
        const vector = p5.Vector.sub(this.location, mover.location);
        const distance = vector.mag();

        const strength = (G * mover.radius * this.EARTHMASS) / sqrt(distance);

        vector.normalize();
        vector.mult(strength);

        return vector;
    }
}

class SnowFlakes {
    constructor() {
        this.location = createVector(width / 2, random(-50, 0));
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.mass = 1;
        this.radius = this.mass * random(2, 5);
        this.snowRadius = sqrt(random(pow(width / 2, 2)));
        this.angle = random(TWO_PI);
    }

    applyForce(force) {
        const f = p5.Vector.div(force, this.radius);

        this.acceleration.add(f);
    }

    update(time) {
        // this.velocity.add(this.acceleration);
        // this.location.add(this.velocity);
        this.acceleration.mult(0);

        const angle = time * 0.3 + this.angle;

        this.location.x = width / 2 + sin(angle) * this.snowRadius;
        this.location.y += pow(this.radius, 0.5);

        if (this.location.y > height) {
            const index = snows.indexOf(this);
            snows.splice(index, 1);
        }
    }

    draw() {
        ellipse(this.location.x, this.location.y, this.radius);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    noStroke();
    fill('#fff');

    attractor = new Attractor();
}

function draw() {
    background('#000');

    for (let i = 0; i < 3; i++) {
        snows.push(new SnowFlakes());
    }

    for (let snow of snows) {
        const time = frameCount / 60;
        const force = attractor.attract(snow);
        const wind = createVector(9000, 0);

        snow.applyForce(force);
        snow.applyForce(wind);
        snow.update(time);
        snow.draw();
    }
}
