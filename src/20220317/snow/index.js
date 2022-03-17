let snows = [],
    time,
    wind,
    pressed = false,
    mouse = {};

class Wind {
    constructor() {
        this.force = createVector(0, 0);
        this.mass = 10;
    }

    attract(object) {
        const G = 1;
        const force = p5.Vector.sub(mouse, object.location);
        const distance = force.mag();

        const strength = (G * this.mass * object.mass) / sqrt(distance);

        force.normalize();
        force.mult(strength);

        return force;
    }
}

class Snow {
    constructor() {
        this.mass = random(2, 5);
        this.location = createVector(0, random(-50, 0));
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, this.mass);
        this.range = random(width / 2);
        this.angle = random(TWO_PI);
    }

    applyForce(force) {
        const f = p5.Vector.div(force, this.mass);

        this.acceleration.add(f);
    }

    update(time) {
        const angle = time * 0.3 + this.angle;

        this.velocity.add(this.acceleration);

        this.location.x = width / 2 + sin(angle) * this.range + this.velocity.x;
        this.location.y += this.velocity.y;

        this.acceleration.mult(0);

        if (this.location.y > height) {
            const index = snows.indexOf(this);
            snows.splice(index, 1);
        }
    }

    draw() {
        ellipse(this.location.x, this.location.y, this.mass);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    wind = new Wind();
}

function draw() {
    background(0);

    let time = frameCount / 60;

    for (let i = 0; i < random(5); i++) {
        snows.push(new Snow());
    }

    for (let snow of snows) {
        if (pressed) {
            const force = wind.attract(snow);

            snow.applyForce(force);
        }
        snow.update(time);
        snow.draw();
    }
}

function mousePressed() {
    pressed = true;
    mouse = createVector(mouseX, mouseY);
}

function mouseReleased() {
    pressed = false;
}
