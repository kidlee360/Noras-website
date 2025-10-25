const messageIcon = document.getElementById('message-icon');
const messageModal = document.getElementById('message-modal');
const passwordInput = document.getElementById('password-input');
const submitPassword = document.getElementById('submit-password');
const passwordContainer = document.getElementById('password-container');
const messageContent = document.getElementById('message-content');

const correctPassword = "Jungkook";

messageIcon.addEventListener('click', () => {
    messageModal.style.display = 'flex';
});

submitPassword.addEventListener('click', () => {
    if (passwordInput.value === correctPassword) {
        messageContent.style.filter = 'none';
        passwordContainer.style.display = 'none';
    } else {
        alert('Incorrect password. Please try again.');
    }
});

messageModal.addEventListener('click', (e) => {
    if (e.target === messageModal) {
        messageModal.style.display = 'none';
    }
});