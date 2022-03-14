class Vector {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    sub(v) {
        this.x -= v.x;
        this.y -= v.y;
    }

    mult(s) {
        this.x *= s;
        this.y *= s;
    }
}

let mouse, center;
function setup() {
    createCanvas(windowWidth, windowHeight);

    center = new Vector(width / 2, height / 2);

    fill(0);
}

function draw() {
    background(255);

    mouse = new Vector(mouseX, mouseY);

    mouse.sub(center);
    mouse.mult(4);

    translate(width / 2, height / 2);
    line(0, 0, mouse.x, mouse.y);
}
