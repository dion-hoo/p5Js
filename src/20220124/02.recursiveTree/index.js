let size = 0;
let theta = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);
    stroke('rgba(255, 255, 0, 0.3)');

    if (size < height * 0.25) {
        size += frameCount / 60;
    }

    let angle = 30;

    theta = radians(angle);
    translate(width / 2, height); // 기준점 옮기기

    line(0, 0, 0, -size);
    translate(0, -size);
    branch(size);
}

function branch(h) {
    h *= 0.6;

    let b = int(map(h, size, 2, 255, 100));

    stroke(`rgba(255, ${b}, 0, 0.3)`);

    if (h > 2) {
        push();
        rotate(theta);
        line(0, 0, 0, -h);
        translate(0, -h);
        branch(h);
        pop();

        push();
        rotate(-theta);
        line(0, 0, 0, -h);
        translate(0, -h);
        branch(h);
        pop();
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
