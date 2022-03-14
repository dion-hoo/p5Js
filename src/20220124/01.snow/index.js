const snowflake = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);

    let time = frameCount / 60;

    for (let i = 0; i < random(5); i++) {
        snowflake.push(new Snow());
    }

    for (let snow of snowflake) {
        snow.update(time);
        snow.draw();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Snow {
    constructor() {
        this.x = 0;
        this.y = random(-50, 0);
        this.size = random(3, 6);
        this.angle = random(TWO_PI);
        this.radius = sqrt(random(pow(width / 2, 2)));
        this.r = 255;
        this.g = 255;
        this.b = 100;
        this.alpha = 1;
    }

    update(time) {
        let w = 0.3;
        let angle = w * time + this.angle;
        this.x = width / 2 + sin(angle) * this.radius;
        this.y += pow(this.size, 0.5);

        if (this.y > height) {
            let index = snowflake.indexOf(this);
            snowflake.splice(index, 0.01);
        }

        if (this.y > height * 0.7) {
            this.r = int(map(this.y, height * 0.5, height, 0, 200));
            this.g = int(map(this.y, height * 0.5, height, 0, 100));
        }

        if (this.y > height * 0.9) {
            this.alpha -= 0.01;
            if (this.alpha < 0) {
                this.alpha = 0;
            }
        }

        fill(`rgba(${this.r}, ${this.g}, ${this.b}, ${this.alpha})`);
    }

    draw() {
        ellipse(this.x, this.y, this.size, this.size * 0.9);
    }
}
