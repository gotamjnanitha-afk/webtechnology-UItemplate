

let predictionHistory = [];

function predict() {

    const ageInput = document.getElementById("age").value;
    const incomeInput = document.getElementById("income").value;
    const experienceInput = document.getElementById("experience").value;

    const error = document.getElementById("errorMessage");

    const age = Number(ageInput);
    const income = Number(incomeInput);
    const experience = Number(experienceInput);

    error.textContent = "";

    // Input validation

    if (
        ageInput === "" ||
        incomeInput === "" ||
        experienceInput === ""
    ) {
        error.textContent = "Please fill in all fields.";
        return;
    }

    if (
        !Number.isFinite(age) ||
        !Number.isFinite(income) ||
        !Number.isFinite(experience) ||
        age <= 0 ||
        age > 120 ||
        income < 0 ||
        experience < 0 ||
        experience > age
    ) {
        error.textContent = "Please enter valid values.";
        return;
    }

    // Sample prediction calculation

    let score = 50 + (income / 100000)
                + (experience * 2) - (age * 0.2);

    score = Math.max(5, Math.min(95, score));

    const positive = score;
    const negative = 100 - score;

    const prediction = score >= 50
        ? "Positive Prediction"
        : "Negative Prediction";

    // Display prediction results

    document.getElementById("results").style.display = "block";

    document.getElementById("predictionText").textContent = prediction;

    document.getElementById("confidenceText").textContent =
        score.toFixed(2) + "%";

    document.getElementById("positiveText").textContent =
        positive.toFixed(2) + "%";

    document.getElementById("negativeText").textContent =
        negative.toFixed(2) + "%";

    // Update progress bars

    document.getElementById("confidenceBar").style.width =
        score + "%";

    document.getElementById("positiveBar").style.width =
        positive + "%";

    document.getElementById("negativeBar").style.width =
        negative + "%";

    // Add to history

    const record = {
        age: age,
        income: income,
        experience: experience,
        prediction: prediction,
        confidence: score.toFixed(2)
    };

    predictionHistory.unshift(record);

    displayHistory();
}


// Display prediction history

function displayHistory() {

    const historyList = document.getElementById("historyList");

    if (predictionHistory.length === 0) {
        historyList.innerHTML =
            '<p class="empty">No predictions yet.</p>';
        return;
    }

    historyList.innerHTML = predictionHistory.map((item, index) => `
        <div class="history-item">
            <strong>Prediction ${predictionHistory.length - index}</strong>
            <p>Age: ${item.age}</p>
            <p>Annual Income: ${item.income}</p>
            <p>Experience: ${item.experience} years</p>
            <p>Result: ${item.prediction}</p>
            <p>Confidence: ${item.confidence}%</p>
        </div>
    `).join("");
}


// Reset input and results

function resetForm() {

    document.getElementById("age").value = "";
    document.getElementById("income").value = "";
    document.getElementById("experience").value = "";

    document.getElementById("results").style.display = "none";

    document.getElementById("errorMessage").textContent = "";

}


// Clear prediction history

function clearHistory() {

    predictionHistory = [];

    displayHistory();

}
