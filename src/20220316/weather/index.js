let rain = [],
    earth = [];

class Earth {
    constructor(x) {
        this.location = createVector(x, height);
        this.mass = 100;
    }

    attract(object) {
        const G = 1.1;
        const force = p5.Vector.sub(this.location, object.location2);
        const distance = force.mag(); // 크기

        const strength = (G * this.mass * object.mass) / sqrt(distance);

        force.normalize(); // 방향

        return force.mult(strength);
    }
}

class Rain {
    constructor(x, y, mass) {
        this.location1 = createVector(x, y);
        this.location2 = createVector(x, sqrt(y));
        this.velocity = createVector(0, 10);
        this.acceleration = createVector(0, 0);
        this.mass = mass;
    }

    applyForce(force) {
        const f = p5.Vector.div(force, this.mass);

        this.acceleration.add(f);
    }

    update() {
        const velocity = this.velocity.copy();

        velocity.add(this.acceleration);

        this.location1.add(velocity);
        this.location2.add(velocity);
        this.acceleration.mult(0);
    }

    edgeCheck() {
        if (this.location2.y < 0 || this.location2.y > height) {
            this.velocity.y *= -1;
        }
    }

    draw() {
        stroke('#fff');
        line(this.location1.x, this.location1.y, this.location2.x, this.location2.y);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    for (let i = 0; i < 100; i++) {
        const x = random(width);
        const y = random(5, 40);
        const mass = random(100, 200);
        rain.push(new Rain(x, y, mass));
        earth.push(new Earth(x));
    }
}

function draw() {
    background(0);

    for (let i = 0; i < rain.length; i++) {
        const gravity = earth[i].attract(rain[i]);

        rain[i].applyForce(gravity);
        rain[i].update();
        rain[i].edgeCheck();
        rain[i].draw();
    }
}
