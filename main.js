const URL = "https://teachablemachine.withgoogle.com/models/R8i6jb2jEG/";

let model, webcam, labelContainer, maxPredictions;

const uploadArea = document.getElementById('upload-area');
const imageUpload = document.getElementById('image-upload');
const triggerUpload = document.getElementById('trigger-upload');
const startWebcamBtn = document.getElementById('start-webcam');
const webcamSection = document.getElementById('webcam-section');
const loading = document.getElementById('loading');
const resultArea = document.getElementById('result-area');
const resultMessage = document.getElementById('result-message');
const retryBtn = document.getElementById('retry');

// Load the model
async function initModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// Setup label container
function setupLabels() {
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = '';
    for (let i = 0; i < maxPredictions; i++) {
        const wrapper = document.createElement("div");
        wrapper.className = "result-bar-wrapper";
        wrapper.innerHTML = `
            <div class="label">
                <span class="class-name"></span>
                <span class="probability"></span>
            </div>
            <div class="bar-bg">
                <div class="bar-fill"></div>
            </div>
        `;
        labelContainer.appendChild(wrapper);
    }
}

// Initialize on page load
initModel();

// Image Upload Logic
triggerUpload.addEventListener('click', () => imageUpload.click());

imageUpload.addEventListener('change', async (e) => {
    if (e.target.files.length > 0) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        loading.style.display = 'block';
        uploadArea.style.display = 'none';
        webcamSection.style.display = 'none';
        
        reader.onload = async (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = async () => {
                await predict(img);
                loading.style.display = 'none';
                resultArea.style.display = 'block';
            };
        };
        reader.readAsDataURL(file);
    }
});

// Webcam Logic
startWebcamBtn.addEventListener('click', async () => {
    loading.style.display = 'block';
    uploadArea.style.display = 'none';
    
    const flip = true;
    webcam = new tmImage.Webcam(300, 300, flip);
    await webcam.setup();
    await webcam.play();
    
    loading.style.display = 'none';
    webcamSection.style.display = 'block';
    document.getElementById("webcam-container").appendChild(webcam.canvas);
    
    window.requestAnimationFrame(loop);
});

async function loop() {
    webcam.update();
    await predict(webcam.canvas);
    if (webcamSection.style.display !== 'none') {
        window.requestAnimationFrame(loop);
    }
}

async function predict(input) {
    if (!model) await initModel();
    if (!labelContainer) setupLabels();
    
    const prediction = await model.predict(input);
    let topClass = "";
    let topProb = 0;

    for (let i = 0; i < maxPredictions; i++) {
        const classTitle = prediction[i].className;
        const prob = prediction[i].probability;
        const probPercent = (prob * 100).toFixed(0) + "%";
        
        const wrapper = labelContainer.childNodes[i];
        wrapper.querySelector('.class-name').innerText = classTitle;
        wrapper.querySelector('.probability').innerText = probPercent;
        
        const bar = wrapper.querySelector('.bar-fill');
        bar.style.width = probPercent;
        bar.className = `bar-fill bar-${classTitle.toLowerCase()}`;

        if (prob > topProb) {
            topProb = prob;
            topClass = classTitle;
        }
    }

    updateResultMessage(topClass);
    resultArea.style.display = 'block';
}

function updateResultMessage(className) {
    let message = "";
    if (className === "Dog") {
        message = "당신은 귀여운 강아지상! 🐶 친근하고 활발한 매력이 넘치시네요.";
    } else if (className === "Cat") {
        message = "당신은 도도한 고양이상! 🐱 신비롭고 세련된 분위기가 느껴져요.";
    } else {
        message = `당신은 매력적인 ${className}상입니다! ✨`;
    }
    resultMessage.innerText = message;
}

retryBtn.addEventListener('click', () => {
    location.reload();
});
