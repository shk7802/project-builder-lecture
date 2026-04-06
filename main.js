
class LottoBall extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        const number = this.getAttribute("number");
        const colorClass = this.getAttribute("color-class");

        const ball = document.createElement("div");
        ball.classList.add("lotto-ball", colorClass);
        ball.textContent = number;

        const style = document.createElement("style");
        style.textContent = `
            .lotto-ball {
                width: 60px;
                height: 60px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                font-size: 24px;
                font-weight: bold;
                color: white;
                box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
                transform-style: preserve-3d;
                transition: transform 0.5s;
                animation: appear 0.5s ease-out forwards;
            }

            @keyframes appear {
                from {
                    transform: scale(0);
                }
                to {
                    transform: scale(1);
                }
            }

            .color-1 { background: linear-gradient(to right, #fbc2eb, #a6c1ee); }
            .color-2 { background: linear-gradient(to right, #84fab0, #8fd3f4); }
            .color-3 { background: linear-gradient(to right, #ffecd2, #fcb69f); }
            .color-4 { background: linear-gradient(to right, #d4fc79, #96e6a1); }
            .color-5 { background: linear-gradient(to right, #a1c4fd, #c2e9fb); }
            .color-6 { background: linear-gradient(to right, #fccb90, #d57eeb); }
        `;

        this.shadowRoot.append(style, ball);
    }
}

customElements.define("lotto-ball", LottoBall);

const drawButton = document.getElementById("draw-button");
const ballContainer = document.querySelector(".ball-container");
const themeToggle = document.getElementById("theme-toggle");

// Theme management
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "light") {
    document.body.classList.add("light-mode");
    themeToggle.textContent = "☀️";
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-mode");
    const isLight = document.body.classList.contains("light-mode");
    themeToggle.textContent = isLight ? "☀️" : "🌙";
    localStorage.setItem("theme", isLight ? "light" : "dark");
});

drawButton.addEventListener("click", () => {
    ballContainer.innerHTML = "";
    const numbers = generateNumbers();

    numbers.forEach((number, index) => {
        setTimeout(() => {
            const lottoBall = document.createElement("lotto-ball");
            lottoBall.setAttribute("number", number);
            lottoBall.setAttribute("color-class", `color-${(index % 6) + 1}`);
            ballContainer.appendChild(lottoBall);
        }, index * 300);
    });
});

function generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    return Array.from(numbers).sort((a, b) => a - b);
}
