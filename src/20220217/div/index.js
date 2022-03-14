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
    mouse.div(2);

    translate(width / 2, height / 2);
    line(0, 0, mouse.x, mouse.y);
}
