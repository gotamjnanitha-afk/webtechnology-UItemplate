// =========================================
// AI INTERFACE - MAIN DASHBOARD JAVASCRIPT
// =========================================


// Wait until the page is completely loaded
document.addEventListener("DOMContentLoaded", function () {

    console.log("AI Interface Dashboard Loaded");


    // =========================================
    // SMOOTH SCROLLING
    // =========================================

    const navigationLinks = document.querySelectorAll(
        '.navbar nav a[href^="#"]'
    );

    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            event.preventDefault();

            const targetId = this.getAttribute("href");

            const targetSection = document.querySelector(targetId);

            if (targetSection) {

                targetSection.scrollIntoView({
                    behavior: "smooth"
                });

            }

        });

    });


    // =========================================
    // APPLICATION BUTTONS
    // =========================================

    const applicationButtons =
        document.querySelectorAll(".app-button");


    applicationButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            console.log(
                "Opening:",
                this.getAttribute("href")
            );

        });

    });


    // =========================================
    // ACTIVE NAVIGATION
    // =========================================

    const sections = document.querySelectorAll("section");

    const navLinks = document.querySelectorAll(
        ".navbar nav a"
    );


    window.addEventListener("scroll", function () {

        let currentSection = "";


        sections.forEach(function (section) {

            const sectionTop =
                section.offsetTop - 150;

            const sectionHeight =
                section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection =
                    section.getAttribute("id");

            }

        });


        navLinks.forEach(function (link) {

            link.classList.remove("active");

            if (
                link.getAttribute("href") ===
                "#" + currentSection
            ) {

                link.classList.add("active");

            }

        });

    });


    // =========================================
    // CARD HOVER EFFECT
    // =========================================

    const appCards =
        document.querySelectorAll(".app-card");


    appCards.forEach(function (card) {

        card.addEventListener("mouseenter", function () {

            this.style.transform =
                "translateY(-8px)";

        });


        card.addEventListener("mouseleave", function () {

            this.style.transform =
                "translateY(0)";

        });

    });


    // =========================================
    // CONSOLE MESSAGE
    // =========================================

    console.log(
        "AI Student Assistant → ai-student/index.html"
    );

    console.log(
        "AI Career Assistant → ai-career/index.html"
    );

    console.log(
        "AI Travel Planner → ai-travel/index.html"
    );

});