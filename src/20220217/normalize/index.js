let mouse, center;

function setup() {
    createCanvas(windowWidth, windowHeight);

    center = createVector(width / 2, height / 2);

    fill(0);
}

function draw() {
    background(255);

    mouse = createVector(mouseX, mouseY);
    mouse.sub(center);

    let m = mouse.mag();
    fill(0);
    rect(0, 0, m, 10);

    mouse.normalize();
    mouse.mult(50);

    translate(width / 2, height / 2);
    line(0, 0, mouse.x, mouse.y);
}
