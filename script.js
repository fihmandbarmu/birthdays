// Ensure messages.js is loaded first in HTML

// DOM Elements
const nameInput = document.getElementById('recipientName');
const messageInput = document.getElementById('birthdayMessage');
const imageInput = document.getElementById('imageUpload');
const templateSelect = document.getElementById('templateSelect');

// Color controls
const cardBgColor = document.getElementById('cardBgColor');
const accentColor = document.getElementById('accentColor');
const rootElement = document.documentElement; // For CSS variables

const previewName = document.getElementById('previewName');
const previewMessage = document.getElementById('previewMessage');
const previewImage = document.getElementById('previewImage');

const generateBtn = document.getElementById('generateBtn');
const actionButtons = document.getElementById('actionButtons');
const downloadBtn = document.getElementById('downloadBtn');
const emailBtn = document.getElementById('emailBtn');

// 1. Initialize Templates
function loadTemplates() {
    messageTemplates.forEach((template, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = template.label;
        templateSelect.appendChild(option);
    });
}
loadTemplates();

// 2. Event Listeners for Content Updates
nameInput.addEventListener('input', (e) => {
    previewName.textContent = e.target.value || 'Name';
});

messageInput.addEventListener('input', (e) => {
    previewMessage.textContent = e.target.value || 'Your message will appear here...';
});

templateSelect.addEventListener('change', (e) => {
    const selectedTemplate = messageTemplates[e.target.value];
    if (selectedTemplate && selectedTemplate.text) {
        messageInput.value = selectedTemplate.text;
        previewMessage.textContent = selectedTemplate.text;
    }
});

// 3. Event Listeners for Color Customization
cardBgColor.addEventListener('input', (e) => {
    rootElement.style.setProperty('--card-bg', e.target.value);
    
    // Auto-adjust text color based on background brightness (simple threshold)
    const hex = e.target.value.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    
    // If background is dark, make text light, and vice versa
    rootElement.style.setProperty('--card-text', (yiq >= 128) ? '#2d3748' : '#ffffff');
});

accentColor.addEventListener('input', (e) => {
    rootElement.style.setProperty('--card-accent', e.target.value);
});

// 4. Handle Image Upload
imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            previewImage.src = event.target.result;
        }
        reader.readAsDataURL(file);
    }
});

// 5. Generate Button Logic (Confetti)
generateBtn.addEventListener('click', () => {
    if (!nameInput.value || !messageInput.value) {
        alert("Please enter a name and a message first!");
        return;
    }
    triggerConfetti();
    actionButtons.classList.remove('hidden');
    generateBtn.textContent = "Update Card 🎉";
});

// 6. Download Logic
downloadBtn.addEventListener('click', () => {
    const cardElement = document.getElementById('cardCaptureArea');
    const originalText = downloadBtn.textContent;
    downloadBtn.textContent = "Processing...";
    
    html2canvas(cardElement, {
        scale: 2, 
        useCORS: true,
        backgroundColor: null 
    }).then(canvas => {
        const link = document.createElement('a');
        link.download = `${nameInput.value || 'Modern_Birthday'}_Card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        downloadBtn.textContent = originalText;
    });
});

// 7. Email Logic
emailBtn.addEventListener('click', () => {
    const subject = encodeURIComponent(`Happy Birthday, ${nameInput.value}!`);
    const body = encodeURIComponent(`Hi ${nameInput.value},\n\nI made a special modern birthday card just for you! I've attached it to this email.\n\nBest,\n[Your Name]`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

// 8. Confetti Animation
function triggerConfetti() {
    var duration = 2.5 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) { return Math.random() * (max - min) + min; }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) return clearInterval(interval);

        var particleCount = 50 * (timeLeft / duration);
        confetti(Object.assign({}, defaults, { 
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 250);
}
