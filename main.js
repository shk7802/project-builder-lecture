
document.addEventListener('DOMContentLoaded', () => {
    const generatorBtn = document.getElementById('generator-btn');
    const numberSpans = document.querySelectorAll('.lotto-numbers .number');

    const generateLottoNumbers = () => {
        const numbers = new Set();
        while (numbers.size < 6) {
            const randomNumber = Math.floor(Math.random() * 45) + 1;
            numbers.add(randomNumber);
        }
        return Array.from(numbers);
    };

    const displayNumbers = (numbers) => {
        numberSpans.forEach((span, index) => {
            span.textContent = numbers[index];
        });
    };

    generatorBtn.addEventListener('click', () => {
        const lottoNumbers = generateLottoNumbers();
        displayNumbers(lottoNumbers);
    });
});
