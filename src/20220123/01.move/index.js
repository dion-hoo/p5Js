const position = [0, 0]; // 월래 위치
const target = [0, 0]; // 타켓 위치
const distance = [0, 0]; // 타켓과 월래 위치 사이의 거리

function setup() {
    createCanvas(windowWidth, windowHeight);

    fill(255);
    stroke(255);

    position[0] = width / 2;
    position[1] = height / 2;
}

function draw() {
    background(0);

    if (abs(target[0] - position[0]) >= abs(distance[0])) {
        position[0] += distance[0];
        position[1] += distance[1];
    }

    translate(position[0], position[1]);
    ellipse(0, 0, 50, 50);
}

function mouseClicked() {
    target[0] = mouseX;
    target[1] = mouseY;

    // 0.02이라는 수치를 곱한 이유는
    // 타켓 위치에서 월래 위치를 뺀 만큼의 거리를 1/50만큼 나누어서 가는 것이다.
    // 이렇게 하는 이유는 자연 스러운 애니메이션을 위해서이다.
    // 애니메이션의 기본이 한 동작을 그리고 지우고를 여러번 반복해서 어떤 물체가 움직이는 것처럼 보이는 것이기 때문에
    // 월래 길이의 1/50 or 1/n로 움직여서 애니메이션의 속도를 조절할 수 있다.

    distance[0] = (target[0] - position[0]) * 0.02;
    distance[1] = (target[1] - position[1]) * 0.02;
}
