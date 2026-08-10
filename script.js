// DOM Elements
const nameInput = document.getElementById('recipientName');
const messageInput = document.getElementById('birthdayMessage');
const imageInput = document.getElementById('imageUpload');

const previewName = document.getElementById('previewName');
const previewMessage = document.getElementById('previewMessage');
const previewImage = document.getElementById('previewImage');

const generateBtn = document.getElementById('generateBtn');
const actionButtons = document.getElementById('actionButtons');
const downloadBtn = document.getElementById('downloadBtn');
const emailBtn = document.getElementById('emailBtn');

// Real-time Preview Updates
nameInput.addEventListener('input', (e) => {
    previewName.textContent = e.target.value || 'Name';
});

messageInput.addEventListener('input', (e) => {
    previewMessage.textContent = e.target.value || 'Your message will appear here...';
});

// Handle Image Upload via FileReader API
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

// Generate Button Logic
generateBtn.addEventListener('click', () => {
    // Basic validation
    if (!nameInput.value || !messageInput.value) {
        alert("Please enter a name and a message first!");
        return;
    }

    // Trigger Confetti
    triggerConfetti();

    // Show Action Buttons
    actionButtons.classList.remove('hidden');
    generateBtn.textContent = "Update Card 🎉";
});

// Download Logic using html2canvas
downloadBtn.addEventListener('click', () => {
    const cardElement = document.getElementById('cardCaptureArea');
    
    // Temporarily adjust styles for perfect capture if needed
    downloadBtn.textContent = "Generating...";
    
    html2canvas(cardElement, {
        scale: 2, // High resolution
        useCORS: true, // Allow cross-origin images
        backgroundColor: null 
    }).then(canvas => {
        // Create a download link
        const link = document.createElement('a');
        link.download = `${nameInput.value || 'Birthday'}_Card.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        downloadBtn.textContent = "Download Card";
    });
});

// Email Logic
emailBtn.addEventListener('click', () => {
    const subject = encodeURIComponent(`Happy Birthday, ${nameInput.value}!`);
    const body = encodeURIComponent(`Hi ${nameInput.value},\n\nI made a special birthday card for you! I have attached it to this email.\n\n${messageInput.value}`);
    
    // Opens default email client (Outlook, Apple Mail, Gmail if configured)
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
});

// Confetti Animation Function
function triggerConfetti() {
    var duration = 3 * 1000;
    var animationEnd = Date.now() + duration;
    var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    var interval = setInterval(function() {
        var timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

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
