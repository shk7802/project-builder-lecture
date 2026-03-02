
document.addEventListener('DOMContentLoaded', () => {
    const generatorBtn = document.getElementById('generator-btn');
    const numberSpans = document.querySelectorAll('.lotto-numbers .number');
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    // Theme Logic
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
    }

    themeToggle.addEventListener('click', () => {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        }
    });

    const generateLottoNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers).sort((a, b) => a - b);
    };

    const displayNumbers = (numbers) => {
        numberSpans.forEach((span, index) => {
            span.textContent = numbers[index];
            // Add a little animation effect
            span.style.transform = 'scale(1.1)';
            setTimeout(() => {
                span.style.transform = 'scale(1)';
            }, 200);
        });
    };

    generatorBtn.addEventListener('click', () => {
        const lottoNumbers = generateLottoNumbers();
        displayNumbers(lottoNumbers);
    });
});
