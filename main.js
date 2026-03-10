document.addEventListener('DOMContentLoaded', () => {
    // 번호 생성기 로직 (index.html에서만 동작)
    const generatorBtn = document.getElementById('generator-btn');
    if (generatorBtn) {
        generatorBtn.addEventListener('click', generateAllRows);
    }
});

function generateAllRows() {
    const rows = document.querySelectorAll('.lotto-row');
    rows.forEach((row, index) => {
        // 각 줄마다 약간의 시차를 두고 생성 (애니메이션 효과)
        setTimeout(() => {
            const numbers = getLottoNumbers();
            updateRow(row, numbers);
        }, index * 200);
    });
}

function getLottoNumbers() {
    // Crypto API를 사용한 고품질 난수 생성
    const array = new Uint32Array(6);
    const numbers = new Set();
    
    // 중복 없는 6개 숫자 추출
    while (numbers.size < 6) {
        const randomBuffer = new Uint32Array(1);
        window.crypto.getRandomValues(randomBuffer);
        // 0~44 범위로 변환 후 +1 하여 1~45 생성
        const num = (randomBuffer[0] % 45) + 1;
        numbers.add(num);
    }
    
    // 오름차순 정렬
    return Array.from(numbers).sort((a, b) => a - b);
}

function updateRow(rowElement, numbers) {
    const spans = rowElement.querySelectorAll('.number');
    spans.forEach((span, index) => {
        const num = numbers[index];
        span.textContent = num;
        
        // 숫자 범위에 따른 색상 데이터 속성 설정 (CSS에서 처리)
        let range = '';
        if (num <= 10) range = '1-10';
        else if (num <= 20) range = '11-20';
        else if (num <= 30) range = '21-30';
        else if (num <= 40) range = '31-40';
        else range = '41-45';
        
        span.setAttribute('data-range', range);
        
        // 팝 애니메이션 리셋 및 재실행
        span.style.animation = 'none';
        span.offsetHeight; /* trigger reflow */
        span.style.animation = 'pop 0.3s ease-out';
    });
}
