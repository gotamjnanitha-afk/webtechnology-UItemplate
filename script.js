// Main AI Interface Applications

document.addEventListener("DOMContentLoaded", function () {

    const cards = document.querySelectorAll(".app-card");

    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    console.log("AI Interface Applications loaded successfully.");
});