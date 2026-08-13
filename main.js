// main.js - Entry point for AvalonMystic

document.addEventListener('DOMContentLoaded', () => {
    console.log('AvalonMystic initialized successfully.');
    
    const contentSection = document.getElementById('content');
    if (contentSection) {
        contentSection.innerHTML = '<p>JavaScript is running!</p>';
    }
});
