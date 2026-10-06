/* =================================
   TravelAI - AI Travel Planner
   ================================= */

const destinationInput =
    document.getElementById("destinationInput");

const planTripButton =
    document.getElementById("planTripButton");

const travelResponse =
    document.getElementById("travelResponse");


/* =================================
   PLAN TRIP
   ================================= */

planTripButton.addEventListener("click", function () {
    planTrip();
});


destinationInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        planTrip();
    }

});


function planTrip() {

    const destination =
        destinationInput.value.trim();

    if (destination === "") {

        showResponse(
            "Choose a destination 🌍",
            "Enter a place such as Goa, Kerala, Dubai or any destination you would like to explore."
        );

        return;
    }


    const location =
        destination.toLowerCase();


    let title =
        "Your AI Travel Plan ✈️";

    let message =
        "";


    /* =========================
       GOA
    ========================== */

    if (location.includes("goa")) {

        title =
            "5-Day Goa Travel Plan 🏖️";

        message =
            "Day 1: Explore Panjim and enjoy a sunset at Miramar Beach. " +
            "Day 2: Visit North Goa beaches such as Baga and Anjuna. " +
            "Day 3: Explore Fort Aguada and Chapora Fort. " +
            "Day 4: Enjoy water activities and local food. " +
            "Day 5: Relax at a beach and shop for souvenirs. " +
            "Estimated budget: ₹20,000–₹30,000 for two travelers.";

    }


    /* =========================
       KERALA
    ========================== */

    else if (location.includes("kerala")) {

        title =
            "5-Day Kerala Travel Plan 🌴";

        message =
            "Day 1: Explore Kochi and Fort Kochi. " +
            "Day 2: Travel to Munnar and visit tea plantations. " +
            "Day 3: Explore Munnar viewpoints and nature spots. " +
            "Day 4: Experience the Kerala backwaters. " +
            "Day 5: Relax and explore local culture before returning. " +
            "Try traditional Kerala food during your trip.";

    }


    /* =========================
       DUBAI
    ========================== */

    else if (location.includes("dubai")) {

        title =
            "5-Day Dubai Travel Plan 🏙️";

        message =
            "Day 1: Visit Burj Khalifa and Dubai Mall. " +
            "Day 2: Explore Dubai Marina and JBR Beach. " +
            "Day 3: Experience a desert safari. " +
            "Day 4: Visit Palm Jumeirah and explore the city. " +
            "Day 5: Shopping and sightseeing before departure. " +
            "Plan your activities according to your budget.";

    }


    /* =========================
       BANGALORE
    ========================== */

    else if (
        location.includes("bangalore") ||
        location.includes("bengaluru")
    ) {

        title =
            "3-Day Bengaluru Travel Plan 🌆";

        message =
            "Day 1: Visit Bangalore Palace and Cubbon Park. " +
            "Day 2: Explore Lalbagh and local food spots. " +
            "Day 3: Visit museums, shopping areas and popular cafes. " +
            "Bengaluru is a good option for a short city trip.";

    }


    /* =========================
       CHENNAI
    ========================== */

    else if (location.includes("chennai")) {

        title =
            "3-Day Chennai Travel Plan 🌊";

        message =
            "Day 1: Visit Marina Beach and explore local attractions. " +
            "Day 2: Visit Kapaleeshwarar Temple and cultural areas. " +
            "Day 3: Explore museums, shopping areas and local restaurants. " +
            "Try traditional South Indian food during your trip.";

    }


    /* =========================
       BUDGET TRIP
    ========================== */

    else if (
        location.includes("budget") ||
        location.includes("cheap") ||
        location.includes("low cost")
    ) {

        title =
            "Budget Travel Plan 💰";

        message =
            "Choose destinations with affordable transport and accommodation. " +
            "Travel during off-peak periods, use public transport, " +
            "book accommodation early and plan free local attractions. " +
            "A good budget trip can combine sightseeing, local food and outdoor activities.";

    }


    /* =========================
       DEFAULT
    ========================== */

    else {

        title =
            "Travel Plan for " +
            destination;

        message =
            "I recommend planning your trip around three things: " +
            "places to visit, accommodation and daily activities. " +
            "Start by deciding your travel dates and budget. " +
            "Then create a day-by-day itinerary with enough free time " +
            "for unexpected discoveries.";

    }


    showResponse(
        title,
        message
    );

}


/* =================================
   QUICK TRAVEL QUESTIONS
   ================================= */

function quickTravelQuestion(question) {

    destinationInput.value =
        question;

    planTrip();

}


/* =================================
   SHOW AI RESPONSE
   ================================= */

function showResponse(title, message) {

    travelResponse.innerHTML = `

        <div class="response-icon">
            ✈
        </div>

        <div>

            <h3>
                ${escapeHTML(title)}
            </h3>

            <p>
                ${escapeHTML(message)}
            </p>

        </div>

    `;


    travelResponse.scrollIntoView({

        behavior: "smooth",

        block: "center"

    });

}


/* =================================
   DESTINATION BUTTONS
   ================================= */

function selectDestination(destination) {

    destinationInput.value =
        "Plan a trip to " + destination;

    planTrip();

}


/* =================================
   FEATURE BUTTONS
   ================================= */

function showFeature(featureName) {

    let title =
        featureName;

    let message =
        "";


    if (featureName === "Trip Preferences") {

        message =
            "Customize your trip duration, budget, travel style and number of travelers to get a more personalized itinerary.";

    }


    else if (featureName === "AI Itinerary") {

        message =
            "TravelAI can organize your trip into daily activities, sightseeing, food recommendations and free time.";

    }


    else if (featureName === "Popular Destinations") {

        message =
            "Explore destinations based on travel style, budget, activities and preferred experience.";

    }


    else {

        message =
            "TravelAI is ready to help you plan your next adventure.";

    }


    showResponse(
        title,
        message
    );

}


/* =================================
   TRAVEL CHECKLIST
   ================================= */

function generateChecklist() {

    showResponse(

        "Your Travel Checklist 🎒",

        "✓ ID and travel documents  |  " +
        "✓ Hotel booking  |  " +
        "✓ Transportation tickets  |  " +
        "✓ Phone charger and power bank  |  " +
        "✓ Clothes and essentials  |  " +
        "✓ Medicines if required  |  " +
        "✓ Emergency contacts  |  " +
        "✓ Travel budget"

    );

}


/* =================================
   NOTIFICATION
   ================================= */

function showNotification() {

    alert(

        "TravelAI Notification\n\n" +

        "You have 2 new destination recommendations " +

        "and 1 travel checklist waiting for you."

    );

}


/* =================================
   NAVIGATION
   ================================= */

const navLinks =
    document.querySelectorAll(".nav-link");


navLinks.forEach(function (link) {

    link.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            navLinks.forEach(
                function (item) {

                    item.classList.remove(
                        "active"
                    );

                }
            );


            link.classList.add(
                "active"
            );

        }
    );

});


/* =================================
   HTML SECURITY
   ================================= */

function escapeHTML(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =================================
   INITIALIZATION
   ================================= */

console.log(
    "TravelAI loaded successfully."
);