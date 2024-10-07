const basket = document.getElementById('basket');
const fallingObject = document.getElementById('falling-object');
const scoreDisplay = document.getElementById('score');
let score = 0;
let basketPosition = 125; // Starting position of the basket
let fallingSpeed = 2;
let fallingInterval;

document.addEventListener('keydown', moveBasket);

function moveBasket(event) {
    if (event.key === 'ArrowLeft' && basketPosition > 0) {
        basketPosition -= 15;
    } else if (event.key === 'ArrowRight' && basketPosition < 250) {
        basketPosition += 15;
    }
    basket.style.left = `${basketPosition}px`;
}

function startFalling() {
    let objectPosition = 0;
    fallingObject.style.left = `${Math.random() * 280}px`; // Random horizontal position

    fallingInterval = setInterval(() => {
        objectPosition += fallingSpeed;
        fallingObject.style.top = `${objectPosition}px`;

        if (objectPosition > 400) {
            clearInterval(fallingInterval);
            resetFallingObject();
        } else if (objectPosition > 370 && isCaught()) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            clearInterval(fallingInterval);
            resetFallingObject();
        }
    }, 20);
}

function resetFallingObject() {
    fallingObject.style.top = '0px';
    startFalling();
}

function isCaught() {
    const basketRect = basket.getBoundingClientRect();
    const objectRect = fallingObject.getBoundingClientRect();

    return (
        objectRect.bottom >= basketRect.top &&
        objectRect.left >= basketRect.left &&
        objectRect.right <= basketRect.right
    );
}

startFalling();
