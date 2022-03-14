function setup() {
    createCanvas(800, 800);

    background(0);
    noStroke();
}

function draw() {
    fill(129, 0, 114);
    for (let i = 0; i < height; i += 20) {
        for (let j = i; j < height; j++) {
            ellipse(j, i, 10, 10);
        }

        // fill(255);
        // ellipse(i, 0, 10, height);
    }
}
