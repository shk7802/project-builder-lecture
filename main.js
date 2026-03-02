
document.addEventListener('DOMContentLoaded', () => {
    const generatorBtn = document.getElementById('generator-btn');
    const lottoRows = document.querySelectorAll('.lotto-row');
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

    const displayNumbers = () => {
        lottoRows.forEach((row, rowIndex) => {
            const numbers = generateLottoNumbers();
            const spans = row.querySelectorAll('.number');
            spans.forEach((span, spanIndex) => {
                // Staggered delay for animation effect
                setTimeout(() => {
                    span.textContent = numbers[spanIndex];
                    span.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        span.style.transform = 'scale(1)';
                    }, 200);
                }, (rowIndex * 100) + (spanIndex * 50));
            });
        });
    };

    generatorBtn.addEventListener('click', () => {
        displayNumbers();
    });
});
